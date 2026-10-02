"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DISCIPLINES, DESIGNERS } from "@/lib/data";
import { videoFor } from "@/lib/media";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
import { BgVideo } from "./BgVideo";
import { HeroFan } from "./HeroFan";
import { HeroSearch } from "./HeroSearch";
import { SplitWords } from "./SplitWords";

// Full-bleed film of hands at work. As you scroll, the frame lifts into a rounded card and the copy drifts up.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative -mt-[96px]">
      <motion.div className="relative min-h-[max(720px,100svh)] overflow-hidden" style={{ scale, borderRadius: radius, transformOrigin: "50% 0%" }}>
        {/* fallback glow if media can't load */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 70% 30%, rgba(180,70,47,0.55), transparent 60%), radial-gradient(50% 60% at 20% 80%, rgba(46,74,107,0.6), transparent 60%), radial-gradient(40% 50% at 85% 85%, rgba(201,164,255,0.35), transparent 60%), #0e0d0f" }} />
        <motion.div className="absolute inset-0" style={{ y: videoY }}>
          {/* Hero still generated with Runway; the video plays over it once loaded */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/media/hero-workbench.jpg`} alt="" className="media-cover scale-[1.08]" />
          <BgVideo src={videoFor("hero")} poster={`${BASE}/media/hero-workbench.jpg`} className="scale-[1.08] opacity-80" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.1) 35%, rgba(11,11,12,0.35) 65%, rgba(11,11,12,0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 50%, rgba(0,0,0,0.6))" }} />

        <motion.div className="wrap relative grid min-h-[max(720px,100svh)] grid-cols-1 items-end gap-10 pb-[clamp(40px,7vh,88px)] pt-36 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]" style={{ y: copyY, opacity: copyOpacity }}>
          <div>
            <motion.p className="label mb-6 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9dc79a] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9dc79a]" /></span>
              {DESIGNERS.filter((d) => d.open).length} designers taking commissions
            </motion.p>
            <h1 className="display-xxl">
              <SplitWords text="Hire the hands behind the work." accentFrom={5} delay={0.15} />
            </h1>
            <motion.p className="lede mt-7 text-[#d6d1c7]" initial={{ opacity: 0, transform: "translateY(10px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
              Garments, rings, rooms, chairs and buildings by independent designers. Find the piece you love, then brief the person who made it.
            </motion.p>
            <motion.div className="mt-8" initial={{ opacity: 0, transform: "translateY(12px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ delay: 0.85, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
              <HeroSearch />
            </motion.div>
            <motion.div className="mt-5 flex flex-wrap gap-2" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.04, delayChildren: 1 } } }}>
              {DISCIPLINES.map((d) => (
                <motion.span key={d.slug} variants={{ h: { opacity: 0, transform: "translateY(8px)" }, s: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } } }}>
                  <Link href={`/disciplines/${d.slug}/`} className="chip">{d.short}</Link>
                </motion.span>
              ))}
            </motion.div>
          </div>
          <motion.div className="hidden lg:block" initial={{ opacity: 0, transform: "translateY(40px) scale(0.96)" }} animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }} transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}>
            <HeroFan />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-6 right-[var(--gutter)] hidden items-center gap-3 md:flex">
          <span className="label">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-[rgba(255,255,255,0.15)]">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_cubic-bezier(.77,0,.175,1)_infinite] bg-[#f3f0ea]" />
          </span>
        </div>
      </motion.div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
