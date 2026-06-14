"use client";

import { useEffect, useRef } from "react";
import { ModalProvider } from "@/components/modal-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/sections/footer";
import InquireModal from "@/components/inquire-modal";
import LegalModal from "@/components/legal-modal";
import SignInModal from "@/components/sign-in-modal";
import Container from "@/components/container";
import SectionArc from "@/components/section-arc";

const stats = [
  { number: "12",   label: "Organisations studied" },
  { number: "8",    label: "AI platforms" },
  { number: "150+", label: "Conversations captured" },
  { number: "12",   label: "Page briefing" },
];

const findings = [
  "What sources is AI actually citing about you?",
  "How much do platforms disagree about you?",
  "How current is AI's picture of you?",
  "Where does your narrative break as conversations deepen?",
  "What is AI steering people to ask about you next?",
];

function PageContent() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const load = () => { video.src = "/research.mp4"; video.load(); };
    if (document.readyState === "complete") { load(); }
    else { window.addEventListener("load", load, { once: true }); }
  }, []);

  return (
    <main id="main-content">

      {/* Hero */}
      <section className="relative flex items-center px-6 overflow-hidden min-h-[max(600px,80vh)]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark red luminosity overlay — top down */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #4c0c0c, transparent)', mixBlendMode: 'luminosity' }}
        />
        {/* Dark red fade — bottom up */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #2a0606, transparent)' }}
        />

        <Container className="relative z-10 w-full pt-32 pb-24">
          <p className="text-small font-sans font-semibold text-orange mb-6">
            Sector intelligence
          </p>
          <h1
            className="font-display font-bold mb-8 max-w-[20ch] leading-[1.06]"
            style={{ color: 'white' }}
          >
            What AI is saying about your sector.
          </h1>
          <p className="text-sub text-white/60 mb-12 max-w-[45ch]">
            We're investigating how AI represents international organisations to their key stakeholders — and where the narrative breaks down.
          </p>
          <p className="text-sub text-white font-sans">
            Briefing coming soon
          </p>
        </Container>
        <SectionArc fill="var(--background)" invert height={115} peak={0.3} radius={3200} />
      </section>

      {/* Research detail */}
      <section className="relative px-6 pt-24 bg-background" style={{ paddingBottom: 'calc(8rem + 12vw)' }}>
        <Container>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-h2 font-display font-bold text-orange leading-none mb-2">{s.number}</p>
                <p className="text-body text-headline font-bold">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Study + findings */}
          <div className="grid grid-cols-12 md:gap-12 gap-y-12">
            <div className="col-span-12 md:col-span-5">
              <h3 className="text-h3 font-display font-bold text-orange mb-6">The study</h3>
              <p className="text-body mb-4">
                12 purposeful organisations working on global challenges. 8 AI platforms — ChatGPT, Claude, Gemini, Google AI Overviews, Grok, DeepSeek, Perplexity, and Meta AI.
              </p>
              <p className="text-body mb-4">
                3-turn conversations simulating real stakeholder research: donor due diligence and beneficiaries seeking services. ~150 conversations capturing responses, source citations, and AI-suggested follow-ups.
              </p>
              <p className="text-body">
                Over 60% of search is now AI-generated. Your stakeholders aren&apos;t Googling you — they&apos;re asking ChatGPT. And the answer they get depends on which platform, how they ask, and how deep they dig.
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <h3 className="text-h3 font-display font-bold text-orange mb-6">What we&apos;re looking for</h3>
              <ul className="space-y-4">
                {findings.map((f, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-orange font-display font-bold text-body flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body">{f}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </Container>
        <SectionArc fill="#4c0c0c" height={115} peak={0.3} radius={3200} />
      </section>

    </main>
  );
}

export default function IntelligencePage() {
  return (
    <ModalProvider>
      <Navbar />
      <PageContent />
      <Footer />
      <InquireModal />
      <LegalModal />
      <SignInModal />
    </ModalProvider>
  );
}
