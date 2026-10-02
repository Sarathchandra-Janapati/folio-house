import type { Metadata } from "next";
import { ProfileBuilder } from "@/components/ProfileBuilder";

export const metadata: Metadata = { title: "List your work" };

const TERMS: [string, string][] = [
  ["Listing and portfolio", "Free"],
  ["Briefs from clients", "Unlimited"],
  ["Fee on commissions won here", "8%"],
  ["Payouts", "Per milestone"],
];

export default function JoinPage() {
  return (
    <div className="wrap pt-[clamp(28px,5vw,64px)]">
      <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end">
        <div>
          <p className="label">For designers</p>
          <h1 className="display-l mt-4">Your folio, set up in five minutes.</h1>
          <p className="lede mt-5">Upload finished work, set a starting rate and start receiving briefs from people who already like what you make.</p>
        </div>
        <dl className="grid border-t" style={{ borderColor: "var(--line)" }}>
          {TERMS.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b py-3" style={{ borderColor: "var(--line)" }}>
              <dt>{k}</dt>
              <dd className="mono m-0 text-[13px] text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ProfileBuilder />
    </div>
  );
}
