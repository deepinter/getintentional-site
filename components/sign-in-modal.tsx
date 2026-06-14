"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useModal } from "./modal-context";
import ModalShell from "./ui/modal-shell";
import ThinkingDots from "./ui/thinking-dots";

function FloatingField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const raised = focused || value.length > 0;

  return (
    <div className={cn(
      "relative border-b transition-colors duration-200",
      focused ? "border-orange" : "border-orange/25",
    )}>
      <label className={cn(
        "absolute left-0 pointer-events-none font-sans transition-all duration-200",
        raised ? "top-0 text-small text-orange" : "top-5 text-body text-stone-400",
      )}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none border-none text-body text-stone-900 font-sans pt-6 pb-1"
      />
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function SignInModal() {
  const { isOpen, modalType, openModal } = useModal();
  const isSignIn = modalType === "signin";
  const [submitHovered, setSubmitHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [remember, setRemember] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Reset forgot-password state each time the modal closes
  useEffect(() => {
    if (!isOpen) setForgotSent(false);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to auth provider
  };

  return (
    <ModalShell isOpen={isOpen && isSignIn}>
      <div className="w-full h-full flex items-center justify-center px-6 md:px-16 py-8 md:py-12">
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg"
        >
          {/* Trust signal */}
          <div className="flex items-center gap-2 text-orange mb-8">
            <LockIcon />
            <span className="text-small font-sans font-semibold tracking-widest uppercase">
              Secure sign-in
            </span>
          </div>

          <h2 className="font-display font-bold text-h3 text-headline mb-2">
            Welcome back.
          </h2>
          <p className="text-body mb-8">
            Your Intentional dashboard is waiting.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingField label="Email address" name="email" type="email" required />
            <FloatingField label="Password" name="password" type="password" required />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-orange cursor-pointer"
                />
                <span className="text-small font-sans text-headline">Remember me</span>
              </label>
              {forgotSent ? (
                <span className="text-small font-sans text-headline/50 italic">
                  Check your inbox — we'll send a reset link if that address is registered.
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="text-small font-sans text-orange hover:text-orange/60 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                className="inline-flex items-baseline cursor-pointer border-none font-display font-bold text-sub rounded-full"
                initial={false}
                animate={{
                  backgroundColor: submitHovered ? "rgba(212,86,29,0.72)" : "rgba(212,86,29,1)",
                  paddingRight: submitHovered ? "2em" : "1.25em",
                }}
                transition={submitHovered ? {
                  backgroundColor: { duration: 0.4, ease: "easeOut" },
                  paddingRight: { duration: 0.3, ease: "easeOut" },
                } : {
                  backgroundColor: { duration: 0.15, ease: "easeOut" },
                  paddingRight: { duration: 0.15, ease: "easeOut" },
                }}
                style={{ paddingLeft: "1.25em", paddingTop: "0.4em", paddingBottom: "0.4em", color: "#ffffff" }}
              >
                Sign in
                <ThinkingDots isHovered={submitHovered} color="#ffffff" />
              </motion.button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-orange/15 flex items-baseline gap-3">
            <span className="text-small">Don&apos;t have an account?</span>
            <motion.button
              type="button"
              onClick={() => openModal("inquire")}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="inline-flex items-baseline cursor-pointer border-none font-display font-bold text-small rounded-full"
              initial={false}
              animate={{
                backgroundColor: ctaHovered ? "rgba(212,86,29,1)" : "rgba(212,86,29,0)",
                color: ctaHovered ? "#ffffff" : "#d4561d",
              }}
              transition={ctaHovered ? {
                backgroundColor: { duration: 0.5, ease: "easeOut" },
                color:           { duration: 0.5, ease: "easeOut" },
              } : {
                backgroundColor: { duration: 0.15, ease: "easeOut" },
                color:           { duration: 0.15, ease: "easeOut" },
              }}
              style={{ paddingLeft: "1.25em", paddingTop: "0.4em", paddingBottom: "0.4em", paddingRight: "1.25em" }}
            >
              Get Intentional
              <ThinkingDots isHovered={ctaHovered} color={ctaHovered ? "#ffffff" : "#d4561d"} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </ModalShell>
  );
}
