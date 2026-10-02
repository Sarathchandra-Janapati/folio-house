import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { DISCIPLINES, designersByDiscipline, getDiscipline, worksByDiscipline } from "@/lib/data";
import { photoFor, videoFor } from "@/lib/media";
import { BgVideo } from "@/components/BgVideo";
import { Photo } from "@/components/Photo";
import { WorkGrid } from "@/components/WorkGrid";
import { DesignerCard } from "@/components/DesignerCard";
import { Reveal } from "@/components/Reveal";
import { StudioBand } from "@/components/StudioBand";
import { SplitWords } from "@/components/SplitWords";
import { Counter } from "@/components/Counter";
import { Magnetic } from "@/components/Magnetic";

export function generateStaticParams() {
  return DISCIPLINES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDiscipline(slug);
  return { title: d.name, description: d.blurb };
}

export default async function DisciplinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  const idx = DISCIPLINES.findIndex((x) => x.slug === slug);
  const next = DISCIPLINES[(idx + 1) % DISCIPLINES.length];
  const prev = DISCIPLINES[(idx - 1 + DISCIPLINES.length) % DISCIPLINES.length];
  const works = worksByDiscipline(slug);
  const people = designersByDiscipline(slug);

  return (
    <div className="disc-accent" style={{ ["--accent-l" as string]: d.accent, ["--accent-d" as string]: d.accentDark }}>
      {/* Film hero */}
      <section className="relative -mt-[96px] overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(70% 80% at 75% 30%, ${d.accent}AA, transparent 65%), radial-gradient(60% 70% at 10% 90%, ${d.accentDark}44, transparent 60%), #0e0d0f` }} />
        <div className="art-fill absolute inset-0 opacity-60">
          <Photo work={works[0]} shape="wide" width={1800} variant="dhero" priority />
        </div>
        <BgVideo src={videoFor(d.slug)} poster={photoFor(works[0].id, 1600) ?? undefined} className="opacity-75" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,11,12,0.6) 0%, rgba(11,11,12,0.15) 40%, rgba(11,11,12,0.92) 100%)" }} />
        <div className="wrap relative flex min-h-[min(88svh,860px)] flex-col justify-end pb-14 pt-36">
          <nav aria-label="Breadcrumb" className="mono mb-auto flex items-center gap-2 text-[#cfcabf]">
            <Link href="/" className="ulink">Folio House</Link><span>/</span><span className="text-ink">{d.name}</span>
          </nav>
          <p className="label mb-5" style={{ color: d.accentDark }}>{String(idx + 1).padStart(2, "0")} · {d.name}</p>
          <h1 className="display-xl max-w-[16ch]"><SplitWords text={d.headline} delay={0.1} /></h1>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="lede text-[#d6d1c7]">{d.blurb}</p>
            <dl className="glass grid grid-cols-3 gap-6 rounded-3xl px-6 py-5">
              <div><dt className="label">Works</dt><dd className="mt-1 text-[34px] font-bold leading-none" style={{ fontStretch: "118%" }}><Counter to={works.length} /></dd></div>
              <div><dt className="label">Makers</dt><dd className="mt-1 text-[34px] font-bold leading-none" style={{ fontStretch: "118%" }}><Counter to={people.length} /></dd></div>
              <div><dt className="label">Unit</dt><dd className="mt-1 text-[34px] font-bold leading-none" style={{ fontStretch: "118%" }}>{d.unit}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap pt-[clamp(56px,8vw,112px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label mb-3">Portfolio</p>
            <h2 className="display-l">{d.short} work</h2>
          </div>
          <p className="muted max-w-[40ch]">Filter by what the project is. Open any piece for its specs, its drawing and a brief form.</p>
        </div>
        <WorkGrid workIds={works.map((w) => w.id)} filterBy="tag" tags={d.tags} showDiscipline={false} />
      </section>

      <section className="wrap pt-[clamp(56px,8vw,112px)]">
        <p className="label mb-3">The makers</p>
        <h2 className="display-l mb-10">{d.short} designers</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => <Reveal key={p.id} delay={i * 0.06}><DesignerCard d={p} /></Reveal>)}
        </div>
      </section>

      <section className="wrap pt-[clamp(56px,8vw,112px)]">
        <Reveal>
          <div className="iris relative overflow-hidden rounded-[32px] p-[clamp(24px,5vw,64px)]" style={{ background: `radial-gradient(80% 120% at 0% 0%, ${d.accent}55, transparent 60%), #121214` }}>
            <p className="label" style={{ color: d.accentDark }}>What people commission here</p>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {d.briefPrompts.map((p) => <li key={p} className="display-s text-[clamp(22px,2.4vw,32px)]">“{p}”</li>)}
            </ul>
            <Magnetic className="mt-10">
              <Link href={`/designers/${people[0].id}/#brief`} className="btn btn-accent" data-cursor="">Start a brief <ArrowRight size={16} className="arrow" /></Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      <nav aria-label="More disciplines" className="wrap grid grid-cols-1 gap-4 pt-[clamp(56px,8vw,112px)] sm:grid-cols-2">
        {[prev, next].map((x, k) => {
          const w = worksByDiscipline(x.slug)[0];
          return (
            <Link key={x.slug} href={`/disciplines/${x.slug}/`} data-cursor={k === 0 ? "Prev" : "Next"} className="group relative block h-[260px] overflow-hidden rounded-[28px] bg-[#141416]">
              <div className="art-fill absolute inset-0 opacity-60 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-80"><Photo work={w} shape="wide" width={900} variant={`pn${k}`} /></div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.85))" }} />
              <div className={`absolute inset-x-0 bottom-0 p-6 ${k === 1 ? "text-right" : ""}`}>
                <span className={`label flex items-center gap-2 ${k === 1 ? "justify-end" : ""}`}>{k === 0 ? <><ArrowLeft size={12} /> Previous</> : <>Next <ArrowRight size={12} /></>}</span>
                <span className="display-m mt-2 block">{x.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="pt-[clamp(80px,10vw,140px)]"><StudioBand /></div>
    </div>
  );
}
