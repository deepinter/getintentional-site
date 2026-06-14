"use client";

import Container from "@/components/container";
import { useModal } from "@/components/modal-context";
import SignalsFeed from "@/components/ui/signals-feed";

export default function Footer() {
  const { openModal } = useModal();

  const links: { label: string; action: () => void }[] = [
    { label: "Contact",          action: () => openModal("contact")  },
    { label: "Privacy policy",   action: () => openModal("privacy")  },
    { label: "Terms of service", action: () => openModal("terms")    },
  ];

  return (
    <footer
      className="relative overflow-hidden pt-12 pb-32 px-6"
      style={{ background: "linear-gradient(to bottom, #4c0c0c, #2a0606)" }}
    >
      {/* Decorative logotype watermark */}
      <img
        src="/intentional-icon.svg"
        aria-hidden="true"
        className="hidden md:block absolute pointer-events-none z-0 opacity-5"
        style={{
          height: "150%",
          width: "auto",
          right: "-10%",
          top: 0,
          transform: "translateX(25%)",
          filter: "brightness(0) invert(1)",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-8">

          {/* ── Left: brand statement + links + copyright (cols 1–6) ── */}
          <div className="col-span-12 md:col-span-6 flex flex-col h-full order-2 md:order-1">
            {/* Brand statement */}
            <div>
              <div className="text-h2 font-display font-bold text-white leading-tight">
                intentional<span className="text-orange">.</span>
              </div>
              <p className="text-sub font-display font-bold text-white/50 mt-1">
                Take control of your narrative.
              </p>
              <p className="text-sub font-display font-bold text-white/75 mt-1">
                Get intentional with AI.
              </p>
            </div>

            {/* Links + copyright — pushed to bottom of grid row */}
            <div className="mt-auto pt-8">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
                {links.map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="text-small text-white/40 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-small text-white/40">
                © 2026 Intentional. All rights reserved.
              </p>
            </div>
          </div>

          {/* ── Right: Signals (cols 7–12) ── */}
          <div className="col-span-12 md:col-span-6 order-1 md:order-2 pb-12 md:pb-0">
            <SignalsFeed />
          </div>

        </div>
      </Container>
    </footer>
  );
}
