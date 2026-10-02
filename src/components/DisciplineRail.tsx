"use client";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { DISCIPLINES, designersByDiscipline, worksByDiscipline, type Discipline } from "@/lib/data";
import { photoFor, videoFor } from "@/lib/media";
import { BgVideo } from "./BgVideo";
import { Photo } from "./Photo";

function Card({ d, i, eager }: { d: Discipline; i: number; eager?: boolean }) {
  const [hover, setHover] = useState(false);
  const works = worksByDiscipline(d.slug);
  const people = designersByDiscipline(d.slug).length;
  return (
    <Link
      href={`/disciplines/${d.slug}/`}
      data-cursor="Explore"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative block h-full w-full overflow-hidden rounded-[28px] bg-[#141416]"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px -40px rgba(0,0,0,0.9)" }}
    >
      <div className="art-fill absolute inset-0 transition-transform duration-[900ms] group-hover:scale-[1.06]" style={{ transitionTimingFunction: "var(--ease-out)" }}>
        <Photo work={works[0]} shape="tall" width={900} variant={`rail${i}`} priority={eager} />
      </div>
      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: hover ? 1 : 0 }}>
        <BgVideo src={videoFor(d.slug)} poster={photoFor(works[0].id, 900) ?? undefined} playing={hover} />
      </div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.85) 100%), radial-gradient(80% 60% at 50% 110%, ${d.accentDark}33, transparent)` }} />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
        <span className="mono text-[#e7e2d8]">{String(i + 1).padStart(2, "0")} / {String(DISCIPLINES.length).padStart(2, "0")}</span>
        <span className="glass grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45" style={{ transitionTimingFunction: "var(--ease-out)" }}>
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-[clamp(30px,3.4vw,48px)] font-[740] leading-[0.92] tracking-[-0.04em]" style={{ fontStretch: "118%" }}>{d.name}</h3>
        <div className="glass mt-5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
          <span className="text-[14px] text-[#d6d1c7]">{d.tags.slice(0, 3).join(" · ")}</span>
          <span className="mono whitespace-nowrap text-muted">{works.length} works · {people} {people === 1 ? "maker" : "makers"}</span>
        </div>
      </div>
    </Link>
  );
}

// Pinned section: vertical scroll drives the row of disciplines sideways. Below md it becomes a swipeable row.
export function DisciplineRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <section ref={section} className="relative hidden md:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="wrap mb-8 flex items-end justify-between gap-8">
            <div>
              <p className="label mb-3">The trades</p>
              <h2 className="display-l max-w-[14ch]">Eight crafts. One place to hire them.</h2>
            </div>
            <div className="w-[220px]">
              <p className="mono mb-2 text-right text-muted">Scroll to explore</p>
              <div className="h-px w-full bg-[rgba(255,255,255,0.12)]"><motion.div className="h-px bg-[#e9cf9f]" style={{ width: bar }} /></div>
            </div>
          </div>
          <motion.div ref={track} className="flex gap-5 pl-[var(--gutter)] pr-[var(--gutter)]" style={{ x }}>
            {DISCIPLINES.map((d, i) => (
              <div key={d.slug} className="h-[min(64vh,620px)] w-[min(40vw,480px)] flex-none">
                <Card d={d} i={i} eager={i < 3} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: swipeable row */}
      <section className="md:hidden">
        <div className="wrap mb-6">
          <p className="label mb-3">The trades</p>
          <h2 className="display-l">Eight crafts. One place to hire them.</h2>
        </div>
        <div className="noscroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2">
          {DISCIPLINES.map((d, i) => (
            <div key={d.slug} className="h-[460px] w-[78vw] flex-none snap-center">
              <Card d={d} i={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
