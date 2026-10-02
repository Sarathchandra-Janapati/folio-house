"use client";
import Link from "next/link";
import { getWork } from "@/lib/data";
import { WorkCard } from "@/components/WorkCard";
import { useSaved } from "@/components/Providers";

export default function SavedPage() {
  const { saved } = useSaved();
  const works = saved.map(getWork).filter(Boolean);
  return (
    <div className="wrap pt-[clamp(28px,5vw,64px)]">
      <p className="label">Saved on this device</p>
      <h1 className="display-l mb-10 mt-4">Your shortlist</h1>
      {works.length === 0 ? (
        <div className="grid max-w-[46ch] gap-4">
          <p className="display-s">Nothing saved yet.</p>
          <p className="muted">Tap the heart on any project to keep it here while you compare designers.</p>
          <Link href="/work/" className="btn btn-primary w-fit">Browse work</Link>
        </div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {works.map((w) => <WorkCard key={w.id} work={w} />)}
        </div>
      )}
    </div>
  );
}
