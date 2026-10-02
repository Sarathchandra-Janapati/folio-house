"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// First visit per session only: a counter runs to 100, then the curtain lifts.
export function Preloader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("fh-intro") === "1"; } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    try { sessionStorage.setItem("fh-intro", "1"); } catch {}
    const start = performance.now();
    const D = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / D);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#0b0b0c] p-[var(--gutter)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="label">Folio House</span>
            <span className="label">Independent designers</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ transform: "translateY(100%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="display-xxl tnum text-ink"
            >
              {n}
            </motion.p>
          </div>
          <div className="h-px w-full bg-[rgba(255,255,255,0.12)]">
            <div className="h-px bg-[#e9cf9f]" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
