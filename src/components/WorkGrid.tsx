"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { DISCIPLINES, WORKS, disciplineOfWork, getDesigner, getWork } from "@/lib/data";
import { WorkCard } from "./WorkCard";

type Props = {
  workIds?: string[];
  filterBy: "discipline" | "tag";
  tags?: string[];
  showSearch?: boolean;
  initialQuery?: string;
  initialFilter?: string;
  showDiscipline?: boolean;
};

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function WorkGrid({ workIds, filterBy, tags = [], showSearch = false, initialQuery = "", initialFilter = "All", showDiscipline = true }: Props) {
  const works = useMemo(() => (workIds ? workIds.map(getWork) : WORKS), [workIds]);
  const [filter, setFilter] = useState(initialFilter);
  const [q, setQ] = useState(initialQuery);
  const [round, setRound] = useState(0);

  useEffect(() => setQ(initialQuery), [initialQuery]);
  useEffect(() => setFilter(initialFilter), [initialFilter]);

  const options = useMemo(() => {
    const base = filterBy === "discipline" ? DISCIPLINES.map((d) => ({ key: d.slug, label: d.short })) : tags.map((t) => ({ key: t, label: t }));
    const count = (k: string) =>
      works.filter((w) => (filterBy === "discipline" ? disciplineOfWork(w).slug === k : w.tags.includes(k))).length;
    return [{ key: "All", label: "All", n: works.length }, ...base.map((o) => ({ ...o, n: count(o.key) })).filter((o) => o.n > 0)];
  }, [filterBy, tags, works]);

  const shown = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return works.filter((w) => {
      if (filter !== "All") {
        if (filterBy === "discipline" && disciplineOfWork(w).slug !== filter) return false;
        if (filterBy === "tag" && !w.tags.includes(filter)) return false;
      }
      if (!terms.length) return true;
      const d = getDesigner(w.designer);
      const hay = [w.title, w.spec, w.about, w.tags.join(" "), d.name, d.city, d.country, d.role, disciplineOfWork(w).name].join(" ").toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [works, filter, filterBy, q]);

  /* clip-path tabs */
  const tabsRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState("inset(4px 100% 4px 0 round 999px)");
  const placeClip = () => {
    const root = tabsRef.current;
    if (!root) return;
    const btn = root.querySelector<HTMLButtonElement>(`.tab-list:not(.active-copy) [data-k="${CSS.escape(filter)}"]`);
    if (!btn) return;
    const W = root.offsetWidth, l = btn.offsetLeft, r = W - (l + btn.offsetWidth);
    setClip(`inset(4px ${r.toFixed(1)}px 4px ${l.toFixed(1)}px round 999px)`);
  };
  useIso(placeClip, [filter, options]);
  useEffect(() => {
    window.addEventListener("resize", placeClip);
    document.fonts?.ready.then(placeClip);
    return () => window.removeEventListener("resize", placeClip);
  });

  const pick = (k: string) => {
    setFilter(k);
    setRound((r) => r + 1);
  };

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center gap-3">
        <div className="noscroll -m-0.5 max-w-full overflow-x-auto p-0.5">
          <div className="tabs glass" ref={tabsRef}>
            <ul className="tab-list" role="tablist" aria-label="Filter work">
              {options.map((o) => (
                <li key={o.key}>
                  <button role="tab" aria-selected={filter === o.key} data-k={o.key} onClick={() => pick(o.key)}>
                    {o.label}
                    <span>{o.n}</span>
                  </button>
                </li>
              ))}
            </ul>
            <ul className="tab-list active-copy" aria-hidden="true" style={{ clipPath: clip }}>
              {options.map((o) => (
                <li key={o.key}>
                  <button tabIndex={-1}>
                    {o.label}
                    <span>{o.n}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showSearch && (
          <label className="relative ml-auto flex w-full items-center sm:w-[300px]">
            <MagnifyingGlass size={16} className="pointer-events-none absolute left-4 text-muted" />
            <input
              id="work-search"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setRound((r) => r + 1);
              }}
              placeholder="Search work, designers, cities"
              aria-label="Search work"
              className="glass w-full rounded-full py-[12px] pl-10 pr-10 text-[15px] text-ink outline-none placeholder:text-[#8d887f]"
            />
            {q && (
              <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="absolute right-3 grid h-6 w-6 place-items-center rounded-full text-muted active:scale-90">
                <X size={14} />
              </button>
            )}
          </label>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="py-16">
          <p className="display-s">Nothing matches that yet.</p>
          <p className="muted mt-1">Try another filter or a shorter search.</p>
        </div>
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {shown.map((w, i) => (
            <motion.div
              key={`${w.id}-${round}`}
              initial={round === 0 ? false : { opacity: 0, transform: "translateY(10px)", filter: "blur(3px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.04, ease: [0.23, 1, 0.32, 1] }}
            >
              <WorkCard work={w} showDiscipline={showDiscipline} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
