# Intentional — Project Handoff

## What this is

**Intentional** (intentional.ai) is a marketing site for an AI brand intelligence product for senior communications leaders. The positioning: Intentional monitors what AI says about your organisation, responds with content built on your institutional knowledge, and measures the narrative shift over time. It is built for comms professionals, not marketers or developers.

The product does two things — and both must come through in the copy:
1. **AI narrative** — monitors and responds to what AI says about your brand across answer engines
2. **Comms intelligence** — the same insights inform and change how the wider comms team works

This dual value is the core differentiator. Don't narrow it back to AEO/GEO alone.

This is a **Next.js App Router** site using **Tailwind v4**, deployed (eventually) to intentional.ai.

---

## Design philosophy

### Less is more
The design is intentionally restrained. Every element should earn its place. Avoid decorative additions, over-engineered components, or "obvious" UI patterns. If something feels like it's trying too hard, it probably is.

### Intentional in design
The brand name is the design principle. Every decision — typography, spacing, colour, interaction — should feel considered and deliberate. Not designed-by-committee, not default.

### Micro-interactions matter
Small things done well. Hover states, transitions, scroll behaviour. These should be subtle and purposeful — not showy. The navbar scroll transition (h-24 → h-16) is a good example of the right level of detail.

### One thing at a time
Work in small, focused changes. Don't refactor while fixing. Don't add features while adjusting type. Mike will tell you what to change — don't anticipate or jump ahead.

---

## Brand voice

The copy speaks **from the perspective of a senior communications leader** — not at them. The needs cards are written in first person ("I don't know what content works"). The rest of the site is authoritative but not corporate.

- **"Intentional"** is always rendered in bold in body copy — the `BrandText` component handles this automatically
- **"Institutional knowledge"** is the established term for the client's knowledge base that the system is built from — don't substitute synonyms
- Sentences are short and declarative. Avoid hedging, filler words ("exactly", "really"), and tech jargon
- The audience is comms professionals. "Content" is their word, not "copy" or "assets"
- The product is positioned against tools "built for a marketer or a developer" — this is a deliberate contrast to establish
- Approval and human judgment are always emphasised — the system amplifies, never replaces
- AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) are acknowledged in the FAQ but Intentional is positioned as going further

### Writing style

**Sentence fragments are a feature, not an error**
Short fragments punch hard and are used deliberately throughout. "Not a press release." "With a conversation." "Less guessing. More impact." "Your knowledge. Your approval. Your voice." Use them for emphasis — never to pad a thought.

**Short sentence lands last**
When mixing sentence lengths (which the copy always does), the short declarative sentence comes at the end of a paragraph or thought. That's where the weight falls. Build with longer sentences; close with the punch.

**The "Not X. Y." move**
When subverting expectations, name what it isn't before what it is. "Not a press release. Content built to shift how AI understands you." "Not sentiment scores. The actual narrative, moving." This resets the reader's assumption, then delivers the real point. Don't overuse it — it works because it's earned.

**"But" as a reframe, not a qualification**
The copy uses "But" at the start of sentences deliberately — always to introduce the more interesting truth, not to soften a claim. "But those same gaps can also reveal..." / "But understanding why it exists..." It's a structural pivot. Avoid "However" or "Although" — they immediately read as corporate.

**Contrasts over superlatives**
Never claim to be the best, fastest, or most powerful. Contrast instead: "working on their strategy — not just their content." "Visible, not assumed." A contrast earns the claim; a superlative just asserts it.

**Present tense for the problem**
The urgency in the copy comes from the present tense: "AI assistants are speaking for your brand right now." Not "AI will increasingly influence" — that creates distance. The problem is happening now.

**Specificity is trust**
Name the platforms (ChatGPT, Perplexity, Google AI Overviews, Claude). Give timelines ("within a month," "from day one"). Avoid "quickly," "many clients," "leading organisations." A specific claim is credible; a general one isn't.

**"You" for control, "we" for partnership**
When describing approval, strategy, and voice: "you." When describing the relationship and service: "we." "You shape it, approve it, and decide what gets published" — not "our platform gives you control." The client owns their narrative; Intentional is the partner.

