import Link from "next/link";
import { getDiscipline, worksByDesigner, type Designer } from "@/lib/data";
import { Avatar } from "./Avatar";
import { Photo } from "./Photo";
import { Tilt } from "./Tilt";

export function DesignerCard({ d }: { d: Designer }) {
  const works = worksByDesigner(d.id);
  const cover = works[0];
  return (
    <Tilt max={4} className="h-full rounded-[22px]">
      <Link
        href={`/designers/${d.id}/`}
        data-cursor="Profile"
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-[#141416] transition-transform duration-150 active:scale-[0.98]"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      >
        <div className="art-fill relative aspect-[4/3] overflow-hidden">
          <Photo work={cover} shape="wide" width={700} variant="dc" className="transition-transform duration-700 group-hover:scale-[1.05]" />
          <span className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(20,20,22,1))" }} />
          <span className="glass absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.open ? "#9dc79a" : "#6d6960" }} />
            {d.open ? "Taking work" : "Booked"}
          </span>
        </div>
        <div className="-mt-8 flex flex-1 flex-col gap-3 p-4 pt-0">
          <div className="relative flex items-end gap-3">
            <span className="rounded-full p-[3px]" style={{ background: "#141416" }}><Avatar name={d.name} color={d.color} size={52} /></span>
            <div className="min-w-0 pb-1">
              <h3 className="text-[17px] font-[660] leading-tight" style={{ fontStretch: "110%" }}>{d.name}</h3>
              <p className="truncate text-[13px] text-muted">{d.role}</p>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3" style={{ borderColor: "var(--line)" }}>
            <p className="mono text-muted">{d.city} · {getDiscipline(d.discipline).short}</p>
            <p className="mono text-[#d6d1c7]">{d.rate}</p>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
