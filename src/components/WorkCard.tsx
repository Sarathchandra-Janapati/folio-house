import Link from "next/link";
import { disciplineOfWork, getDesigner, type Work } from "@/lib/data";
import { Photo } from "./Photo";
import { SaveButton } from "./SaveButton";
import { Tilt } from "./Tilt";

const RATIO = { tall: "4 / 5.2", square: "1 / 1", wide: "4 / 2.9" } as const;

export function WorkCard({ work, showDiscipline = true }: { work: Work; showDiscipline?: boolean }) {
  const d = getDesigner(work.designer);
  const disc = disciplineOfWork(work);
  return (
    <article className="mb-8 break-inside-avoid">
      <Tilt max={5} className="rounded-[var(--r)]">
        <Link
          href={`/work/${work.id}/`}
          data-cursor="View"
          className="work-hit art-frame art-fill group block"
          style={{ aspectRatio: RATIO[work.shape] }}
          aria-label={`${work.title} by ${d.name}`}
        >
          <Photo work={work} width={900} variant="card" />
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.65))" }} />
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1.5 text-[12px] font-medium">{disc.short}</span>
          <span className="glass absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl px-3.5 py-2.5 text-[13px] opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionTimingFunction: "var(--ease-out)" }}>
            <span className="mono text-[#d6d1c7]">{work.spec}</span>
          </span>
        </Link>
      </Tilt>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-[640] leading-tight tracking-[-0.01em]" style={{ fontStretch: "110%" }}>
            <Link href={`/work/${work.id}/`}>{work.title}</Link>
          </h3>
          <p className="mt-0.5 text-[14px] text-muted">
            <Link href={`/designers/${d.id}/`} className="ulink hover:text-ink">{d.name}</Link> · {d.city}
          </p>
        </div>
        <SaveButton id={work.id} title={work.title} />
      </div>
      {showDiscipline ? null : <p className="mono mt-1.5 text-muted">{work.spec}</p>}
    </article>
  );
}
