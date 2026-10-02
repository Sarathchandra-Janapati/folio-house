"use client";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleNotch } from "@phosphor-icons/react";

export type MorphState = "idle" | "busy" | "done";

// A submit button whose label crossfades between states. Blur bridges the two labels
// so the swap reads as one change rather than two overlapping words.
export function MorphButton({ state, idle, busy, done, className = "btn btn-primary" }: { state: MorphState; idle: string; busy: string; done: string; className?: string }) {
  return (
    <button type="submit" disabled={state !== "idle"} className={`${className} min-w-[150px] overflow-hidden`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
          exit={{ opacity: 0, transform: "translateY(-12px)", filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="flex items-center gap-2"
        >
          {state === "busy" && <CircleNotch size={16} className="animate-spin" />}
          {state === "done" && <Check size={16} weight="bold" />}
          {state === "idle" ? idle : state === "busy" ? busy : done}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
