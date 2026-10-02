import type { Metadata } from "next";
import { Suspense } from "react";
import { WORKS } from "@/lib/data";
import { AllWork } from "./AllWork";

export const metadata: Metadata = { title: "All work" };

export default function WorkIndex() {
  return (
    <div className="wrap pt-[clamp(28px,5vw,64px)]">
      <p className="label">{WORKS.length} projects</p>
      <h1 className="display-l mb-10 mt-4">All work</h1>
      <Suspense fallback={null}>
        <AllWork />
      </Suspense>
    </div>
  );
}