**Results are visible, not promised**
No "transformative impact" or "see the difference." Results language should be concrete and testable: "measurable narrative shift," "we track this from day one, so the change is visible, not assumed."

**No metaphors**
Avoid borrowed imagery: "moving the needle," "cutting through the noise," "levelling up." Plain language only. The bar for an idiom is high — "gut feel" appears once, earned.

**The control reassurance always appears**
Every section that describes the system acting also reassures the reader they're in charge. "You approve everything before it's published." "Nothing goes out without your sign-off." "The system amplifies your judgment; it doesn't replace it." This is a conscious check — not incidental.

### Brand name capitalisation
- **"Intentional"** — capitalised as a proper noun in all running copy and FAQs
- **"intentional"** — lowercase only in two display contexts: the hero h1 tagline ("Get intentional with AI.") and the footer tagline ("Get intentional with AI."). This is a deliberate design exception — the brand name appears as itself in those moments, matching the logotype treatment
- The logotype ("intentional.") is always lowercase — this never changes

---

## Code philosophy

### Use what exists before inventing
Use standard Tailwind utility classes before writing custom CSS. Use existing components before creating new ones. If a standard Tailwind class does the job, use it — don't invent a new class in `globals.css`.

### Tailwind where logical, CSS where global
Use Tailwind utility classes for layout, spacing, colour, and responsive behaviour. Use **CSS declarations in `globals.css`** for typographic base styles and site-wide concerns. Don't add Tailwind classes to JSX that duplicate what `globals.css` already declares.

### CSS vs JS for scroll effects
- **CSS scroll-driven animations** (`animation-timeline: view()`) for simple visual effects (e.g. the noise section width expand). Always wrap in `@supports (animation-timeline: view())` for progressive enhancement — unsupported browsers (Safari, Firefox) fall back gracefully to the end state.
- **JS scroll handlers** for complex layout-affecting animations (e.g. the needs stacking cards). These use `requestAnimationFrame`-friendly patterns via passive scroll listeners.

### Don't fight Tailwind with CSS
If a CSS rule needs to override a Tailwind class, the right fix is to **remove the Tailwind class** and own the property entirely in CSS — not to add `!important` or increase specificity. Conflicts between Tailwind margin/width classes and CSS animations are a known gotcha (see noise section).

### Inline styles only when JS owns the value
Use inline JSX styles only when a JS scroll handler needs to update the value dynamically. Static values belong in CSS or Tailwind classes.

### Manageable code
- Small, single-purpose components
- No unnecessary abstractions
- Prefer readable over clever
- `as` prop pattern for polymorphic components (see `RevealText`)

### CSS variable discipline
All design tokens live in `:root` in `globals.css`. Tailwind's `@theme inline` references those tokens — never self-referentially (circular references silently break). Pattern:

```css
:root {
  --orange: #d4561d;
  --stack-display: ui-serif, 'DM Serif Text', serif;
}

@theme inline {
  --color-orange: var(--orange);        /* non-circular ✓ */
  --font-display: var(--stack-display); /* non-circular ✓ */
}
```

---

## Typography system

**Display font** (`--stack-display`): `ui-serif, 'DM Serif Text', serif`
- New York on Mac/iOS, DM Serif Text on everything else
- Used for: all headings (h1–h4), "intentional." brand mark, nav links
- Weight: 700

**Body font** (`--stack-sans`): `system-ui, -apple-system, sans-serif`
- SF Pro on Mac/iOS, system default elsewhere
- Used for: all body copy, buttons, captions
- Weight: 400

Font sizes use clamp-based fluid scales defined in `@theme` in `globals.css`:
```css
--text-h1: clamp(2.5rem, 3vw + 1.8rem, 4.5rem);
--text-h2: clamp(1.875rem, 2vw + 1.4rem, 3.25rem);
--text-h3: clamp(1.375rem, 1vw + 1.14rem, 2rem);
--text-sub: 1.35rem;
--text-body: 1.125rem;
--text-small: 0.9rem;
```

**Only use these sizes.** Never use `text-xs`, `text-sm`, `text-lg` or other Tailwind defaults — they are not part of the design system.

