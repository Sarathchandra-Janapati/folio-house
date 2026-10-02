"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      onSubmit={(e) => { e.preventDefault(); router.push(`/work/${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`); }}
      className="glass flex max-w-[600px] items-center gap-2 rounded-full p-1.5"
    >
      <MagnifyingGlass size={18} className="ml-3.5 flex-none text-muted" />
      <input
        id="hero-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Try “bridal”, “Lisbon” or “recycled gold”"
        aria-label="Search work"
        className="min-w-0 flex-1 bg-transparent px-1 text-[16px] text-ink outline-none placeholder:text-[#8d887f]"
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}
