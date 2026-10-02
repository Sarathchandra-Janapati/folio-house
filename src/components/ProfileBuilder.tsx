"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { DISCIPLINES, worksByDiscipline } from "@/lib/data";
import { Photo } from "./Photo";
import { Avatar } from "./Avatar";
import { MorphButton, type MorphState } from "./MorphButton";

function inr(v: string) {
  const n = v.replace(/[^0-9]/g, "");
  if (!n) return "Rate on request";
  const last3 = n.slice(-3);
  let rest = n.slice(0, -3);
  if (rest) rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `From ₹${rest ? rest + "," : ""}${last3}`;
}

export function ProfileBuilder() {
  const [name, setName] = useState("Ananya Rao");
  const [city, setCity] = useState("Bengaluru");
  const [slug, setSlug] = useState("interior-design");
  const [rate, setRate] = useState("40000");
  const [state, setState] = useState<MorphState>("idle");
  const disc = DISCIPLINES.find((d) => d.slug === slug)!;
  const samples = useMemo(() => {
    const w = worksByDiscipline(slug);
    return [w[0], w[1] ?? w[0], w[2] ?? w[0]];
  }, [slug]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <form
        className="glass-strong grid gap-4 rounded-[28px] p-[clamp(18px,3vw,32px)]"
        onSubmit={(e) => {
          e.preventDefault();
          setState("busy");
          setTimeout(() => {
            setState("done");
            toast.success("Your folio preview is ready", { description: "Demo mode: sign-up opens when accounts are connected, so this profile was not saved." });
            setTimeout(() => setState("idle"), 2200);
          }, 700);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="field"><label htmlFor="j-name">Your name</label><input id="j-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></div>
          <div className="field"><label htmlFor="j-city">City</label><input id="j-city" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div className="field">
            <label htmlFor="j-disc">Discipline</label>
            <select id="j-disc" value={slug} onChange={(e) => setSlug(e.target.value)}>
              {DISCIPLINES.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="j-rate">Starting rate (₹)</label><input id="j-rate" inputMode="numeric" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
          <div className="field sm:col-span-2"><label htmlFor="j-bio">One line about your work</label><textarea id="j-bio" defaultValue="I design calm, warm homes with lime plaster and furniture made on site." /></div>
        </div>
        <MorphButton state={state} idle="Claim your folio" busy="Building" done="Preview ready" className="btn btn-accent w-fit" />
      </form>

      <div className="lg:sticky lg:top-24">
        <p className="label mb-3">Live preview</p>
        <div className="disc-accent iris glass rounded-[28px] p-5" style={{ ["--accent-l" as string]: disc.accent, ["--accent-d" as string]: disc.accentDark }}>
          <div className="flex items-center gap-4">
            <Avatar name={name || "Your name"} color={disc.accent} size={60} />
            <div className="min-w-0">
              <p className="label" style={{ color: "var(--accent)" }}>{disc.name}</p>
              <p className="truncate text-[22px] font-bold leading-tight tracking-[-0.02em]" style={{ fontStretch: "112%" }}>{name || "Your name"}</p>
              <p className="mono text-muted">{city || "Your city"} · {inr(rate)}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {samples.map((w, i) => (
                <motion.span
                  key={`${slug}-${i}`}
                  initial={{ opacity: 0, transform: "scale(0.95)", filter: "blur(4px)" }}
                  animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.12 } }}
                  transition={{ duration: 0.26, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  className="art-fill block aspect-square overflow-hidden rounded-lg"
                >
                  <Photo work={w} shape="square" width={400} variant={`pb${i}`} />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <p className="mono mt-4 text-muted">Sample work shown until you upload your own.</p>
        </div>
      </div>
    </div>
  );
}
