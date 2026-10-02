import type { Metadata } from "next";
import Link from "next/link";
import { DISCIPLINES, DESIGNERS, designersByDiscipline } from "@/lib/data";
import { DesignerCard } from "@/components/DesignerCard";

export const metadata: Metadata = { title: "Designers" };

export default function DesignersPage() {
  return (
    <div className="wrap pt-[clamp(28px,5vw,64px)]">
      <p className="label">{DESIGNERS.length} designers · {DESIGNERS.filter((d) => d.open).length} taking work</p>
      <h1 className="display-l mt-4 max-w-[18ch]">The people behind the work.</h1>
      <div className="mt-[clamp(32px,5vw,64px)] grid gap-14">
        {DISCIPLINES.map((disc) => (
          <section key={disc.slug} className="disc-accent" style={{ ["--accent-l" as string]: disc.accent, ["--accent-d" as string]: disc.accentDark }}>
            <div className="mb-5 flex items-baseline justify-between gap-4 border-t pt-5" style={{ borderColor: "var(--line)" }}>
              <h2 className="display-s">{disc.name}</h2>
              <Link href={`/disciplines/${disc.slug}/`} className="mono ulink" style={{ color: "var(--accent)" }}>View discipline</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {designersByDiscipline(disc.slug).map((d) => <DesignerCard key={d.id} d={d} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
