"use client";

import { motion } from "framer-motion";

interface ThinkingDotsProps {
  isHovered: boolean;
  color?: string;
}

export default function ThinkingDots({ isHovered, color = "#4c0c0c" }: ThinkingDotsProps) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          initial={i > 0 ? { opacity: 0 } : false}
          animate={isHovered
            ? { y: [0, -6, 0], opacity: 1 }
            : { y: 0, opacity: i === 0 ? 1 : 0 }
          }
          transition={{
            y: isHovered
              ? { duration: 0.65, repeat: Infinity, repeatDelay: 1, delay: i * 0.18, ease: "easeInOut" }
              : { duration: 0.2 },
            opacity: { duration: 0.12, delay: isHovered ? i * 0.09 : 0 },
          }}
          style={{
            display: "inline-block",
            color,
            ...(i > 0 ? { position: "absolute" as const, left: `${i * 0.28}em`, top: 0 } : {}),
          }}
        >.</motion.span>
      ))}
    </span>
  );
}
