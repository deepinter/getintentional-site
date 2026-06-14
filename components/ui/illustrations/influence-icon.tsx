"use client";

import { useEffect, useRef, useState } from "react";

const BASE_DATE_MS = new Date("2026-05-23").getTime();
const BASE_VALUE   = 61.36;

function getTargetValue(): number {
  const days = Math.max(0, Math.floor((Date.now() - BASE_DATE_MS) / 86400000));
  return Math.round((BASE_VALUE + days * 0.02) * 100) / 100;
}

function toDigits(v: number): number[] {
  return v.toFixed(2).replace(".", "").split("").map(Number);
}

const PH      = 100;
const PW      = 72;
const FS      = 74;
const HOLD_MS = 3500;

const TOP_STEPS = [
  "skew(5deg) scaleY(0.90)",
  "skew(10deg) scaleY(0.60)",
  "skew(20deg) scaleY(0.30)",
  "skew(50deg) scaleY(0.10)",
];
const BOT_STEPS = [
  "skew(-50deg) scaleY(0.10)",
  "skew(-20deg) scaleY(0.30)",
  "skew(-10deg) scaleY(0.60)",
  "skew(-5deg)  scaleY(0.90)",
];

export default function InfluenceIcon() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const triggerRef  = useRef<HTMLSpanElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topBackSpans  = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const botBackSpans  = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const flapDivs      = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const flapSpans     = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const panelsRef     = useRef<HTMLDivElement>(null);
  const chaosActive   = useRef([false, false, false]);

  const openTooltip = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setTooltipOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setTooltipOpen(false), 150);
  };

  useEffect(() => {
    const targets = toDigits(getTargetValue());
    let cancelled = false;
    const sleep   = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const currDigit = [0, 0, 0, 0];

    const init = (i: number, d: number) => {
      currDigit[i] = d;
      const s = String(d);
      if (topBackSpans.current[i]) topBackSpans.current[i]!.textContent = s;
      if (botBackSpans.current[i]) botBackSpans.current[i]!.textContent = s;
    };

    const flip = (i: number, from: number, to: number, tickMs: number): Promise<void> =>
      new Promise(resolve => {
        const flap     = flapDivs.current[i];
        const flapSpan = flapSpans.current[i];
        const topSpan  = topBackSpans.current[i];
        const botSpan  = botBackSpans.current[i];
        if (!flap || !flapSpan || !topSpan || !botSpan) { resolve(); return; }

        currDigit[i]               = to;
        topSpan.textContent        = String(to);
        flapSpan.textContent       = String(from);
        flapSpan.style.marginTop   = "0";
        flap.style.top             = "0";
        flap.style.transformOrigin = "center bottom";
        flap.style.borderRadius    = "8px 8px 0 0";
        flap.style.background      = "rgba(0,0,0,0.04)";
        flap.style.display         = "block";
        flap.style.transform       = "skew(0deg) scaleY(1)";

        let step  = 0;
        let phase: "top" | "bottom" = "top";

        const timer = setInterval(() => {
          if (phase === "top") {
            flap.style.transform = TOP_STEPS[step];
            step++;
            if (step >= TOP_STEPS.length) {
              phase                      = "bottom";
              step                       = 0;
              flapSpan.textContent       = String(to);
              flapSpan.style.marginTop   = `${-(PH / 2)}px`;
              flap.style.top             = `${PH / 2}px`;
              flap.style.transformOrigin = "center top";
              flap.style.borderRadius    = "0 0 8px 8px";
              flap.style.background      = "transparent";
              flap.style.transform       = BOT_STEPS[0];
            }
          } else {
            flap.style.transform = BOT_STEPS[step];
            step++;
            if (step >= BOT_STEPS.length) {
              clearInterval(timer);
              flap.style.display  = "none";
              botSpan.textContent = String(to);
              resolve();
            }
          }
        }, tickMs);
      });

    const startChaos = (panelIdx: number, chaosIdx: number) => {
      chaosActive.current[chaosIdx] = true;
      const loop = () => {
        if (!chaosActive.current[chaosIdx] || cancelled) return;
        const from = currDigit[panelIdx];
        const to   = (from + 1 + Math.floor(Math.random() * 7)) % 10;
        flip(panelIdx, from, to, 22).then(() => {
          if (chaosActive.current[chaosIdx] && !cancelled) loop();
        });
      };
      loop();
    };

    const runOnce = async () => {
      for (let i = 0; i < 4; i++) init(i, 0);
      await sleep(400);
      if (cancelled) return;

      startChaos(1, 0);
      startChaos(2, 1);
      startChaos(3, 2);

      for (let d = 1; d <= targets[0]; d++) {
        if (cancelled) return;
        await flip(0, d - 1, d, 65);
        await sleep(1000);
      }

      chaosActive.current[0] = chaosActive.current[1] = chaosActive.current[2] = false;
      await sleep(300);
      if (cancelled) return;

      const s1 = flip(1, currDigit[1], targets[1], 75);
      await sleep(220);
      const s2 = flip(2, currDigit[2], targets[2], 75);
      await sleep(220);
      const s3 = flip(3, currDigit[3], targets[3], 75);
      await Promise.all([s1, s2, s3]);

      await sleep(HOLD_MS);
      if (cancelled) return;

      await flip(3, targets[3], (targets[3] + 1) % 10, 55);
    };

  const setOpacity = (val: number, duration = 1000) => {
      const el = panelsRef.current;
      if (!el) return;
      el.style.transition = `opacity ${duration}ms ease-in-out`;
      el.style.opacity    = String(val);
    };

    const loop = async () => {
      setOpacity(1, 600);
      while (!cancelled) {
        await runOnce();
        if (cancelled) break;

        // Hold at end before fading
        await sleep(6000);
        if (cancelled) break;

        // Fade out
        setOpacity(0, 1000);
        await sleep(1200);
        if (cancelled) break;

        // Brief pause invisible
        await sleep(400);
        if (cancelled) break;

        // Fade back in, then let animation breathe before starting
        setOpacity(1, 800);
        await sleep(900);
      }
    };

    loop();
    return () => {
      cancelled = true;
      chaosActive.current[0] = chaosActive.current[1] = chaosActive.current[2] = false;
    };
  }, []);

  const digitStyle = (isBottom: boolean): React.CSSProperties => ({
    display: "block",
    height: PH,
    lineHeight: `${PH}px`,
    fontSize: FS,
    fontWeight: 700,
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#d4561d",
    textAlign: "center",
    letterSpacing: "-0.03em",
    userSelect: "none",
    marginTop: isBottom ? -(PH / 2) : 0,
  });

  const halfBase: React.CSSProperties = {
    position: "absolute", left: 0, right: 0,
    height: PH / 2, overflow: "hidden",
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-5" style={{ aspectRatio: "5 / 3", padding: "24px 16px 12px" }}>
      <style>{`
        @keyframes influenceGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1.0; }
        }
      `}</style>

      {/* Panels row */}
      <div ref={panelsRef} style={{ display: "flex", alignItems: "center", gap: 6, position: "relative", margin: "0 auto" }}>

        {/* Soft orange glow blob */}
        <div style={{
          position: "absolute", inset: -32,
          background: "radial-gradient(ellipse at center, rgba(212,86,29,0.20) 0%, transparent 68%)",
          animation: "influenceGlow 3.5s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {([0, 1, 2, 3] as const).map(i => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 1 }}>

            {i === 2 && (
              <div style={{
                fontSize: FS * 0.6, fontWeight: 700,
                color: "#d4561d",
                fontFamily: "system-ui, sans-serif",
                marginBottom: PH * 0.08, flexShrink: 0,
              }}>.</div>
            )}

            <div style={{
              width: PW, height: PH, position: "relative",
              borderRadius: 8, flexShrink: 0,
              boxShadow: "0 0 18px rgba(212,86,29,0.22), 0 0 4px rgba(212,86,29,0.12)",
            }}>
              {/* Top half — slightly darker (new digit sits here) */}
              <div style={{
                ...halfBase, top: 0,
                background: "var(--background)",
                borderRadius: "8px 8px 0 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)", borderRadius: "8px 8px 0 0", pointerEvents: "none" }} />
                <span ref={el => { topBackSpans.current[i] = el; }} style={digitStyle(false)}>0</span>
              </div>

              {/* Bottom half */}
              <div style={{
                ...halfBase, top: PH / 2,
                background: "var(--background)",
                borderRadius: "0 0 8px 8px",
              }}>
                <span ref={el => { botBackSpans.current[i] = el; }} style={digitStyle(true)}>0</span>
              </div>

              {/* Animated flap */}
              <div
                ref={el => { flapDivs.current[i] = el; }}
                style={{
                  position: "absolute", left: 0, right: 0,
                  height: PH / 2, overflow: "hidden",
                  display: "none", zIndex: 2,
                }}
              >
                <span ref={el => { flapSpans.current[i] = el; }} style={digitStyle(false)}>0</span>
              </div>
            </div>
          </div>
        ))}

        {/* %* suffix */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: 4, gap: 0, zIndex: 1 }}>
          <span style={{ fontSize: FS * 0.5, fontWeight: 700, color: "#d4561d", lineHeight: 1, fontFamily: "system-ui, sans-serif" }}>%</span>
          <span style={{ fontSize: 11, color: "#d4561d", opacity: 0.5, fontFamily: "system-ui, sans-serif", lineHeight: 1.4 }}>*</span>
        </div>

      </div>{/* close panels row */}

      {/* Source note + tooltip */}
      <div style={{ position: "relative", textAlign: "center" }}>
        <p style={{
          fontSize: 18, fontWeight: 400,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#d4561d", opacity: 0.75,
          textAlign: "center", lineHeight: 1.6,
          margin: 0,
        }}>
          Almost 2 of 3 searches are now answered by AI.<br />
          Estimate mapped from{" "}
          <span
            ref={triggerRef}
            className="hidden md:inline"
            style={{ cursor: "help", textDecoration: "underline" }}
            onMouseEnter={openTooltip}
            onMouseLeave={scheduleClose}
          >multiple sources</span>
          <span className="md:hidden">multiple sources</span>
          , mid 2026*
        </p>

        {tooltipOpen && (
          <div
            className="hidden md:block"
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onMouseLeave={scheduleClose}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--background)",
              border: "1px solid rgba(212,86,29,0.2)",
              borderRadius: 8, padding: "14px 18px",
              width: 480, zIndex: 9999,
              boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
              textAlign: "left",
            }}
          >
            <p style={{
              fontSize: 14, lineHeight: 1.45, margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#d4561d", opacity: 0.85,
            }}>
              Google processes ~8.5B searches daily.{" "}
              <a href="https://www.conductor.com/academy/information-technology-aeo-geo-benchmarks/"
                 target="_blank" rel="noopener noreferrer"
                 style={{ color: "#d4561d", fontWeight: 600, textDecoration: "underline" }}>
                Conductor (Q1 2026)
              </a>{" "}
              found 25% trigger AI Overviews across 21.9M queries — 2.125B daily answers.
              Direct AI tools handle a further ~1.25B search-equivalent queries daily (
              <a href="https://www.digitalapplied.com/blog/ai-search-seo-statistics-2026-definitive-collection"
                 target="_blank" rel="noopener noreferrer"
                 style={{ color: "#d4561d", fontWeight: 600, textDecoration: "underline" }}>
                Digital Applied, 2026
              </a>
              ). Mapped against ~5.5B total discovery searches:{" "}
              <strong>3.375B ÷ 5.5B = 61.40%.</strong>{" "}
              Projected forward at ~0.02% per day as adoption grows.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
