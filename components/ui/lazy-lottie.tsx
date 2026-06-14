"use client";

/**
 * LazyLottie — loads the Lottie runtime and animation data only when
 * the element scrolls into the viewport. Keeps Lottie off the initial bundle.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { LottieComponentProps } from "lottie-react";

// Dynamic import: Lottie runtime is not included in the initial JS bundle
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = Omit<LottieComponentProps, "animationData"> & {
  /** Path to the JSON file in /public, e.g. "/eyes.json" */
  src: string;
  /** Intersection threshold before loading starts (0–1, default 0.1) */
  threshold?: number;
};

export default function LazyLottie({ src, threshold = 0.1, ...props }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          fetch(src)
            .then((r) => r.json())
            .then(setAnimationData)
            .catch(console.error);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, threshold]);

  return (
    <div ref={containerRef}>
      {animationData && <Lottie animationData={animationData} {...props} />}
    </div>
  );
}
