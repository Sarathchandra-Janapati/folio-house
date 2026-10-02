"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getDesigner, getWork } from "@/lib/data";
import { Photo } from "./Photo";

const IDS = ["monsoon-bridal-capsule", "solitaire-in-recycled-gold", "banjara-hills-living"];
const POS = ["translate(0,0) rotate(0deg)", "translate(14%,-6%) rotate(7deg) scale(.92)", "translate(-14%,-7%) rotate(-8deg) scale(.88)"];
const SPREAD = ["translate(0,-2%) rotate(0deg)", "translate(30%,-4%) rotate(12deg) scale(.92)", "translate(-30%,-5%) rotate(-13deg) scale(.88)"];

// A stack of featured work that deals itself every few seconds. CSS transitions so a hover mid-move retargets.
export function HeroFan() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState([0, 1, 2]);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (reduce || hover) return;
    const t = setInterval(() => { if (!document.hidden) setOrder((o) => o.map((p) => (p + 2) % 3)); }, 3400);
    return () => clearInterval(t);
  }, [reduce, hover]);

  return (
    <div className="relative mx-auto aspect-[4/4.6] w-full max-w-[420px]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label="Featured work">
      {IDS.map((id, i) => {
        const w = getWork(id);
        const d = getDesigner(w.designer);
        const pos = order[i];
        return (
          <Link
            key={id}
            href={`/work/${id}/`}
            data-cursor="View"
            tabIndex={pos === 0 ? 0 : -1}
            className="art-fill absolute overflow-hidden rounded-[22px] bg-[#18181b]"
            style={{
              inset: "4% 10% 8% 10%",
              zIndex: 3 - pos,
              transform: (hover ? SPREAD : POS)[pos],
              transformOrigin: "50% 100%",
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.12)",
              transition: "transform 650ms var(--ease-out), filter 400ms ease",
              filter: pos === 0 ? "none" : "brightness(0.7)",
            }}
          >
            <Photo work={w} shape="tall" width={700} variant="fan" priority={pos === 0} />
            <span className="glass absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 rounded-2xl px-3.5 py-3" style={{ opacity: pos === 0 ? 1 : 0, transition: "opacity 250ms ease" }}>
              <span className="min-w-0">
                <strong className="block text-[14px] leading-tight" style={{ fontStretch: "110%" }}>{w.title}</strong>
                <span className="text-[12px] text-muted">{d.name} · {d.city}</span>
              </span>
              <span className="mono text-muted">{w.year}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
