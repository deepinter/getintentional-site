"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Signal } from "@/app/api/signals/route";

function formatDate(pubDate: string | null): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Monotone filter tuned to the footer's dark red palette
const MONO_FILTER       = "grayscale(1) sepia(0.8) hue-rotate(330deg) saturate(2) brightness(0.75) contrast(1.1)";
const MONO_FILTER_HOVER = "grayscale(1) sepia(0.8) hue-rotate(330deg) saturate(2) brightness(1.05) contrast(1.1)";

function Thumbnail({ src, alt, source, hovered }: { src: string | null; alt: string; source: string; hovered: boolean }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <div className="col-span-1 aspect-square rounded-full overflow-hidden relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setErrored(true)}
          style={{
            filter: hovered ? MONO_FILTER_HOVER : MONO_FILTER,
            transition: "filter 0.3s ease",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="col-span-1 aspect-square rounded-full flex items-center justify-center"
      style={{
        background: hovered ? "rgba(212,86,29,0.38)" : "rgba(212,86,29,0.18)",
        transition: "background 0.3s ease",
      }}
    >
      <span className="text-small font-bold font-display" style={{ color: "rgba(212,86,29,0.9)" }}>
        {source.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="grid grid-cols-6 gap-x-4 items-start">
      <div className="col-span-1 aspect-square rounded-full bg-white/10 animate-pulse" />
      <div className="col-span-5 space-y-2 pt-1">
        <div className="h-3 bg-white/10 rounded w-full animate-pulse" />
        <div className="h-3 bg-white/10 rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-white/10 rounded w-3/5 animate-pulse" />
        <div className="h-3 bg-white/10 rounded w-1/4 animate-pulse mt-1" />
      </div>
    </div>
  );
}

function SignalCard({ s }: { s: Signal }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={s.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-6 gap-x-4 items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Thumbnail src={s.image} alt={s.title} source={s.source} hovered={hovered} />
      <div className="col-span-5">
        <p className="text-body text-white/90 group-hover:text-orange transition-colors leading-snug font-semibold line-clamp-2">
          {s.title}
        </p>
        {s.description && (
          <p
            className="text-small text-white/60 mt-1 leading-snug line-clamp-2 font-sans"
            dangerouslySetInnerHTML={{ __html: s.description }}
          />
        )}
        <p className="text-small text-white/45 mt-1.5 font-sans">
          {s.source}{formatDate(s.pubDate) ? `, ${formatDate(s.pubDate)}` : ""}
        </p>
      </div>
    </a>
  );
}

export default function SignalsFeed() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    fetch("/api/signals")
      .then(r => r.json())
      .then((data: Signal[]) => { setSignals(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  if (loaded && signals.length === 0) return null;

  return (
    <div className="prose">
      <p className="text-sub font-display font-bold text-white mb-6">
        Signals we're watching.
      </p>

      {!loaded ? (
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <ul className="space-y-6">
          {signals.map((s, i) => (
            <li key={i}>
              <SignalCard s={s} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
