import Link from "next/link";
import { DISCIPLINES } from "@/lib/data";
import { STUDIO } from "@/lib/studio";

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 overflow-hidden border-t" style={{ borderColor: "var(--line)" }}>
      <div className="wrap grid grid-cols-1 gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="label">Folio House</p>
          <p className="max-w-[36ch] text-[18px] leading-snug">A portfolio home for independent designers, and a place for clients to hire them directly.</p>
          <p className="mono mt-2 text-muted">Designers and projects shown are sample content. Photos: Unsplash. Video: Pexels.</p>
        </div>
        <div>
          <p className="label mb-4">Disciplines</p>
          <ul className="grid grid-cols-2 gap-2 text-[14px] md:grid-cols-1">
            {DISCIPLINES.map((d) => <li key={d.slug}><Link href={`/disciplines/${d.slug}/`} className="ulink text-muted hover:text-ink">{d.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Built by</p>
          <p className="text-[16px] font-semibold">{STUDIO.name}</p>
          <p className="mb-4 text-[14px] text-muted">{STUDIO.role}, {STUDIO.city}</p>
          <div className="grid gap-2 text-[14px]">
            <Link href="/studio/" className="ulink w-fit text-[#e9cf9f]">Get a site like this →</Link>
            <a href={STUDIO.github} target="_blank" rel="noreferrer" className="ulink w-fit text-muted hover:text-ink">GitHub · {STUDIO.githubHandle}</a>
            <span className="mono select-all text-muted">{STUDIO.email}</span>
          </div>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none -mb-[0.18em] select-none whitespace-nowrap text-center text-[12.6vw] font-[780] leading-none tracking-[-0.06em] text-gradient opacity-[0.16]" style={{ fontStretch: "125%" }}>
        Folio House
      </p>
    </footer>
  );
}
