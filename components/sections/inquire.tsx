"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal-context";
import ThinkingDots from "@/components/ui/thinking-dots";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import SectionArc from "@/components/section-arc";
import BrandText from "@/components/ui/brand-text";

export default function Inquire() {
  const { openModal } = useModal();
  const [ctaHovered, setCtaHovered] = useState(false);
  const imageColRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateCircle = () => {
      if (!imageColRef.current || !sectionRef.current) return;
      const imageRect = imageColRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      sectionRef.current.style.setProperty('--circle-left', `${imageRect.left - sectionRect.left}px`);
      sectionRef.current.style.setProperty('--circle-top', `${imageRect.top + imageRect.height / 2 - sectionRect.top}px`);
    };
    updateCircle();
    window.addEventListener('resize', updateCircle, { passive: true });
    return () => window.removeEventListener('resize', updateCircle);
  }, []);

  useEffect(() => {
    const box = document.getElementById("parallaxBox");
    if (!box) return;
    const handleScroll = () => {
      const rect = box.getBoundingClientRect();
      const winH = window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height)));
      document.documentElement.style.setProperty("--scroll", scrolled.toString());
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="inquire" className="relative pt-32 px-6" style={{ background: 'linear-gradient(to bottom, #a83d10, #d4561d)', paddingBottom: 'calc(6rem + 12vw)' }}>
      {/* Decorative background circle — direct child of section (no overflow clip here) so it can bleed above the section boundary */}
      <div
        className="hidden md:block absolute rounded-full pointer-events-none"
        style={{ height: '80%', aspectRatio: '1', left: 'var(--circle-left, 50%)', top: 'var(--circle-top, 50%)', transform: 'translateY(-50%)', background: 'rgba(212,86,29,0.5)', zIndex: 2 }}
      />

      <Container className="relative z-10">
        <SectionHeader
          label="Let's talk"
          labelClassName="text-white/60"
          dividerClassName="bg-white/30"
          title={"More than a platform.\nYour partner in AI."}
          titleClassName="!text-white mb-0"
        />

        <div className="grid grid-cols-12 gap-y-12 md:gap-12 items-start mt-16">
          {/* Left: body text + CTA */}
          <div className="col-span-12 md:col-span-6 space-y-6">
              <p className="text-body text-white/80">
                <BrandText text="Intentional is built by people who've spent their careers working with purposeful organisations. We've seen how communications strategy works at its best — and what it costs when the narrative slips." />
              </p>
              <p className="text-body text-white/80">
                We work with a small number of clients at a time. And we stay with them. Every engagement starts with a deep conversation to surface your institutional knowledge. Your organisation, your audiences, what AI currently knows about you. That's the foundation everything else runs on.
              </p>
              <p className="text-body text-white/80">
                From there, you have access to the platform and our comms know-how. Technology and strategy, working together.
              </p>
              <div className="pt-2">
                <motion.button
                  onClick={() => openModal("inquire")}
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                  className="inline-flex items-baseline cursor-pointer border-none font-display font-bold text-sub text-orange rounded-full"
                  initial={false}
                  animate={{
                    backgroundColor: ctaHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,1)",
                    paddingRight: ctaHovered ? "2em" : "1.25em",
                  }}
                  transition={ctaHovered ? {
                    backgroundColor: { duration: 0.5, ease: "easeOut" },
                    paddingRight:    { duration: 0.3, ease: "easeOut" },
                  } : {
                    backgroundColor: { duration: 0.15, ease: "easeOut" },
                    paddingRight:    { duration: 0.15, ease: "easeOut" },
                  }}
                  style={{ paddingLeft: "1.25em", paddingTop: "0.4em", paddingBottom: "0.4em", paddingRight: "1.25em" }}
                >
                  Get Intentional
                  <ThinkingDots isHovered={ctaHovered} />
                </motion.button>
              </div>
          </div>

          {/* Right: image (3 cols) + quote (3 cols) side by side */}
          <div className="col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start md:items-center">
            <div ref={imageColRef} id="parallaxBox" className="parallax-container w-1/2 md:w-full aspect-square rounded-full self-start">
              <img src="/team-photo.jpg" alt="Communications team" className="parallax-img" />
            </div>
            <div>
              <div className="text-4xl leading-none text-white/80 font-serif select-none" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote className="font-display text-sub italic text-white/80 leading-snug mb-4">
                Intentional is a great tool — not just to influence AI, but because it shows how our content shapes our audience's opinions. That's changed how we work.
              </blockquote>
              <div className="w-6 h-px bg-white/30 mb-3" />
              <p className="text-small font-medium text-white/80">Head of Content, Global brand</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Arc clipped to section boundary by its own overflow-hidden wrapper — keeps the circle above unaffected */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SectionArc fill="var(--needs-bg)" invert height={115} peak={0.3} radius={3200} />
      </div>
    </section>
  );
}