Don't add font-weight or tracking classes to heading JSX — those come from `globals.css`.

---

## Colour palette

| Token | Value | Usage |
|---|---|---|
| `--background` | `color-mix(in srgb, #d4561d 2%, #ffffff)` | Page background (warm off-white) |
| `--foreground` | `#1C1917` | Default text |
| `--orange` | `#d4561d` | Primary accent, CTA buttons |
| `--orange-hover` | `#b84716` | Button hover state |
| `--headline` | `#4c0c0c` | Heading colour |
| `--needs-bg` | `color-mix(in srgb, #d4561d 10%, #ffffff)` | Needs section tinted background |

**Never invent colours.** Don't use `stone-*`, `gray-*`, or any Tailwind colour not already present in the codebase.

---

## Site structure

```
app/
  page.tsx          — Single-page layout: Hero → Noise → Needs → Platform → Intelligence → Inquire → FAQ → Footer
  layout.tsx        — Font loading, full SEO metadata, SchemaOrg, llms.txt links
  globals.css       — All base styles, CSS tokens, typography system

components/
  navbar.tsx        — Fixed nav, scroll-aware, mobile hamburger menu
  container.tsx     — Max-width wrapper (1280px, px-6)
  section-header.tsx — label + rule + RevealText h2 + RevealText subtitle
  modal-context.tsx — Modal open/close state provider. ModalType: "inquire" | "privacy" | "terms" | "contact" | "signin"
  inquire-modal.tsx — Framer Motion modal (inquiry form). Title: "Get Intentional"
  sign-in-modal.tsx — Sign-in modal (email, password, remember me, forgot password)
  legal-modal.tsx   — Privacy policy and Terms of service modal
  schema-org.tsx    — JSON-LD structured data

  sections/
    hero.tsx        — Video background, headline, CTA
    noise.tsx       — Browser mockup, desktop-background.jpg with scroll-expand
    needs.tsx       — Stacking cards (complex JS scroll animation)
    platform.tsx    — Sticky crossfade images (desktop), stacked (mobile)
    intelligence.tsx — Sector research teaser, links to /intelligence page
    inquire.tsx     — Lead capture, parallax team photo, modal trigger
    faq.tsx         — Two-column accordion FAQ (12 questions)
    footer.tsx      — Dark gradient footer

  ui/
    reveal-text.tsx     — Word-by-word scroll opacity reveal
    brand-text.tsx      — Bolds "Intentional" in body copy
    browser-mockup.tsx  — Animated chat UI mockup
    animated-chat.tsx   — Chat animation inside browser mockup
    signals-feed.tsx    — RSS feed of 3 curated signals, shown in footer
    modal-shell.tsx     — Shared animated modal shell (line expands to panel)
    modal-close-button.tsx — Animated × button used inside modals
    lazy-lottie.tsx     — Lazy-loading Lottie wrapper (loads on scroll into view)
    thinking-dots.tsx   — Animated dots used in CTAs and logo
    illustrations/      — SVG icons for needs cards (influence, insights, strategy)
```

---

## Key components

### `RevealText`
Scroll-driven word-by-word opacity animation (0.2 → 1.0). Fires as the element scrolls from 85vh to 50vh in the viewport. Words stagger across the first 70% of that range.

Accepts an `as` prop to render as any HTML element — defaults to `h2`:
```tsx
<RevealText as="h3" className="mb-4">{part.tagline}</RevealText>
<RevealText as="p" className="text-sub">{subtitle}</RevealText>
```

Used in: `SectionHeader` (h2 title, p subtitle), `Platform` (h3 taglines), `Needs` (card h3 titles).

### `BrandText`
Splits a string on the word "Intentional" and wraps each occurrence in `<strong>`. Used in body copy wherever "Intentional" appears.
```tsx
<p className="text-body"><BrandText text="...Intentional monitors..." /></p>
```

### `SectionHeader`
Composes: small label text + 1px horizontal rule + `RevealText` h2 + `RevealText` p subtitle. If subtitle is JSX (not a string), it renders as a plain `<p>` without the reveal.

