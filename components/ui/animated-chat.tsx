"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  isComplete: boolean;
  shouldFade?: boolean;
}

const QA_PAIRS = [
  {
    user: "What is your organization's current policy on sustainability?",
    ai: "Based on their 2024 statement, the organization committed to carbon neutrality by 2030. However, I don't have information about updates since then.",
  },
  {
    user: "What about recent partnership announcements?",
    ai: "I found several mentions on Reddit discussing potential partnerships, but I don't see official confirmation from the organization's website.",
  },
  {
    user: "How does this compare to their main competitor?",
    ai: "Their competitor has published updated frameworks as of Q1 2026, including specific governance structures and third-party verification protocols.",
  },
  {
    user: "Do you think I should be working with the competitor?",
    ai: "Based on the fact they appear to be more aligned with your needs I recommend you contact the competitor to discuss your needs first.",
  },
];

const TYPING_SPEED = 10;
const USER_MESSAGE_DELAY = 300;
const TYPING_INDICATOR_DELAY = 500;
const PAUSE_BETWEEN_EXCHANGES = 1000;

export default function AnimatedChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentExchangeRef = useRef(0);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });
    return () => cancelAnimationFrame(timer);
  });

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    let isMounted = true;

    const runAnimation = async () => {
      const qaIndex = currentExchangeRef.current % QA_PAIRS.length;
      const { user, ai } = QA_PAIRS[qaIndex];

      // Add user message
      if (isMounted) {
        setMessages((prev) => [
          ...prev,
          { id: `user-${Date.now()}`, type: "user", text: user, isComplete: true },
        ]);
      }

      await new Promise((resolve) => setTimeout(resolve, USER_MESSAGE_DELAY));

      // Add AI message
      const aiId = `ai-${Date.now()}`;
      if (isMounted) {
        setMessages((prev) => [
          ...prev,
          { id: aiId, type: "ai", text: "", isComplete: false },
        ]);
      }

      await new Promise((resolve) => setTimeout(resolve, TYPING_INDICATOR_DELAY));

      // Type out AI response
      for (let i = 0; i < ai.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, TYPING_SPEED));
        if (isMounted) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiId ? { ...msg, text: ai.slice(0, i + 1) } : msg
            )
          );
        }
      }

      // Mark complete
      if (isMounted) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === aiId ? { ...msg, isComplete: true } : msg))
        );
      }

      await new Promise((resolve) => setTimeout(resolve, PAUSE_BETWEEN_EXCHANGES));

      currentExchangeRef.current += 1;

      // Check if we've completed all exchanges
      if (currentExchangeRef.current >= QA_PAIRS.length) {
        currentExchangeRef.current = 0;

        // Pause for 2.5 seconds before fading out
        await new Promise((resolve) => setTimeout(resolve, 2500));

        // Fade out all messages
        if (isMounted) {
          setMessages((prev) =>
            prev.map((msg) => ({ ...msg, shouldFade: true }))
          );
        }

        // Wait 2 seconds for fade animation then clear
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (isMounted) {
          setMessages([]);
        }
      }

      if (isMounted) {
        setIsAnimating(false);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [isAnimating]);

  // Restart animation when it completes
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => setIsAnimating(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div ref={containerRef} className="flex-1 min-h-0 py-8 space-y-6 scroll-smooth hide-scrollbar" style={{ overflowY: 'overlay', paddingLeft: '2rem', paddingRight: '4rem' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} ${msg.shouldFade ? "opacity-0 transition-opacity duration-500" : "animate-fade-in"}`}
          >
            {msg.type === "user" ? (
              <div className="bg-stone-100 rounded-2xl rounded-tr-sm px-4 py-3 md:max-w-[55%]">
                <p className="text-sm md:text-lg text-stone-900">{msg.text}</p>
              </div>
            ) : (
              <div className="flex gap-3 md:max-w-[68%]">
                <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] font-semibold text-white">AI</span>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-sm md:text-lg text-stone-700 leading-relaxed">{msg.text}</p>
                  {!msg.isComplete && (
                    <div className="flex gap-1 pt-2">
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse delay-100" />
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse delay-200" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 bg-white border-t border-stone-100">
        <div className="h-11 bg-stone-50 border border-stone-200 rounded-xl flex items-center px-4 gap-3">
          <div className="flex-1 h-2 bg-stone-200 rounded-full" />
          <div className="w-7 h-7 rounded-lg bg-stone-100 flex-shrink-0" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-stable {
          scrollbar-gutter: stable;
        }
      `}</style>
    </div>
  );
}
