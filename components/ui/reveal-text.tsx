"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

type Token = { type: "word"; text: string } | { type: "break" };

function tokenise(text: string): Token[] {
  const tokens: Token[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) tokens.push({ type: "break" });
    line.split(" ").filter(Boolean).forEach((w) => tokens.push({ type: "word", text: w }));
  });
  return tokens;
}

export default function RevealText({ children, className, as = "h2" }: Props) {
  const Tag = as as React.ElementType;
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tokens = tokenise(children);
  const words = tokens.filter((t): t is Extract<Token, { type: "word" }> => t.type === "word");
  const n = words.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // p = 0 when heading top enters at 85vh, p = 1 when heading top reaches 50vh
      const p = Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (vh * 0.35)));

      wordRefs.current.forEach((span, i) => {
        if (!span) return;
        // Words staggered across the first 70% of p, each transitioning over 30% of p
        const wordP = Math.max(0, Math.min(1, (p - (i / n) * 0.7) / 0.3));
        span.style.opacity = String(0.2 + wordP * 0.8);
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [n]);

  let wordIndex = 0;
  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement>} className={cn("", className)}>
      {tokens.map((token, i) => {
        if (token.type === "break") return <br key={i} />;
        const wi = wordIndex++;
        const isLast = wi === words.length - 1;
        return (
          <span
            key={i}
            ref={(el) => { wordRefs.current[wi] = el; }}
            style={{ opacity: 0.2 }}
          >
            {token.text}{!isLast && tokens[i + 1]?.type !== "break" ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
