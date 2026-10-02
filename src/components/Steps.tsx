"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MagnifyingGlass, PaperPlaneTilt, Handshake } from "@phosphor-icons/react";

const STEPS = [
  { h: "Shortlist work you would pay for", p: "Browse by trade, city or material. Save pieces to compare designers side by side.", Icon: MagnifyingGlass, tint: "#b4462f" },
  { h: "Send one brief", p: "Share budget, timeline and references. Designers reply with a scope and a quote.", Icon: PaperPlaneTilt, tint: "#2e4a6b" },
  { h: "Pay in milestones", p: "Funds release at sampling, fitting or site sign-off. Both sides see the same schedule.", Icon: Handshake, tint: "#55663f" },
];

function StepCard({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const s = STEPS[i];
  const scale = useTransform(progress, [i / STEPS.length, 1], [1, 1 - (STEPS.length - i) * 0.04]);
  return (
    <div className="sticky" style={{ top: `calc(120px + ${i * 28}px)` }}>
      <motion.div
        className="grid gap-6 overflow-hidden rounded-[28px] p-[clamp(24px,4vw,48px)] md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"
        style={{ scale, transformOrigin: "50% 0%", background: `radial-gradient(70% 120% at 100% 0%, ${s.tint}66, transparent 60%), linear-gradient(180deg,#1c1c1f,#141416)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.08), 0 -20px 60px -20px rgba(0,0,0,0.8)" }}
      >
        <span className="mono text-[#e9cf9f]">0{i + 1}</span>
        <div>
          <h3 className="display-m">{s.h}</h3>
          <p className="lede mt-3">{s.p}</p>
        </div>
        <span className="glass grid h-20 w-20 place-items-center rounded-3xl"><s.Icon size={32} weight="light" /></span>
      </motion.div>
    </div>
  );
}

// Three glass cards that stack on top of each other as you scroll.
export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="grid gap-[30vh] pb-[10vh]">
      {STEPS.map((_, i) => <StepCard key={i} i={i} progress={scrollYProgress} />)}
    </div>
  );
}
