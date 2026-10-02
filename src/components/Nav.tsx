"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CaretDown, Heart } from "@phosphor-icons/react";
import { DISCIPLINES, worksByDiscipline } from "@/lib/data";
import { Photo } from "./Photo";
import { useSaved } from "./Providers";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const { saved } = useSaved();
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Pill tightens after the hero, tucks away while reading downward, returns on any upward scroll.
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(v > 40);
    setHidden(v > 600 && v > prev + 2 && !menu && !mobile);
    if (v < prev - 2) setHidden(false);
  });

  useEffect(() => { setMenu(false); setMobile(false); setHidden(false); }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => { if (popRef.current && !popRef.current.contains(e.target as Node)) setMenu(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [menu]);
  useEffect(() => { document.documentElement.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const link = (href: string) => `rounded-full px-3 py-2 transition-colors duration-200 hover:text-ink ${pathname?.startsWith(href) ? "text-ink" : "text-muted"}`;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 z-50 flex justify-center px-3"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
        animate={{ transform: hidden ? "translateY(-140%)" : "translateY(0%)" }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.div
          className="glass-strong flex w-full items-center gap-2 rounded-full pl-4 pr-1.5"
          initial={false}
          style={{ maxWidth: 1400, height: 64 }}
          animate={{ maxWidth: compact ? 980 : 1400, height: compact ? 56 : 64 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Link href="/" className="flex items-center gap-2.5 text-[17px] font-[760] tracking-[-0.02em]" style={{ fontStretch: "125%" }}>
            <span aria-hidden className="relative h-[22px] w-[22px] overflow-hidden rounded-[6px] bg-ink">
              <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: "linear-gradient(180deg,#e9cf9f,#c9a4ff)" }} />
            </span>
            Folio House
          </Link>

          <nav aria-label="Main" className="ml-4 hidden items-center text-[14px] md:flex">
            <div className="relative" ref={popRef}>
              <button type="button" aria-expanded={menu} aria-haspopup="true" onClick={() => setMenu((v) => !v)} className={`flex items-center gap-1 ${link("/disciplines")}`}>
                Disciplines
                <CaretDown size={12} weight="bold" style={{ transform: menu ? "rotate(180deg)" : "none", transition: "transform 200ms var(--ease-out)" }} />
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.96) translateY(-6px)", filter: "blur(6px)" }}
                    animate={{ opacity: 1, transform: "scale(1) translateY(0px)", filter: "blur(0px)" }}
                    exit={{ opacity: 0, transform: "scale(0.98) translateY(-4px)", filter: "blur(4px)", transition: { duration: 0.14 } }}
                    transition={{ duration: 0.24, ease: EASE }}
                    style={{ transformOrigin: "10% 0%" }}
                    className="glass-strong absolute left-[-24px] top-[calc(100%+18px)] grid w-[680px] grid-cols-2 gap-1 rounded-3xl p-2"
                  >
                    {DISCIPLINES.map((d, i) => {
                      const w = worksByDiscipline(d.slug)[0];
                      return (
                        <motion.div key={d.slug} initial={{ opacity: 0, transform: "translateY(4px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ delay: 0.03 + i * 0.02, duration: 0.2, ease: EASE }}>
                          <Link href={`/disciplines/${d.slug}/`} className="group flex items-center gap-3 rounded-2xl p-2 transition-colors duration-150 hover:bg-[rgba(255,255,255,0.06)]">
                            <span className="art-fill block h-14 w-14 flex-none overflow-hidden rounded-xl">
                              <Photo work={w} shape="square" width={160} variant="nav" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] font-semibold text-ink">{d.name}</span>
                              <span className="block text-[12px] text-muted">{worksByDiscipline(d.slug).length} projects</span>
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/work/" className={link("/work")}>Work</Link>
            <Link href="/designers/" className={link("/designers")}>Designers</Link>
            <Link href="/studio/" className={link("/studio")}>Get a site like this</Link>
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Link href="/saved/" aria-label={`Saved work, ${saved.length} items`} className="mono hidden h-11 items-center gap-1.5 rounded-full px-3.5 text-muted transition-colors hover:text-ink sm:flex">
              <Heart size={14} weight={saved.length ? "fill" : "regular"} style={{ color: saved.length ? "var(--accent)" : undefined }} />
              <span className="tnum">{saved.length}</span>
            </Link>
            <Link href="/join/" className="btn btn-primary btn-sm hidden sm:inline-flex">List your work</Link>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full md:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="absolute h-[1.5px] w-[18px] bg-ink transition-transform duration-300" style={{ transform: mobile ? "rotate(45deg)" : "translateY(-4px)", transitionTimingFunction: "var(--ease-out)" }} />
              <span className="absolute h-[1.5px] w-[18px] bg-ink transition-transform duration-300" style={{ transform: mobile ? "rotate(-45deg)" : "translateY(4px)", transitionTimingFunction: "var(--ease-out)" }} />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 40px)", transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto md:hidden"
            style={{ background: "rgba(11,11,12,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            <div className="wrap grid gap-1 pb-10 pt-28">
              <p className="label mb-3">Disciplines</p>
              {DISCIPLINES.map((d, i) => (
                <motion.div key={d.slug} initial={{ opacity: 0, transform: "translateY(16px)", filter: "blur(6px)" }} animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }} transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE }}>
                  <Link href={`/disciplines/${d.slug}/`} className="flex items-baseline justify-between border-b py-3 text-[26px] font-bold tracking-[-0.03em]" style={{ borderColor: "var(--line)", fontStretch: "115%" }}>
                    {d.name}
                    <span className="mono text-muted">{worksByDiscipline(d.slug).length}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div className="mt-8 grid gap-3 text-[17px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                <Link href="/work/">All work</Link>
                <Link href="/designers/">Designers</Link>
                <Link href="/saved/">Saved work ({saved.length})</Link>
                <Link href="/studio/">Get a site like this</Link>
                <Link href="/join/" className="btn btn-accent mt-4">List your work</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
