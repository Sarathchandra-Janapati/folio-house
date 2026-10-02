"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Work } from "@/lib/data";
import { Art } from "./Art";
import { Photo } from "./Photo";

// Switch between the finished piece and the maker's technical drawing.
export function MediaToggle({ work }: { work: Work }) {
  const [view, setView] = useState<"photo" | "drawing">("photo");
  return (
    <div className="art-frame art-fill relative aspect-[4/5]" data-cursor="">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={view}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(12px)", transform: "scale(1.04)" }}
          animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.25 } }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {view === "photo" ? <Photo work={work} shape="tall" width={1400} variant="hero" priority /> : <Art work={work} shape="tall" variant="hero-d" className="h-full w-full" />}
        </motion.div>
      </AnimatePresence>
      <div className="glass absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full p-1">
        {(["photo", "drawing"] as const).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className="relative rounded-full px-4 py-2 text-[13px] font-medium capitalize">
            {view === v && <motion.span layoutId="mt-pill" className="absolute inset-0 rounded-full bg-[#f3f0ea]" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} />}
            <span className="relative" style={{ color: view === v ? "#111" : "var(--ink)", transition: "color 200ms ease" }}>{v === "photo" ? "Photo" : "Drawing"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
