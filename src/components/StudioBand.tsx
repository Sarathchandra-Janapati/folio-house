import Link from "next/link";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react/ssr";
import { STUDIO } from "@/lib/studio";
import { Magnetic } from "./Magnetic";

export function StudioBand() {
  return (
    <section className="wrap">
      <div className="iris relative overflow-hidden rounded-[32px]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 90% at 15% 20%, rgba(201,164,255,0.28), transparent 60%), radial-gradient(60% 90% at 90% 90%, rgba(233,207,159,0.25), transparent 60%), #111113" }} />
        <div className="relative grid grid-cols-1 gap-10 p-[clamp(28px,6vw,80px)] md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="label">Built by {STUDIO.short}</p>
            <h2 className="display-xl mt-5">Want a site <span className="text-gradient">like this?</span></h2>
            <p className="lede mt-5 text-[#d6d1c7]">I design and build portfolio sites and marketplaces for designers, studios and collectives. This level of craft, with your work and your domain.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Magnetic>
              <Link href="/studio/" className="btn btn-accent" data-cursor="">See packages <ArrowRight size={16} className="arrow" /></Link>
            </Magnetic>
            <Magnetic>
              <a href={STUDIO.github} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor=""><GithubLogo size={16} /> GitHub</a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
