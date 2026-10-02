import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, MapPin } from "@phosphor-icons/react/ssr";
import { WORKS, disciplineOfWork, getDesigner, getWork, worksByDesigner, worksByDiscipline } from "@/lib/data";
import { MediaToggle } from "@/components/MediaToggle";
import { Avatar } from "@/components/Avatar";
import { BriefForm } from "@/components/BriefForm";
import { SaveButton } from "@/components/SaveButton";
import { WorkCard } from "@/components/WorkCard";

export function generateStaticParams() {
  return WORKS.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = getWork(id);
  return { title: w.title, description: w.about };
}

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = getWork(id);
  const d = getDesigner(w.designer);
  const disc = disciplineOfWork(w);
  const siblings = worksByDiscipline(disc.slug);
  const i = siblings.findIndex((x) => x.id === w.id);
  const next = siblings[(i + 1) % siblings.length];
  const more = worksByDesigner(d.id).filter((x) => x.id !== w.id);
  const related = siblings.filter((x) => x.id !== w.id && x.designer !== d.id).slice(0, 3);

  return (
    <div className="disc-accent relative" style={{ ["--accent-l" as string]: disc.accent, ["--accent-d" as string]: disc.accentDark }}>
      <div className="wrap pt-[clamp(20px,4vw,40px)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]" style={{ background: `radial-gradient(60% 60% at 70% 0%, ${disc.accent}40, transparent 70%)` }} />
        <nav aria-label="Breadcrumb" className="mono mb-6 flex flex-wrap items-center gap-2 text-muted">
          <Link href="/" className="ulink hover:text-ink">Folio House</Link>
          <span>/</span>
          <Link href={`/disciplines/${disc.slug}/`} className="ulink hover:text-ink">{disc.name}</Link>
          <span>/</span>
          <span className="text-ink">{w.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <MediaToggle work={w} />
          </div>

          <div className="grid content-start gap-7">
            <div>
              <p className="label" style={{ color: "var(--accent)" }}>{disc.name} · {w.year}</p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h1 className="display-l">{w.title}</h1>
                <SaveButton id={w.id} title={w.title} boxed />
              </div>
              <p className="lede mt-4">{w.about}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {w.tags.map((t) => <span key={t} className="mono rounded-full px-2.5 py-1" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>{t}</span>)}
              </div>
            </div>

            <dl className="specs">
              {w.specs.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>

            <Link href={`/designers/${d.id}/`} className="glass group flex items-center gap-4 rounded-[22px] p-4 transition-transform duration-150 active:scale-[0.98]" data-cursor="Profile">
              <Avatar name={d.name} color={d.color} size={52} />
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-semibold leading-tight" style={{ fontStretch: "110%" }}>{d.name}</p>
                <p className="text-[14px] text-muted">{d.role}</p>
                <p className="mono mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="flex items-center gap-1"><MapPin size={12} />{d.city}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{d.reply}</span>
                  <span>{d.rate}</span>
                </p>
              </div>
              <ArrowRight size={18} className="text-muted transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <div id="brief" className="glass-strong rounded-[26px] p-[clamp(18px,3vw,28px)]">
              <BriefForm designerName={d.name} prompts={disc.briefPrompts} workTitle={w.title} />
            </div>

            <Link href={`/work/${next.id}/`} className="group flex items-center justify-between gap-4 border-t pt-5" style={{ borderColor: "var(--line)" }}>
              <span>
                <span className="label">Next in {disc.short}</span>
                <span className="display-s mt-1 block">{next.title}</span>
              </span>
              <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {more.length > 0 && (
          <section className="pt-[clamp(56px,8vw,104px)]">
            <h2 className="display-m mb-7">More from {d.name.split(" ")[0]}</h2>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {more.map((x) => <WorkCard key={x.id} work={x} showDiscipline={false} />)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="pt-[clamp(40px,6vw,80px)]">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-m">Other {disc.short.toLowerCase()} designers</h2>
              <Link href={`/disciplines/${disc.slug}/`} className="btn btn-ghost btn-sm"><ArrowLeft size={14} /> Back to {disc.short}</Link>
            </div>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {related.map((x) => <WorkCard key={x.id} work={x} showDiscipline={false} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
