import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { DESIGNERS, DISCIPLINES, WORKS } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { DisciplineRail } from "@/components/DisciplineRail";
import { WorkGrid } from "@/components/WorkGrid";
import { DesignerCard } from "@/components/DesignerCard";
import { Steps } from "@/components/Steps";
import { StudioBand } from "@/components/StudioBand";
import { BigMarquee } from "@/components/BigMarquee";
import { ScrollWords } from "@/components/ScrollWords";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

const FEATURED = [
  "monsoon-bridal-capsule", "solitaire-in-recycled-gold", "casa-do-patio",
  "ash-lounge-chair", "sunset-court-custom", "indigo-aso-oke-runner",
  "cafe-jacaranda", "ash-glaze-vessels", "paper-pendant",
];

export default function Home() {
  const cities = new Set(DESIGNERS.map((d) => d.city)).size;
  return (
    <>
      <Hero />

      {/* Manifesto */}
      <section className="wrap py-[clamp(80px,14vw,200px)]">
        <p className="label mb-8">Why Folio House</p>
        <ScrollWords
          className="display-l max-w-[22ch]"
          text="Every chair, ring and courtyard was drawn by someone. We show you the work first, then introduce you to the hands behind it."
        />
        <dl className="mt-16 grid grid-cols-2 gap-6 border-t pt-8 md:grid-cols-4" style={{ borderColor: "var(--line)" }}>
          {[
            ["Disciplines", DISCIPLINES.length],
            ["Designers", DESIGNERS.length],
            ["Projects", WORKS.length],
            ["Cities", cities],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="label">{k}</dt>
              <dd className="mt-2 text-[clamp(44px,6vw,88px)] font-[740] leading-none tracking-[-0.05em]" style={{ fontStretch: "120%" }}>
                <Counter to={v as number} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <DisciplineRail />

      <BigMarquee />

      {/* Featured work */}
      <section className="wrap pt-[clamp(64px,9vw,128px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-3">Recent work</p>
            <h2 className="display-l">Fresh off the bench.</h2>
          </div>
          <Magnetic>
            <Link href="/work/" className="btn btn-ghost" data-cursor="">
              All {WORKS.length} projects <ArrowRight size={14} className="arrow" />
            </Link>
          </Magnetic>
        </div>
        <WorkGrid workIds={FEATURED} filterBy="discipline" />
      </section>

      {/* How it works */}
      <section id="how" className="wrap scroll-mt-24 pt-[clamp(80px,10vw,140px)]">
        <div className="mb-10">
          <p className="label mb-3">How hiring works</p>
          <h2 className="display-l max-w-[14ch]">From brief to commission.</h2>
        </div>
        <Steps />
      </section>

      {/* Designers */}
      <section className="pt-[clamp(64px,9vw,128px)]">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-3">The makers</p>
            <h2 className="display-l">Taking commissions now.</h2>
          </div>
          <Link href="/designers/" className="btn btn-ghost" data-cursor="">All designers <ArrowRight size={14} className="arrow" /></Link>
        </div>
        <div className="wrap">
          <div className="noscroll -mx-[var(--gutter)] grid snap-x snap-mandatory auto-cols-[minmax(270px,1fr)] grid-flow-col gap-4 overflow-x-auto px-[var(--gutter)] pb-2 lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:px-0">
            {DESIGNERS.filter((d) => d.open).slice(0, 8).map((d, i) => (
              <Reveal key={d.id} delay={(i % 4) * 0.06} className="snap-start">
                <DesignerCard d={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* For designers */}
      <section className="wrap pt-[clamp(80px,10vw,140px)]">
        <Reveal>
          <div className="glass grid grid-cols-1 gap-8 rounded-[32px] p-[clamp(24px,5vw,64px)] md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="label">For designers</p>
              <h2 className="display-l mt-4">Your folio, live in five minutes.</h2>
            </div>
            <div className="grid gap-6">
              <p className="lede">Free to list. Upload finished work, set a starting rate and receive briefs from people who already like what you make. An 8% fee applies only to commissions won here.</p>
              <Magnetic>
                <Link href="/join/" className="btn btn-primary" data-cursor="">Build your profile <ArrowRight size={16} className="arrow" /></Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="pt-[clamp(80px,10vw,140px)]">
        <StudioBand />
      </div>
    </>
  );
}
