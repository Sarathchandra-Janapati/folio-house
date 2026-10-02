"use client";
import { motion } from "motion/react";

// Headline words rise and sharpen one after another on first paint.
export function SplitWords({ text, className = "", delay = 0, accentFrom }: { text: string; className?: string; delay?: number; accentFrom?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${accentFrom !== undefined && i >= accentFrom ? "text-gradient" : ""}`}
            initial={{ transform: "translateY(105%)", opacity: 0, filter: "blur(10px)" }}
            animate={{ transform: "translateY(0%)", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
