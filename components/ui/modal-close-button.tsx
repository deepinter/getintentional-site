"use client";

import { motion } from "framer-motion";

interface ModalCloseButtonProps {
  onClick: () => void;
}

export default function ModalCloseButton({ onClick }: ModalCloseButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
      className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors z-10"
      aria-label="Close"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  );
}