### `ModalShell`
Shared animated modal shell used by all modals. Animates from a horizontal line to a full panel. Features:
- Full-screen on mobile (`100dvh`, no border radius)
- Scrollable content (`overflow-y-auto`)
- Focus trap — Tab cycles within modal, focus returns to trigger on close
- `role="dialog"` + `aria-modal="true"`
- Escape key closes

### `SignInModal`
Fields: email, password, remember me checkbox, forgot password.
- Forgot password: clicking replaces the link with inline confirmation text — no backend needed yet
- Footer: "Don't have an account?" + "Get Intentional" pill button → opens inquire modal
- Wired to navbar "Sign in" on both desktop and mobile

### `LazyLottie`
```tsx
import LazyLottie from "@/components/ui/lazy-lottie";
<LazyLottie src="/eyes.json" loop autoplay style={{ width: 200 }} />
```
- Loads Lottie runtime and animation JSON only when element scrolls into view (IntersectionObserver)
- `src` is a path to a JSON file in `/public`
- `eyes.json` (130KB raw, ~30KB gzipped) is already in `/public`
- All future Lottie animations must use this wrapper — never import `lottie-react` directly in a section component

---

## Section details

### Hero
Video background, deferred load after `window.load`. No poster image — LCP element is the h1 text. Headline and CTA over dark overlay.

### Noise
- Browser mockup with animated AI conversation
- `desktop-background.jpg` div: CSS scroll-driven width animation, **75% → 100%** as it enters the viewport
- Animation uses `animation-timeline: view()` with `@supports` guard — unsupported browsers see full width
- **Important:** The `md:mx-0` Tailwind class was removed from this div — the margin is owned entirely by CSS (`.noise-expand` in globals.css). Do not re-add `mx-0` or it will fight the animation and cause left-alignment jump

### Needs
Complex JS scroll animation. Read this carefully.

**Desktop behaviour:**
- Cards are `position: absolute` stacked inside a `position: sticky` container (`stickyBoxRef`)
- A tall track div (`trackRef`) creates scroll travel distance
- JS `scrollHandler` translates each card from its initial spread-out position into a tight stack as the user scrolls
- Stack offset is derived from actual DOM measurements (`readVars()`): card top padding + tallest h3 height + 8px — never hardcoded
- Cards have an orange-tinted box shadow (desktop only, via `.needs-sticky .card` in globals.css)

**Mobile behaviour:**
- Sticky/absolute layout is entirely disabled
- `resetMobile()` explicitly sets all inline styles back to flow layout (position: relative, height: auto, etc.)
- `resetDesktop()` explicitly restores all inline styles for sticky layout
- Both functions must set every relevant property explicitly — clearing to `''` is not reliable because there's no CSS fallback for these values
- Mobile cards: background = `var(--needs-bg)`, quote bubbles = `var(--background)`, no shadow
- These mobile overrides use `!important` in globals.css because JS sets inline styles that would otherwise win

**Key refs:** `trackRef` (outer scroll track), `stickyBoxRef` (sticky container)

### Platform
- Three parts: "Look through AI's eyes" / "Speak in your voice" / "Listen for what matters"
- Desktop: text scrolls left column, images crossfade in sticky right column
- Mobile: fully stacked, no sticky behaviour
- Placeholder images still in place (monitoring dashboard / content workflow / results tracking) — real Lottie animations to replace these
- Lottie file `eyes.json` is in `/public` — use `LazyLottie` wrapper when implementing

### Inquire
- Background: `linear-gradient(to bottom, #a83d10, #d4561d)`
- Title: "More than a platform. Your partner in AI."
- Parallax team photo (right column), JS scroll-driven `translateY`
- Quote overlay: "Head of Content, Global brand" (one line, no `max-w-xs` constraint)
- "Get Intentional" button triggers the inquiry modal

