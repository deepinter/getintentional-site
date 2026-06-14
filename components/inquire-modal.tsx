"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useModal } from "./modal-context";
import ModalShell from "./ui/modal-shell";
import ThinkingDots from "./ui/thinking-dots";

function FloatingField({
  label, name, type = "text", required, rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [value,   setValue]   = useState("");
  const raised = focused || value.length > 0;

  const shared = {
    name,
    required,
    value,
    onFocus:  () => setFocused(true),
    onBlur:   () => setFocused(false),
    onChange:  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className: "w-full bg-transparent outline-none border-none text-body text-stone-900 font-sans pt-6 pb-1",
  };

  return (
    <div className={cn(
      "relative border-b transition-colors duration-200",
      focused ? "border-orange" : "border-orange/25",
    )}>
      <label className={cn(
        "absolute left-0 pointer-events-none font-sans transition-all duration-200",
        raised ? "top-0 text-xs text-orange" : "top-5 text-body text-stone-400",
      )}>
        {label}
      </label>
      {rows ? (
        <textarea {...shared} rows={rows} className={shared.className + " resize-none"} />
      ) : (
        <input type={type} {...shared} />
      )}
    </div>
  );
}

export default function InquireModal() {
  const { isOpen, modalType } = useModal();
  const isInquire = modalType === "inquire" || modalType === "contact";
  const [submitHovered, setSubmitHovered] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ModalShell isOpen={isOpen && isInquire}>
      <div className="w-full h-full flex items-center justify-center px-6 md:px-16 py-8 md:py-12">
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg"
        >
          <h2 className="font-display font-bold text-h3 text-headline mb-2">
            Get Intentional
          </h2>
          <p className="text-body mb-4 md:mb-8">
            Share a few details and we'll respond with how we can help.
          </p>

          {status === "success" && (
            <div className="py-8">
              <p className="text-body font-display font-bold text-headline mb-2">Thank you.</p>
              <p className="text-body text-stone-500">We'll be in touch shortly.</p>
            </div>
          )}

          {status === "error" && (
            <p className="text-body text-red-600 mb-4">Something went wrong — please try again or email us directly.</p>
          )}

          <form onSubmit={handleSubmit} className={cn("space-y-4 md:space-y-8", status === "success" && "hidden")}>

            {/* Honeypot — invisible to humans, attractive to bots */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
            >
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
            </div>

            <FloatingField label="Your name"               name="name"     required />
            <FloatingField label="Email address"          name="email"    type="email" required />
            <FloatingField label="Organisation / business name" name="business" required />
            <FloatingField label="Website URL"            name="url" />
            <FloatingField label="What's the narrative challenge you're facing?" name="issue" rows={2} required />

            <div className="pt-2 md:pt-4 space-y-3 md:space-y-4">
              <motion.button
                type="submit"
                disabled={status === "sending"}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                className="inline-flex items-baseline cursor-pointer border-none font-display font-bold text-sub rounded-full"
                initial={false}
                animate={{
                  backgroundColor: submitHovered ? "rgba(212,86,29,0.72)" : "rgba(212,86,29,1)",
                  paddingRight:    submitHovered ? "2em" : "1.25em",
                }}
                transition={submitHovered ? {
                  backgroundColor: { duration: 0.4,  ease: "easeOut" },
                  paddingRight:    { duration: 0.3,  ease: "easeOut" },
                } : {
                  backgroundColor: { duration: 0.15, ease: "easeOut" },
                  paddingRight:    { duration: 0.15, ease: "easeOut" },
                }}
                style={{ paddingLeft: "1.25em", paddingTop: "0.4em", paddingBottom: "0.4em", color: "#ffffff" }}
              >
                {status === "sending" ? "Sending" : "Submit"}
                <ThinkingDots isHovered={submitHovered || status === "sending"} color="#ffffff" />
              </motion.button>

              <p className="text-small text-stone-400">
                By submitting you agree to our privacy policy.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </ModalShell>
  );
}
