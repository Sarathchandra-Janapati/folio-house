"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { DISCIPLINES, designersByDiscipline, worksByDiscipline } from "@/lib/data";
import { Art } from "./Art";

// The eight disciplines as a big type index. On desktop a preview of the trade's work
// trails the cursor on a spring (decorative, so springs are fine here). On touch, rows show thumbnails.
export function DisciplineIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <div
      ref={ref}
      className="relative"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="border-t" style={{ borderColor: "var(--line)" }}>
        {DISCIPLINES.map((d, i) => {
          const works = worksByDiscipline(d.slug);
          const people = designersByDiscipline(d.slug).length;
          return (
            <li key={d.slug} className="border-b" style={{ borderColor: "var(--line)" }}>
              <Link
                href={`/disciplines/${d.slug}/`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 md:grid-cols-[3rem_minmax(0,1fr)_14rem_2rem] md:py-5"
              >
                <span className="art-fill block h-14 w-14 overflow-hidden rounded-lg md:hidden">
                  <Art work={works[0]} shape="square" variant="idx-m" className="h-full w-full" />
                </span>
                <span className="mono hidden text-muted md:block">{works.length.toString().padStart(2, "0")}</span>
                <span
                  className="text-[22px] font-[700] leading-none tracking-[-0.035em] transition-[color,transform] duration-300 sm:text-[34px] md:text-[52px] md:group-hover:translate-x-2"
                  style={{ fontStretch: "116%", transitionTimingFunction: "var(--ease-out)", color: active === i ? d.accent : undefined }}
                >
                  {d.name}
                </span>
                <span className="hidden text-[14px] text-muted md:block">
                  {people} designer{people === 1 ? "" : "s"} · {d.tags.slice(0, 2).join(", ")}
                </span>
                <ArrowUpRight size={22} className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence mode="popLayout">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, transform: "translate(-50%,-50%) scale(0.92) rotate(-3deg)", filter: "blur(4px)" }}
              animate={{ opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(-3deg)", filter: "blur(0px)" }}
              exit={{ opacity: 0, transform: "translate(-50%,-50%) scale(0.96) rotate(-3deg)", filter: "blur(4px)", transition: { duration: 0.14 } }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="art-fill absolute h-[210px] w-[170px] overflow-hidden rounded-xl"
              style={{ boxShadow: "var(--shadow)", left: 120 }}
            >
              <Art work={worksByDiscipline(DISCIPLINES[active].slug)[0]} shape="tall" variant="idx" className="h-full w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
