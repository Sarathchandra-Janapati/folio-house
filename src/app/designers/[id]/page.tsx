import type { Metadata } from "next";
import Link from "next/link";
import { DESIGNERS, designersByDiscipline, getDesigner, getDiscipline, worksByDesigner } from "@/lib/data";
import { Avatar } from "@/components/Avatar";
import { BriefForm } from "@/components/BriefForm";
import { WorkCard } from "@/components/WorkCard";
import { DesignerCard } from "@/components/DesignerCard";

export function generateStaticParams() {
  return DESIGNERS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const d = getDesigner(id);
  return { title: d.name, description: d.bio };
}

export default async function DesignerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = getDesigner(id);
  const disc = getDiscipline(d.discipline);
  const works = worksByDesigner(d.id);
  const peers = designersByDiscipline(disc.slug).filter((x) => x.id !== d.id);

  return (
    <div className="disc-accent relative" style={{ ["--accent-l" as string]: disc.accent, ["--accent-d" as string]: disc.accentDark }}>
      <div className="wrap pt-[clamp(20px,4vw,40px)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]" style={{ background: `radial-gradient(60% 60% at 30% 0%, ${disc.accent}40, transparent 70%)` }} />
        <nav aria-label="Breadcrumb" className="mono mb-8 flex flex-wrap items-center gap-2 text-muted">
          <Link href="/" className="ulink hover:text-ink">Folio House</Link>
          <span>/</span>
          <Link href="/designers/" className="ulink hover:text-ink">Designers</Link>
          <span>/</span>
          <span className="text-ink">{d.name}</span>
        </nav>

        <header className="relative grid grid-cols-1 gap-8 border-b pb-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end" style={{ borderColor: "var(--line)" }}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar name={d.name} color={d.color} size={96} />
            <div>
              <Link href={`/disciplines/${disc.slug}/`} className="label ulink" style={{ color: "var(--accent)" }}>{disc.name}</Link>
              <h1 className="display-l mt-2">{d.name}</h1>
              <p className="muted mt-2 text-[17px]">{d.role} · {d.city}, {d.country}</p>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-4">
            <div><dt className="label">Rate</dt><dd className="mt-1 font-semibold">{d.rate}</dd></div>
            <div><dt className="label">Reply</dt><dd className="mt-1 font-semibold">{d.reply.replace("Replies ", "")}</dd></div>
            <div><dt className="label">Status</dt><dd className="mt-1 flex items-center gap-1.5 font-semibold"><span className="h-2 w-2 rounded-full" style={{ background: d.open ? "#3f9b5a" : "var(--muted)" }} />{d.open ? "Taking work" : "Booked"}</dd></div>
          </dl>
        </header>

        <div className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] pt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="max-w-[60ch] text-[18px] leading-relaxed">{d.bio}</p>
            <p className="mono muted mt-3">Independent since {d.since}</p>
            <h2 className="display-s mb-6 mt-10">Work · {works.length}</h2>
            <div className="columns-1 gap-5 sm:columns-2">
              {works.map((w) => <WorkCard key={w.id} work={w} showDiscipline={false} />)}
            </div>
          </div>
          <aside id="brief" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <div className="glass-strong rounded-[26px] p-[clamp(18px,3vw,28px)]">
              {d.open ? (
                <BriefForm designerName={d.name} prompts={disc.briefPrompts} />
              ) : (
                <div className="grid gap-3">
                  <p className="label">Booked</p>
                  <p className="display-s">{d.name.split(" ")[0]} is not taking new briefs right now.</p>
                  <p className="muted">Save their work to come back later, or brief another {disc.short.toLowerCase()} designer below.</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {peers.length > 0 && (
          <section className="pt-[clamp(48px,7vw,96px)]">
            <h2 className="display-m mb-7">More {disc.short.toLowerCase()} designers</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {peers.map((p) => <DesignerCard key={p.id} d={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
