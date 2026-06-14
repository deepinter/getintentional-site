"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/modal-context";
import ModalCloseButton from "./modal-close-button";

interface ModalShellProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ModalShell({ isOpen, children }: ModalShellProps) {
  const { closeModal } = useModal();
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Focus management — save/restore + move focus into modal on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus();
      }, 700); // after expand animation
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Focus trap — keep Tab cycling inside the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Expanding shell */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ width: 0, height: 2, opacity: 1 }}
              animate={{
                width:  isMobile ? "100%" : "min(100% - 48px, 1280px)",
                height: isMobile ? "100dvh" : "80vh",
                opacity: 1,
              }}
              exit={{
                width: 0,
                height: 2,
                transition: {
                  height: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
                  width: { duration: 0.5, ease: "easeInOut", delay: 0.65 },
                },
              }}
              transition={{
                width: { duration: 0.5, ease: "easeInOut" },
                height: { duration: 0.6, ease: "easeInOut", delay: 0.35 },
              }}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              style={{ borderRadius: isMobile ? 0 : undefined }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex relative"
            >
              <ModalCloseButton onClick={closeModal} />

              {/* Content fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full overflow-y-auto"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
