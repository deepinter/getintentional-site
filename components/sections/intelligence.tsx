"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/container";
import SectionArc from "@/components/section-arc";
import RevealText from "@/components/ui/reveal-text";
import ThinkingDots from "@/components/ui/thinking-dots";

function ReportCover() {
  return (
    <div
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{
        background: '#4c0c0c',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Background image */}
      <Image
        src="/eyes.png"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Dark red tint overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(76,12,12,0.55) 0%, rgba(42,6,6,0.80) 100%)' }}
      />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange/50" />

      <div className="absolute inset-0 flex flex-col p-8">
        {/* Label */}
        <div className="mb-auto">
          <p className="text-small font-sans font-semibold text-orange">Sector Intelligence</p>
          <p className="text-small font-sans text-white/30 mt-0.5">Intentional AI</p>
        </div>

        {/* Title */}
        <h3 className="text-h3 font-display font-bold text-white leading-snug mb-auto" style={{ color: 'white' }}>
          What AI is saying about your sector.
        </h3>

        {/* Footer */}
        <div>
          <div className="w-full h-px bg-white/10 mb-4" />
          <div className="flex items-end justify-between">
            <p className="text-small font-display font-bold text-white/40">
              intentional<span className="text-orange">.</span>
            </p>
            <p className="text-small font-sans text-white/25">2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Intelligence() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      id="intelligence"
      className="relative pt-24 px-6"
      style={{ background: '#4c0c0c', paddingBottom: 'calc(8rem + 12vw)' }}
    >
      <Container>
        {/* Label — sits above the grid so title and thumbnail top-align */}
        <div className="mb-8">
          <span className="block text-small font-semibold text-orange/70 mb-3">Sector intelligence</span>
          <div className="h-px w-1/6 bg-white/20" />
        </div>

        <div className="grid grid-cols-12 gap-y-12 md:gap-12 items-start">

          {/* Text — left */}
          <div className="col-span-12 md:col-span-6 order-1">
            <RevealText className="!text-white mb-6">What AI is saying about your sector.</RevealText>
            <RevealText as="p" className="text-sub text-white/60">We're investigating how AI represents international organisations to their key stakeholders — and where the narrative breaks down.</RevealText>
            <div className="mt-8 space-y-1">
              <p className="text-body text-white/50">12 purposeful organisations working on global challenges.</p>
              <p className="text-body text-white/50">8 AI platforms. ~150 conversations.</p>
              <p className="text-body text-white/50">A 12-page briefing for heads of communications.</p>
            </div>
            <div className="pt-8">
              <motion.a
                href="/intelligence"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className="inline-flex items-baseline font-display font-bold text-sub rounded-full cursor-pointer"
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
                Find out more
                <ThinkingDots isHovered={ctaHovered} />
              </motion.a>
            </div>
          </div>

          {/* Cover — right, starts at col 7 */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 order-2">
            <ReportCover />
          </div>

        </div>
      </Container>
      <SectionArc fill="#a83d10" height={115} peak={0.3} radius={3200} />
    </section>
  );
}
