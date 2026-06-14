"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import SectionArc from "@/components/section-arc";
import BrandText from "@/components/ui/brand-text";
import { useModal } from "@/components/modal-context";

type Faq = {
  q: string;
  a: string;
  link?: { word: string; href: string };
};

const faqs: Faq[] = [
  {
    q: "What is Intentional?",
    a: "Intentional is a dedicated AI-powered platform and service for comms leaders. The platform monitors what AI says about your organisation, responds with content built on your institutional knowledge, and tracks how your narrative shifts. You are supported by our team of strategic communications specialists, combining technology with comms expertise to keep your voice accurate and visible in an AI-first world.",
  },
  {
    q: "Can ChatGPT do this instead?",
    a: "ChatGPT will tell you what AI knows about your organisation right now. That's useful — once. Intentional is a different thing entirely: a continuous intelligence loop that monitors your narrative, surfaces what's shifting, and gives you the strategic response to act on it. Backed by communications expertise, it changes how your team works — moving from gut feel to insight-driven decisions. Less guessing. More impact.",
  },
  {
    q: "Why do I need this?",
    a: "AI answer engines are already where many of your audiences go first. They don't direct people to your content — they answer instead of it. Most communications strategies haven't caught up. The organisations that establish their AI presence now, before narratives solidify, will be significantly harder to displace. Intentional identifies more beneath the surface: the way AI responds to queries about your organisation reveals how your audiences think and what they need — intelligence that sharpens your entire communications strategy.",
  },
  {
    q: "Is this the same as AEO/GEO?",
    a: "AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) are the emerging disciplines for ensuring AI represents your organisation accurately. Intentional operates at this layer — but brings a strategic communications layer on top. It doesn't just optimise once; it monitors continuously, responds with content built on your institutional knowledge, and helps your team stay ahead of the narrative.",
  },
  {
    q: "How does it work?",
    a: "Intentional monitors all major AI platforms — ChatGPT, Perplexity, Google AI Overviews, and Claude — exploring your topic from multiple angles, the way a real audience would ask. When it detects a gap or opportunity, it drafts a structured response built on your institutional knowledge — designed to be absorbed by AI as credible and authoritative. That same response can also brief your content team and feed your wider comms strategy. You approve everything before it's published.",
  },
  {
    q: "What's it like to use?",
    a: "Most people experience Intentional as a short email — what's shifted in your narrative, and what's already been drafted in response. From there, you go to the platform to review the full draft. A built-in AI chat helps you shape it further if you need to. When you're happy, you approve. It's published for AI to absorb. And your team has the intelligence to work from.",
  },
  {
    q: "Does it replace my team's skills?",
    a: "No. Most communications teams aren't currently doing continuous AI monitoring, competitor narrative tracking, or systematic content-to-AI feedback loops — so there's no role to replace. But that's precisely why it matters: your brand narrative is being shaped by AI right now, whether you're watching or not. Intentional fills that gap and hands the output to your team. The judgement, the approval, the voice stay with you.",
  },
  {
    q: "What do we have control over?",
    a: "Everything that matters. Monitoring and drafting is automated — but strategy and approval are always yours. When Intentional surfaces a problem or opportunity, it brings you a draft. You shape it, approve it, and decide what gets published. Nothing goes out without your sign-off. The system amplifies your judgment; it doesn't replace it.",
  },
  {
    q: "Who owns the content?",
    a: "You do — entirely. Your institutional knowledge stays yours, the content produced is yours, and nothing is used to train AI models or shared outside your engagement. Intentional is built on the principle that what you know, and how you communicate it, is yours to protect.",
  },
  {
    q: "What results should I expect?",
    a: "In the short term, clarity — a live view of how AI currently represents you, where the gaps are, and what competitors are saying. Those insights also inform your wider comms strategy, shaping what your team works on and where to focus. Over time, measurable narrative shift: AI positioning your organisation more accurately, in your voice. We track this from day one, so the change is visible, not assumed.",
  },
  {
    q: "Who do you work with?",
    a: "Purposeful organisations with something meaningful to communicate — typically mid-to-large organisations where reputation and narrative are strategically important. We work with a small number of clients at a time, which means every engagement gets our full attention.",
  },
  {
    q: "How do we get started?",
    a: "With a conversation. We start by understanding your organisation — your audiences, your approved messaging, and what AI currently knows about you. From that we build your institutional memory — the knowledge base everything runs on. Most clients are fully operational within a month. The one technical step is a dedicated folder on your domain where approved content is published — a one-time setup with your web team, not a project.",
    link: { word: "conversation", href: "#" },
  },
];

function renderAnswer(faq: Faq, openModal?: () => void) {
  if (!faq.link) return <BrandText text={faq.a} />;
  const idx = faq.a.indexOf(faq.link.word);
  if (idx === -1) return <BrandText text={faq.a} />;
  const before = faq.a.slice(0, idx);
  const after = faq.a.slice(idx + faq.link.word.length);
  return (
    <>
      <BrandText text={before} />
      <button onClick={openModal} className="underline underline-offset-2 hover:text-orange transition-colors cursor-pointer">{faq.link.word}</button>
      <BrandText text={after} />
    </>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { openModal } = useModal();

  return (
    <section id="faq" className="relative pt-24 px-6" style={{ background: 'var(--needs-bg)', paddingBottom: 'calc(8rem + 12vw)' }}>
      <Container>
        <div className="mb-16">
          <SectionHeader label="FAQ" title="Ask us anything." titleClassName="mb-6" />
        </div>

        <div className="grid grid-cols-12 md:gap-x-8 items-start">
          {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((col, colIdx) => (
            <div key={colIdx} className={cn("col-span-12 md:col-span-6 divide-y divide-headline/30", colIdx === 1 && "border-t md:border-t-0 border-headline/30")}>
              {col.map((faq) => {
                const i = faqs.indexOf(faq);
                return (
                  <div key={i}>
                    <button
                      className="w-full flex items-start justify-between py-7 text-left gap-6 group cursor-pointer"
                      onClick={() => setOpen(open === i ? null : i)}
                      aria-expanded={open === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span
                        className={cn(
                          "text-body font-semibold leading-snug bg-clip-text text-transparent bg-[length:200%_100%]",
                          "transition-[background-position] duration-300 ease-out",
                          open === i ? "bg-left group-hover:bg-right" : "bg-right group-hover:bg-left"
                        )}
                        style={{ backgroundImage: 'linear-gradient(to right, var(--color-orange) 50%, #1c1917 50%)' }}
                      >
                        {faq.q}
                      </span>
                      <svg
                        className={cn(
                          "flex-shrink-0 w-5 h-5 mt-0.5 text-orange transition-transform duration-300 ease-in-out",
                          open === i ? "rotate-180" : "-rotate-90 group-hover:rotate-0"
                        )}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      id={`faq-answer-${i}`}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-200 ease-out",
                        open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-7">
                          <p className="text-body">{renderAnswer(faq, openModal)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Container>
      <SectionArc fill="#4c0c0c" height={115} peak={0.3} radius={3200} />
    </section>
  );
}
