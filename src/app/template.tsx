"use client";
import { motion } from "motion/react";

// Each route arrives with a short rise and focus pull.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(12px)", filter: "blur(6px)" }}
      animate={{ opacity: 1, transform: "none", filter: "none" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
