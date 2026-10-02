import { DISCIPLINES } from "@/lib/data";

// Oversized trade names drifting in two directions: one filled, one outlined.
export function BigMarquee() {
  const names = DISCIPLINES.map((d) => d.short);
  const row = (outline: boolean, k: string) => (
    <div className="flex shrink-0 items-center">
      {names.map((n) => (
        <span key={`${k}-${n}`} className={`flex items-center gap-[0.4em] px-[0.25em] text-[clamp(56px,10vw,160px)] font-[760] leading-none tracking-[-0.05em] ${outline ? "outline-text" : ""}`} style={{ fontStretch: outline ? "62%" : "125%" }}>
          {n}
          <span className="inline-block h-[0.18em] w-[0.18em] rounded-full" style={{ background: "linear-gradient(135deg,#e9cf9f,#c9a4ff)" }} />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee select-none overflow-hidden py-6" aria-hidden>
      <div className="marquee-track">{row(false, "a")}{row(false, "b")}</div>
      <div className="marquee-track reverse mt-2">{row(true, "c")}{row(true, "d")}</div>
    </div>
  );
}