### FAQ
- 12 questions in two columns (`Math.ceil(faqs.length / 2)` split)
- Accordion uses CSS grid-rows trick: `grid-rows-[0fr]` → `grid-rows-[1fr]`
- Buttons have `aria-controls` linking to answer panel `id` — keep this wired when editing
- **Chevron icon:** `>` (right-pointing, `-rotate-90`) by default → `∨` (rotate-0) on hover → `∧` (rotate-180) when open
- **Question hover (closed):** gradient text fill sweeps orange left-to-right (`bg-right` → `bg-left`)
- **Question hover (open):** gradient text fill retreats stone right-to-left (`bg-left` → `bg-right`)
- Uses hard-stop gradient clipped to text: `linear-gradient(to right, var(--color-orange) 50%, #1c1917 50%)`
- Second column gets `border-t md:border-t-0` to fix mobile divider between columns

### Footer
- Background: `linear-gradient(to bottom, #4c0c0c, #2a0606)`
- Brand statement (left column): logotype first, then taglines beneath it:
  - "intentional." logotype (text-h2, white, orange dot)
  - "Take control of your narrative." (text-sub, white/50)
  - "Get intentional with AI." (text-sub, white/75)
- Right column: `SignalsFeed` (3 live RSS signals)
- Bottom: © + nav links, `text-white/40`
- Mobile: signals appear above logotype/nav (order-1/order-2)

### Signals feed (`components/ui/signals-feed.tsx`)
- Fetches from `/api/signals` (RSS aggregator, 10 sources, 1-per-source dedup, top 3 by date)
- Thumbnails use Next.js `<Image fill sizes="80px">` — optimised, lazy loaded
- External image domains are whitelisted via `remotePatterns: [{ hostname: "**" }]` in `next.config.ts`
- Descriptions rendered with `dangerouslySetInnerHTML` to handle `<em>` and other inline HTML from RSS
- Title hover: `text-orange`

---

## Navbar

**Desktop:**
- Logo: "intentional." — `font-display font-bold text-3xl`, fixed size
- Nav links: `font-sans font-semibold`
- "Sign in": `font-sans font-light` — opens sign-in modal (`openModal("signin")`)
- "Get Intentional": pill CTA — opens inquire modal (`openModal("inquire")`)
- Scroll state: transparent → `bg-white/95 backdrop-blur-md` at `scrollY > 24`, height `h-24` → `h-16`

**Mobile:**
- Full-screen orange overlay, slides down from top
- Nav links: `font-sans font-semibold text-sub text-white`
- "Sign in": `font-sans font-light` — opens sign-in modal
- "Get Intentional": white pill, orange text — opens inquire modal
- `body.overflow = hidden` while menu is open

---

## Performance

### Images
- Signal feed thumbnails use Next.js `<Image>` with `fill` and `sizes="80px"`
- `next.config.ts` has `remotePatterns: [{ hostname: "**" }]` to allow any external image URL
- This means Next.js proxies, resizes, and converts external images to WebP automatically

### Lottie
- Always use `LazyLottie` (`components/ui/lazy-lottie.tsx`) — never import `lottie-react` directly in section components
- Lottie runtime (~250KB) and animation data are deferred until the element is near the viewport
- `eyes.json` (130KB / ~30KB gzipped) is in `/public`

### Video
- Hero video deferred to after `window.load` — doesn't compete with LCP
- No poster image needed — LCP is the h1 text

---

## Accessibility

A full pass was completed. Key things in place:
- **Skip-to-content** link in `layout.tsx` (visible on Tab, orange pill)
- **Focus trap** in `ModalShell` — Tab cycles within modal, focus returns to trigger on close
- **`role="dialog"` + `aria-modal`** on all modals and mobile nav overlay
- **`aria-controls` / `id`** wiring on FAQ accordion buttons and panels
- **`:focus-visible`** global ring in orange (`globals.css`) — suppressed on inputs (which have orange border-b)
- Decorative SVGs marked `aria-hidden="true"` throughout

---

## Mobile approach (general)

Mobile is not an afterthought but several sections behave fundamentally differently:

- **Needs cards:** No sticky/stacking on mobile. JS detects `window.innerWidth < 768` and calls `resetMobile()` to restore normal document flow.
- **Platform:** No sticky image column. Desktop grid is hidden (`hidden md:grid`), mobile stacked layout shown (`md:hidden`).
- **Noise:** Width animation (`noise-expand`) only fires at `@media (min-width: 768px)`. On mobile the div bleeds edge-to-edge via `-mx-6`.
- **Container:** `px-6` padding on the section, `Container` component adds `max-w-[1280px] mx-auto`.

