"use client";

import React, { useState, useRef, useEffect } from "react";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import SectionArc from "@/components/section-arc";
import BrandText from "@/components/ui/brand-text";
import Image from "next/image";
import Lottie from "lottie-react";
import RevealText from "@/components/ui/reveal-text";

const parts = [
  {
    number: "01",
    tagline: "Look through AI's eyes.",
    sentences: [
      "Your audiences are turning to AI for answers — about your sector, your competitors, and you. What AI says has become a proxy for your reputation. Intentional gives you a live view of where you stand.",
      "Most organisations find a gap between what they say and what AI has absorbed. Closing that gap is valuable. But understanding why it exists is where your communications strategy gets smarter.",
    ],
    placeholder: "Monitoring dashboard",
    lottie: "/eyes.json",
  },
  {
    number: "02",
    tagline: "Speak in your voice.",
    sentences: [
      "When Intentional surfaces a problem or opportunity — a misrepresentation, a competitor gaining ground, or a space you should own — it drafts a response. Not a press release. Content built to shift how AI understands you.",
      "The same response is also the brief to your comms and content teams: a single strategic direction for all channels. Before anything goes out, you shape it and approve it. Your knowledge. Your approval. Your voice.",
      "This is where the system becomes strategy, not just software.",
    ],
    placeholder: "Content workflow",
    image: "/brand-voice.png",
  },
  {
    number: "03",
    tagline: "Listen for what matters.",
    sentences: [
      "Intentional tracks how AI's view of your organisation shifts as new content is published. Not sentiment scores. The actual narrative, moving.",
      "You get a short email alert when something needs your attention. Over time, it teaches you what's landing with your audiences and changes how you brief teams, plan campaigns, and stay ahead.",
    ],
    placeholder: "Results tracking",
  },
];

function SectionImage({ label, image, lottie: lottieSrc }: { label: string; image?: string; lottie?: string }) {
  if (lottieSrc) {
    return (
      <div className="w-full aspect-square rounded-full overflow-hidden bg-orange/20 flex items-center justify-center">
        <LottieImage src={lottieSrc} />
      </div>
    );
  }
  if (image) {
    return (
      <div className="relative w-full aspect-square rounded-full overflow-hidden bg-orange">
        <Image src={image} alt={label} fill className="object-cover object-right" />
      </div>
    );
  }
  return (
    <div className="w-full h-96 rounded-[2rem] border border-black/10 bg-stone-50 flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 rounded-md border border-black/10 bg-white" />
      <span className="text-small text-stone-300 text-center px-4">[{label}]</span>
    </div>
  );
}

function LottieImage({ src }: { src: string }) {
  const [animationData, setAnimationData] = React.useState<object | null>(null);
  React.useEffect(() => {
    fetch(src).then(r => r.json()).then(setAnimationData);
  }, [src]);
  if (!animationData) return null;
  return <Lottie animationData={animationData} loop autoplay className="w-full h-full" />;
}

export default function Platform() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndexRef = useRef(0);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.4;

      // Active index (drives image cross-fade)
      let activeIdx = 0;
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        if (ref.getBoundingClientRect().top <= triggerPoint) activeIdx = index;
      });
      if (lastActiveIndexRef.current !== activeIdx) {
        lastActiveIndexRef.current = activeIdx;
        setActiveIndex(activeIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="platform" className="relative pt-24 px-6 bg-background" style={{ paddingBottom: 'calc(8rem + 12vw)' }}>
      <Container>
        <div className="mb-24">
          <SectionHeader
            label="The platform"
            title="The strategy you need and the engine to execute it."
            subtitle="Intentional is an agentic system built around your needs — insights, responses, and impact, all within your control."
          />
        </div>

        {/* Desktop: sticky image right, text left */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 pt-16 md:pt-24">
            {parts.map((part, index) => (
              <div
                key={part.number}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={index < parts.length - 1 ? "mb-32 md:mb-[45vh]" : "mb-32"}
              >
                <RevealText as="h3" className="mb-4">{part.tagline}</RevealText>
                {part.sentences.map((sentence, idx) => (
                  <p key={idx} className="text-body mb-4"><BrandText text={sentence} /></p>
                ))}
              </div>
            ))}
          </div>

          <div ref={rightColRef} className="md:col-span-4 pt-16 md:pt-24 pb-20 md:pb-24">
            <div className="sticky top-[20vh]">
              <div className="relative w-full h-96">
                {parts.map((part, index) => (
                  <div
                    key={part.number}
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <SectionImage label={part.placeholder} image={part.image} lottie={part.lottie} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-32">
          {parts.map((part) => (
            <div key={part.number}>
              <h3 className="mb-4">{part.tagline}</h3>
              {part.sentences.map((sentence, idx) => (
                <p key={idx} className="text-body mb-8"><BrandText text={sentence} /></p>
              ))}
              <SectionImage label={part.placeholder} image={part.image} lottie={part.lottie} />
            </div>
          ))}
        </div>
      </Container>
      <SectionArc fill="#4c0c0c" height={115} peak={0.3} radius={3200} />
    </section>
  );
}
