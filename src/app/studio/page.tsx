import type { Metadata } from "next";
import { Check, GithubLogo } from "@phosphor-icons/react/ssr";
import { STUDIO } from "@/lib/studio";
import { CopyButton } from "@/components/CopyButton";
import { StudioContact } from "@/components/StudioContact";
import { Reveal } from "@/components/Reveal";
import { SplitWords } from "@/components/SplitWords";
import { Magnetic } from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Get a site like this",
  description: `Portfolio sites and marketplaces for designers, built by ${STUDIO.name}.`,
};

const PROCESS: [string, string][] = [
  ["Call", "A short call about your work, your clients and what the site has to do."],
  ["Direction", "Type, colour and layout drawn from your discipline, shown as a working page."],
  ["Build", "The full site, with your projects, animations and contact flow."],
  ["Launch", "Your domain, hosting and analytics set up, plus a handover so you can update it."],
];

export default function StudioPage() {
  return (
    <div className="wrap pt-[clamp(28px,5vw,64px)]">
      <section className="grid grid-cols-1 gap-8 pb-[clamp(40px,6vw,80px)] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
        <div>
          <p className="label">Get a site like this</p>
          <h1 className="display-xl mt-5"><SplitWords text="Your work deserves better than a link in bio." accentFrom={4} /></h1>
        </div>
        <div className="grid gap-4">
          <p className="lede">
            I&apos;m {STUDIO.name}, an {STUDIO.role} based in {STUDIO.city}. I built Folio House, and I build portfolio sites and marketplaces for designers, studios and collectives.
          </p>
          <div className="flex flex-wrap gap-2">
            <Magnetic><a href="#contact" className="btn btn-accent" data-cursor="">Start a project</a></Magnetic>
            <a href={STUDIO.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><GithubLogo size={16} /> GitHub</a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {STUDIO.packages.map((p, i) => {
          const featured = "featured" in p && p.featured;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className={`flex h-full flex-col gap-5 rounded-[26px] p-7 ${featured ? "" : "glass"}`}
                style={featured ? { background: "linear-gradient(160deg,#f3f0ea,#e9cf9f)", color: "#111" } : undefined}
              >
                <div>
                  <p className="label" style={featured ? { color: "#5a5146" } : undefined}>{p.for}</p>
                  <h2 className="display-s mt-2">{p.name}</h2>
                  <p className="mt-3 text-[20px] font-semibold" style={{ fontStretch: "110%" }}>{p.price ?? "Quote on request"}</p>
                </div>
                <ul className="grid gap-2.5 text-[15px]">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-2.5"><Check size={16} weight="bold" className="mt-1 flex-none" style={{ color: featured ? "#111" : "var(--accent)" }} />{x}</li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="btn mt-auto w-fit"
                  style={featured ? { background: "#111", color: "#f3f0ea" } : { background: "var(--ink)", color: "var(--paper)" }}
                >
                  Ask about this
                </a>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="pt-[clamp(56px,8vw,104px)]">
        <Reveal>
          <h2 className="display-m mb-8">How a project runs</h2>
          <ol className="grid gap-8 border-t pt-7 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--line)" }}>
            {PROCESS.map(([h, p], i) => (
              <li key={h} className="grid content-start gap-2">
                <span className="mono" style={{ color: "var(--accent)" }}>{i + 1} / {PROCESS.length}</span>
                <h3 className="display-s">{h}</h3>
                <p className="muted">{p}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="contact" className="scroll-mt-24 pt-[clamp(56px,8vw,104px)]">
        <div className="grid grid-cols-1 gap-8 glass-strong rounded-[32px] p-[clamp(20px,4vw,56px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid content-start gap-4">
            <p className="label">Contact</p>
            <h2 className="display-m">Tell me what you make.</h2>
            <p className="muted max-w-[42ch]">Send a few lines about your work and what you want the site to do. I reply with questions, a plan and a quote.</p>
            <div className="mt-2 grid gap-3">
              <p className="mono select-all break-all text-[14px]">{STUDIO.email}</p>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={STUDIO.email} label="Copy email" />
                <a href={STUDIO.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><GithubLogo size={16} /> {STUDIO.githubHandle}</a>
              </div>
            </div>
          </div>
          <StudioContact />
        </div>
      </section>
    </div>
  );
}
