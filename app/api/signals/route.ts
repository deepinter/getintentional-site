import { NextResponse } from "next/server";

// Revalidate cached response every hour
export const revalidate = 3600;

export interface Signal {
  title:       string;
  link:        string;
  source:      string;
  description: string;
  image:       string | null;
  pubDate:     string | null;
}

// ── Approved source pool ────────────────────────────────────────────────────
// Curated for communication leaders — strategic, thought-leadership focused.
// Deliberately excludes SEO-developer sources that frame the world as SEO
// rather than AEO / AI visibility / brand presence.
const SOURCES = [
  { name: "MIT Technology Review",   feed: "https://www.technologyreview.com/feed/"              },
  { name: "Fast Company",            feed: "https://www.fastcompany.com/latest/rss"              },
  { name: "The Atlantic",            feed: "https://www.theatlantic.com/feed/all/"               },
  { name: "Adweek",                  feed: "https://www.adweek.com/feed/"                        },
  { name: "Nieman Lab",              feed: "https://www.niemanlab.org/feed/"                     },
  { name: "The Drum",                feed: "https://www.thedrum.com/rss"                         },
  { name: "PR Week",                 feed: "https://www.prweek.com/rss"                          },
  { name: "Wired",                   feed: "https://www.wired.com/feed/rss"                      },
  { name: "Digiday",                 feed: "https://digiday.com/feed/"                           },
  { name: "Search Engine Journal",   feed: "https://www.searchenginejournal.com/feed/"           },
];

// ── Keywords to match against article titles ────────────────────────────────
// Broad enough to catch strategic/leadership coverage; narrow enough to
// exclude off-topic AI content (AI in medicine, AI in manufacturing, etc.)
const KEYWORDS = [
  // AI in search & discovery
  "ai search", "answer engine", "ai overview", "ai answers", "ai results",
  "generative ai", "perplexity", "chatgpt", "llm", "large language",
  // Brand & communications strategy
  "ai brand", "ai narrative", "ai communications", "ai marketing",
  "ai visibility", "brand reputation", "ai content", "ai seo",
  "ai adoption", "ai transformation", "ai powered", "ai-powered",
  // Strategic / leadership framing (MIT Tech Review, The Atlantic, Fast Company)
  "age of ai", "ai future", "ai strategy", "ai creativity",
  "ai trust", "ai transparency", "ai regulation",
  // Specialist terms
  "aeo", "geo ", "earned media", "share of voice",
];

// ── Lightweight RSS/Atom parser (no dependencies) ───────────────────────────
function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g,   "&")
    .replace(/&lt;/g,    "<")
    .replace(/&gt;/g,    ">")
    .replace(/&quot;/g,  '"')
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&apos;/g,  "'");
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();
}

function extractRaw(block: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`,
    "i"
  );
  return (re.exec(block)?.[1] ?? "").trim();
}

function extractText(block: string, tag: string): string {
  const raw = decodeEntities(extractRaw(block, tag));
  // Strip SEJ/SEO-publication trailing attribution "via @account, @author"
  return raw.replace(/\s+via\s+@\S+.*$/i, "").trim();
}

function extractDescription(block: string): string {
  // Try RSS <description> then Atom <summary> then Atom <content>
  const raw =
    extractRaw(block, "description") ||
    extractRaw(block, "summary")     ||
    extractRaw(block, "content");
  const plain = decodeEntities(stripHtml(raw));
  // Trim to ~130 chars at a word boundary
  if (plain.length <= 130) return plain;
  const cut = plain.slice(0, 130).replace(/\s+\S*$/, "");
  return cut + "…";
}

function extractLink(block: string): string {
  // Atom: <link href="..."/>
  const atom = /< *link[^>]+href="([^"]+)"/.exec(block);
  if (atom) return decodeEntities(atom[1].trim());
  // RSS: <link>url</link>
  const rss = /<link[^>]*>(?:<!\[CDATA\[)?\s*(https?:\/\/[^\s<\]]+)/.exec(block);
  return rss ? decodeEntities(rss[1].trim()) : "";
}

function extractImage(block: string): string | null {
  // media:content with explicit image medium/type
  let m =
    /< *media:content\b[^>]+\burl="([^"]+)"[^>]*\bmedium="image"/i.exec(block) ??
    /< *media:content\b[^>]+\bmedium="image"[^>]+\burl="([^"]+)"/i.exec(block) ??
    /< *media:content\b[^>]+\burl="([^"]+)"[^>]*\btype="image\/[^"]+"/i.exec(block) ??
    /< *media:content\b[^>]+\btype="image\/[^"]+"[^>]+\burl="([^"]+)"/i.exec(block);
  if (m) return m[1];

  // media:content with image-like URL (fallback for feeds that omit type attr)
  m = /< *media:content\b[^>]+\burl="([^"]+\.(?:jpe?g|png|webp|gif)(?:\?[^"]*)?)"/.exec(block);
  if (m) return m[1];

  // media:thumbnail
  m = /< *media:thumbnail\b[^>]+\burl="([^"]+)"/i.exec(block);
  if (m) return m[1];

  // RSS enclosure with image type
  m =
    /< *enclosure\b[^>]+\burl="([^"]+)"[^>]+\btype="image\/[^"]+"/i.exec(block) ??
    /< *enclosure\b[^>]+\btype="image\/[^"]+"[^>]+\burl="([^"]+)"/i.exec(block);
  if (m) return m[1];

  return null;
}

function extractPubDate(block: string): string | null {
  // RSS <pubDate>, Atom <published>, <updated>
  const d =
    extractRaw(block, "pubDate")    ||
    extractRaw(block, "published")  ||
    extractRaw(block, "updated");
  return d || null;
}

function parseItems(xml: string, sourceName: string): Signal[] {
  const results: Signal[] = [];
  const re = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const title = extractText(block, "title");
    const link  = extractLink(block);
    if (!title || !link) continue;
    results.push({
      title,
      link,
      source:      sourceName,
      description: extractDescription(block),
      image:       extractImage(block),
      pubDate:     extractPubDate(block),
    });
  }
  return results;
}

function isRelevant(title: string): boolean {
  const lower = title.toLowerCase();
  return KEYWORDS.some(kw => lower.includes(kw));
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function GET() {
  const fetches = SOURCES.map(async ({ name, feed }) => {
    try {
      const res = await fetch(feed, {
        headers: { "User-Agent": "Intentional/1.0 (signals feed reader)" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) return [] as Signal[];
      const xml = await res.text();
      return parseItems(xml, name);
    } catch {
      return [] as Signal[];
    }
  });

  const results = await Promise.allSettled(fetches);
  const all: Signal[] = results.flatMap(r =>
    r.status === "fulfilled" ? r.value : []
  );

  // Filter by keyword relevance, sort newest-first, then cap at one per source
  const sorted = all
    .filter(s => isRelevant(s.title))
    .sort((a, b) => {
      const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return tb - ta;
    });

  const seen = new Set<string>();
  const filtered = sorted
    .filter(s => {
      if (seen.has(s.source)) return false;
      seen.add(s.source);
      return true;
    })
    .slice(0, 3);

  return NextResponse.json(filtered);
}
