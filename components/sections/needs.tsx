"use client";

import React, { useEffect, useRef } from "react";
import InfluenceIcon from "@/components/ui/illustrations/influence-icon";
import InsightsIcon from "@/components/ui/illustrations/insights-icon";
import StrategyIcon from "@/components/ui/illustrations/strategy-icon";
import SectionHeader from "@/components/section-header";
import Container from "@/components/container";
import RevealText from "@/components/ui/reveal-text";
import SectionArc from "@/components/section-arc";

const issues = [
  {
    title: "AI is changing how, and if, we're found.",
    body: [
      "I want to know what's being asked about us and how AI replies. When I look, it's not quite right but I don't know how best to change it.",
    ],
    icon: <InfluenceIcon />,
  },
  {
    title: "Honestly, I can't tell what content works best.",
    body: [
      "We produce a lot of content. Analytics tells me what spiked but I can't see what sticks. We run more on instinct than insights.",
    ],
    icon: <InsightsIcon />,
  },
  {
    title: "I need a way of using AI more strategically.",
    body: [
      "My team use AI to create content. But my question is: how do I get strategic insights from what AI is saying? A way to inform and change how we communicate.",
    ],
    icon: <StrategyIcon />,
  },
];

export default function Needs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stickyBox = stickyBoxRef.current;
    if (!track || !stickyBox) return;

    function getBgs() { return Array.from(track!.querySelectorAll(".card-bg")) as HTMLElement[]; }
    function getContents() { return Array.from(track!.querySelectorAll(".card-content")) as HTMLElement[]; }

    function readVars() {
      const contents = getContents();
      const rootStyle = getComputedStyle(document.documentElement);
      const cardHeight = parseFloat(rootStyle.getPropertyValue('--card-height'));
      const cardGap    = parseFloat(rootStyle.getPropertyValue('--card-gap'));
      const cardTopPadding = parseFloat(getComputedStyle(contents[0]).paddingTop);
      const maxH3Height = Math.max(...contents.map(content => {
        const h3 = content.querySelector('h3') as HTMLElement | null;
        return h3 ? h3.offsetHeight : 0;
      }));
      const stackOffset = cardTopPadding + maxH3Height + 8;
      return { stackOffset, initialGap: cardHeight + cardGap };
    }

    function isMobile() { return window.innerWidth < 768; }

    function resetMobile() {
      const contents = getContents();
      track!.style.height = '';
      stickyBox!.style.position = 'relative';
      stickyBox!.style.top = 'auto';
      stickyBox!.style.height = 'auto';
      stickyBox!.style.width = 'calc(100% - 3rem)';
      contents.forEach((content, i) => {
        content.style.position = 'relative';
        content.style.height = 'auto';
        content.style.top = 'auto';
        content.style.left = 'auto';
        content.style.transform = '';
        content.style.marginBottom = i < contents.length - 1 ? '5rem' : '';
      });
    }

    function resetDesktop() {
      const bgs = getBgs();
      const contents = getContents();
      stickyBox!.style.position = 'sticky';
      stickyBox!.style.top = '15vh';
      stickyBox!.style.width = 'calc(100% - 3rem)';
      [...bgs, ...contents].forEach(layer => {
        layer.style.position = 'absolute';
        layer.style.height = 'var(--card-height)';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.marginBottom = '';
      });
    }

    function updateLayout() {
      if (isMobile()) { resetMobile(); return; }
      resetDesktop();
      const bgs = getBgs();
      const { stackOffset, initialGap } = readVars();
      const lastCardIndex = bgs.length - 1;
      stickyBox!.style.height = `calc(var(--card-height) + ${stackOffset * lastCardIndex}px)`;
      const travelDistance = lastCardIndex * (initialGap - stackOffset);
      const stickyTopPx = window.innerHeight * 0.15;
      const containerHeight = stickyBox!.offsetHeight;
      track!.style.height = `${travelDistance + stickyTopPx + containerHeight + 128}px`;
    }

    function scrollHandler() {
      if (isMobile()) return;
      const bgs = getBgs();
      const contents = getContents();
      const { stackOffset, initialGap } = readVars();
      const rect = track!.getBoundingClientRect();
      const scrollDistance = Math.max(0, -rect.top);
      bgs.forEach((bg, i) => {
        const startY = i * initialGap;
        const finalStackY = i * stackOffset;
        const currentY = Math.max(finalStackY, startY - scrollDistance);
        bg.style.transform = `translateY(${currentY}px)`;
        contents[i].style.transform = `translateY(${currentY}px)`;
      });
    }

    const handleResize = () => { updateLayout(); scrollHandler(); };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", handleResize);
    updateLayout();
    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="needs" className="relative scroll-mt-24" style={{ background: 'var(--needs-bg)', paddingBottom: '12vw' }}>
      <div
        ref={trackRef}
        className="pb-32"
        style={{ position: 'relative', width: '100%', overflow: 'clip', isolation: 'isolate' }}
      >
        <div className="px-6 pt-8 pb-20">
          <Container>
            <SectionHeader
              label="Comms needs"
              title="What communication leaders are telling us."
              subtitle="Three things we keep hearing — the insights that drive how we develop Intentional as a comms-first AI service."
            />
          </Container>
        </div>
        {/* Decorative circles — no z-index: paints below all explicitly z-indexed card layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="circle-bg hidden md:block absolute rounded-full border border-orange/20 pointer-events-none" style={{ width: '600px', height: '600px', top: '-120px', right: '-180px' }} />
          <div className="circle-bg hidden md:block absolute rounded-full border border-orange/15 pointer-events-none" style={{ width: '320px', height: '320px', top: '200px', left: '-100px' }} />
          <div className="circle-bg hidden md:block absolute rounded-full border border-orange/15 pointer-events-none" style={{ width: '900px', height: '900px', bottom: '-300px', right: '-200px' }} />
          <div className="circle-bg hidden md:block absolute rounded-full border border-orange/15 pointer-events-none" style={{ width: '180px', height: '180px', bottom: '200px', left: '30%' }} />
        </div>

        <div
          ref={stickyBoxRef}
          className="needs-sticky"
          style={{
            position: 'sticky',
            top: '15vh',
            height: 'var(--card-height)',
            width: 'calc(100% - 3rem)',
            maxWidth: '1280px',
            margin: '0 auto',
            overflow: 'visible',
          }}
        >
          {issues.map((issue, index) => (
            <React.Fragment key={index}>
              {/* Background layer — covers cards below as they stack; card 0 is transparent so circles show through */}
              <div
                className="card-bg hidden md:block"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 'var(--card-height)',
                  boxSizing: 'border-box',
                  zIndex: index * 3 + 1,
                  willChange: 'transform',
                  ...(index === 0 && { background: 'transparent' }),
                }}
              />
              {/* Content layer — h3 + body, always one above its own bg layer */}
              <div
                className="card-content pt-6 md:pt-10"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 'var(--card-height)',
                  boxSizing: 'border-box',
                  zIndex: index * 3 + 3,
                  willChange: 'transform',
                  ...(index === 0 && { backgroundColor: 'transparent' }),
                }}
              >
                <RevealText as="h3" className="mb-6 md:mt-0 md:mb-10">{issue.title}</RevealText>
                <div className="grid grid-cols-12 gap-y-4 md:gap-8">
                  <div className="col-span-12 md:col-span-6 min-w-0 overflow-visible flex items-center">{issue.icon}</div>
                  <div className="col-span-12 md:col-span-6 prose quote-bubble space-y-4 self-start md:p-12">
                    {issue.body.map((para, i) => (
                      <p key={i} className="text-body md:text-sub italic text-headline">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <SectionArc fill="var(--background)" invert height={115} peak={0.3} radius={3200} />
    </section>
  );
}