---

## SEO / AEO approach

**Meta description:**
> "Built for comms leaders, Intentional is your AI to watch brand narratives, read between the lines, and respond in your voice. Backed by expertise. Helping your team work from insight, not instinct."

**Structured data (schema-org.tsx):**
- Organization, WebSite, WebPage with SpeakableSpecification, Service, HowTo (3 steps), FAQPage, Review

**LLM discoverability:**
- `/public/llms.txt` — summary for LLM crawlers
- `/public/llms-full.txt` — full site content in markdown
- Both linked via `<link rel="alternate">` in `<head>`
- **Note:** Both files need updating to reflect current copy — content has changed significantly

**Technical SEO:**
- `app/sitemap.ts`, `app/robots.ts`
- Full OpenGraph + Twitter card metadata (OG image not yet created)
- `themeColor: "#d4561d"` for Android Chrome

---

## Key things NOT to do

- **Don't make changes mid-discussion.** If Mike is thinking out loud or asking "what do you think?", that is not an instruction to implement. Wait for an explicit "yes" or "make that change" before touching any file
- Don't make changes without being asked
- Don't add features mid-conversation while discussing something else
- **Don't implement something just because you can.** If Mike asks "can this be done?" — answer the question. Wait to be asked to do it
- Don't implement a solution as if your interpretation is the only valid one — Mike may have a specific vision that hasn't been expressed yet
- Don't use `@theme inline` with self-referential variables (circular — silently breaks)
- Don't load web fonts for system font stacks
- Don't add font-weight or tracking classes to heading JSX — those come from `globals.css`
- Don't start a new server with Bash — use `mcp__Claude_Preview__preview_start` with the `intentional-site` config in `.claude/launch.json`
- Don't add `!important` to fight Tailwind — remove the conflicting Tailwind class instead and own the property in CSS
- Don't clear inline styles to `''` in the needs animation functions — always set them explicitly in both `resetMobile()` and `resetDesktop()`
- Don't re-add `md:mx-0` to the noise section desktop-background div — the margin is owned by CSS
- Don't invent a new CSS class if a standard Tailwind utility exists
- Don't use `parseFloat()` on CSS `calc()` expressions — it returns NaN. Derive values from DOM measurements instead (see `readVars()` in needs.tsx)
- **Don't use `text-xs`, `text-sm`, `text-lg` or any Tailwind default text size** — only use the design system sizes: `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-body`, `text-sub`, `text-small`
- **Don't use `stone-*` or `gray-*` colour classes** unless they already exist in the file you're editing
- Don't import `lottie-react` directly — always use `LazyLottie` wrapper

---

## To-do list

### Content / visuals
- [ ] Platform section: replace 3 placeholder images with Lottie animations — `eyes.json` ready in `/public`, use `LazyLottie` wrapper
- [ ] OG/social image — needed before anyone shares the URL publicly (design direction TBD)
- [ ] Team photo (`/team-photo.jpg`) — placeholder or real?
- [ ] Hero video — confirm final asset

### Technical
- [ ] Form → email on submit (service: Resend or SendGrid — not yet chosen)
- [ ] Update `llms.txt` and `llms-full.txt` to match current copy
- [ ] Update schema-org.tsx FAQPage (currently has 6 Q&As, site now has 12)
- [ ] Update all SEO metadata copy once content finalised
- [ ] Analytics: Umami (no cookies, no consent banner needed, GDPR compliant) — Mike to provide code snippet
- [ ] 404 page
- [ ] Deployment: Vercel, custom domain (intentional.ai), production env vars
- [ ] Sitemap / robots review once content finalised
- [ ] Sign-in modal: wire to real auth when platform is ready
- [ ] Inquire modal: wire form submission to Resend

### Future
- [x] Intelligence / research page (`/intelligence` route) — complete
- [ ] `/intelligence` page: replace "Briefing coming soon" with real download/sign-up CTA when report is published
