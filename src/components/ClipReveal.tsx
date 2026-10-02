"use client";
import { motion } from "motion/react";

// Media wipes up into view once, the way a print is pulled from a tray.
export function ClipReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(18% 0 0 0 round 18px)", opacity: 0.4, transform: "translateY(24px)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 18px)", opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}
