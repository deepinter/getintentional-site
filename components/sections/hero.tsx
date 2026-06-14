"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal-context";
import ThinkingDots from "@/components/ui/thinking-dots";
import Container from "@/components/container";
import SectionArc from "@/components/section-arc";

export default function Hero() {
  const { openModal } = useModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Defer video loading until after window.load so it doesn't compete with LCP
    const load = () => {
      video.src = "/hero-background-8428256-hd_1920_1080_25fps.mp4";
      video.load();
    };
    if (document.readyState === "complete") {
      load();
    } else {
      window.addEventListener("load", load, { once: true });
    }
  }, []);

  return (
    <section className="relative flex items-center px-6 overflow-hidden min-h-[max(600px,80vh)]">
      {/* poster= shows instantly as the LCP image; src is injected post-load */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #ff611a, transparent)',
          mixBlendMode: 'luminosity'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #eeeeee, transparent)' }}
      />

      <Container className="relative z-10 w-full">
        <div className="prose">
          <h1 className="leading-[1.06] mb-8 max-w-[16ch] md:max-w-none">
            Take control of your narrative.
            <br />
            <span className="text-white">Get intentional with AI.</span>
          </h1>

          <p className="speakable text-sub text-headline mb-10">
            Built for comms leaders who want AI working on strategy as well as content.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
          <motion.button
            onClick={() => openModal("inquire")}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            className="inline-flex items-baseline cursor-pointer border-none font-display font-bold text-sub rounded-full"
            initial={false}
            animate={{
              backgroundColor: ctaHovered ? "rgba(255,255,255,1)" : "rgba(212,86,29,1)",
              color: ctaHovered ? "#d4561d" : "#ffffff",
              paddingRight: ctaHovered ? "2em" : "1.25em",
            }}
            transition={ctaHovered ? {
              backgroundColor: { duration: 0.5, ease: "easeOut" },
              color:           { duration: 0.5, ease: "easeOut" },
              paddingRight:    { duration: 0.3, ease: "easeOut" },
            } : {
              backgroundColor: { duration: 0.15, ease: "easeOut" },
              color:           { duration: 0.15, ease: "easeOut" },
              paddingRight:    { duration: 0.15, ease: "easeOut" },
            }}
            style={{ paddingLeft: "1.25em", paddingTop: "0.4em", paddingBottom: "0.4em", paddingRight: "1.25em" }}
          >
            Get Intentional
            <ThinkingDots isHovered={ctaHovered} />
          </motion.button>
          <a
            href="#intelligence"
            className="font-sans text-body text-orange hover:text-orange/80 transition-colors"
          >
            New research
          </a>
          </div>
        </div>
      </Container>
      <SectionArc fill="var(--background)" invert height={115} peak={0.3} radius={3200} />
    </section>
  );
}
