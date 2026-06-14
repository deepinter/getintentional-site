"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ThinkingDots from "@/components/ui/thinking-dots";
import { useModal } from "@/components/modal-context";

const navLinks = [
  { href: "/#noise", label: "Noise" },
  { href: "/#needs", label: "Needs" },
  { href: "/#platform", label: "Platform" },
  { href: "/#intelligence", label: "Research" },
  { href: "/#inquire", label: "Inquire" },
  { href: "/#faq", label: "FAQ" },
];

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={cn("w-4 h-4", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Navbar() {
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredRight, setHoveredRight] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300",
          menuOpen
            ? "bg-transparent"
            : scrolled
              ? "bg-white/95 backdrop-blur-md border-b border-black/8"
              : "bg-transparent"
        )}
      >
        <div className={cn(
          "max-w-[1280px] mx-auto flex items-center justify-between transition-all duration-300",
          scrolled && !menuOpen ? "h-16" : "h-24"
        )}>
          <a
            href="/"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className={cn(
              "tracking-tight font-display font-bold text-3xl transition-colors duration-300 inline-flex items-baseline",
              menuOpen ? "text-white"
                : scrolled
                  ? logoHovered ? "text-orange/75" : "text-orange"
                  : logoHovered ? "text-white/75" : "text-white"
            )}
          >
            intentional
            {/* Dot container — width fixed to single dot; extras are absolute so nav never shifts */}
            <ThinkingDots isHovered={logoHovered} color={menuOpen ? "#ffffff" : "#d4561d"} />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="relative px-4 py-1.5 rounded-full"
                onMouseEnter={() => setHoveredLink(href)}
              >
                {hoveredLink === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={scrolled
                      ? { background: "rgba(212,86,29,0.10)" }
                      : { background: "rgba(255,255,255,0.20)" }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={cn(
                  "relative z-10 text-body font-sans font-semibold transition-colors",
                  scrolled ? "text-orange" : "text-white"
                )}>
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* Desktop buttons */}
          <div
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredRight(null)}
          >
            {/* Sign in */}
            <button
              onClick={() => openModal("signin")}
              className="relative px-4 py-1.5 rounded-full"
              onMouseEnter={() => setHoveredRight("signin")}
            >
              {hoveredRight === "signin" && (
                <motion.span
                  layoutId="nav-pill-right"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(212,86,29,1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={cn(
                "relative z-10 text-body font-sans font-light transition-colors",
                hoveredRight === "signin" ? "text-white" : scrolled ? "text-orange" : "text-white"
              )}>
                Sign in
              </span>
            </button>

            {/* Get Intentional — opens modal */}
            <button
              onClick={() => openModal("inquire")}
              className="relative px-4 py-1.5 rounded-full"
              onMouseEnter={() => setHoveredRight("cta")}
            >
              {hoveredRight === "cta" && (
                <motion.span
                  layoutId="nav-pill-right"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(212,86,29,1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={cn(
                "relative z-10 text-body font-sans font-light transition-colors inline-flex items-baseline",
                hoveredRight === "cta" ? "text-white" : scrolled ? "text-orange" : "text-white"
              )}>
                Get Intentional
                <ThinkingDots
                  isHovered={hoveredRight === "cta"}
                  color={hoveredRight === "cta" ? "#ffffff" : scrolled ? "#d4561d" : "#ffffff"}
                />
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              menuOpen || !scrolled ? "bg-white" : "bg-orange",
              menuOpen ? "rotate-45 translate-y-2" : ""
            )} />
            <span className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              menuOpen || !scrolled ? "bg-white" : "bg-orange",
              menuOpen ? "opacity-0" : ""
            )} />
            <span className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              menuOpen || !scrolled ? "bg-white" : "bg-orange",
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            )} />
          </button>
        </div>
      </header>

      {/* Mobile menu — background layer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-orange md:hidden transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ transitionDelay: menuOpen ? "0ms" : "150ms" }}
        aria-hidden="true"
      />

      {/* Mobile menu — content layer */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col px-6 pt-32 pb-12 md:hidden transition-opacity duration-200",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ transitionDelay: menuOpen ? "220ms" : "0ms" }}
      >
        <nav className="flex flex-col gap-2 mb-12">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sub font-sans font-semibold text-white hover:text-white/70 transition-colors py-2"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-6 mt-auto">
          <button
            onClick={() => { openModal("signin"); setMenuOpen(false); }}
            className="text-body font-sans font-light text-white hover:text-white/70 transition-colors"
          >
            Sign in
          </button>

          {/* Mobile CTA — opens modal, matches desktop style */}
          <button
            onClick={() => { openModal("inquire"); setMenuOpen(false); }}
            className="px-5 py-2 rounded-full bg-white text-orange font-sans font-semibold text-body"
          >
            Get Intentional
          </button>
        </div>
      </div>
    </>
  );
}
