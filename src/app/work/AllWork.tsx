"use client";
import { useSearchParams } from "next/navigation";
import { WorkGrid } from "@/components/WorkGrid";

export function AllWork() {
  const sp = useSearchParams();
  return <WorkGrid filterBy="discipline" showSearch initialQuery={sp.get("q") ?? ""} />;
}
