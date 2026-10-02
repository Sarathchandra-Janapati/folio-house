"use client";
import { Heart } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useSaved } from "./Providers";

export function SaveButton({ id, title, boxed = false }: { id: string; title: string; boxed?: boolean }) {
  const { has, toggle } = useSaved();
  const on = has(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${title} from saved` : `Save ${title}`}
      onClick={(e) => {
        e.preventDefault();
        const now = toggle(id);
        toast(now ? `Saved ${title}` : `Removed ${title}`, { duration: 1800 });
      }}
      className={`grid flex-none place-items-center rounded-full transition-transform duration-150 active:scale-[0.88] ${boxed ? "h-11 w-11" : "-mr-2 -mt-1.5 h-9 w-9"}`}
      style={{ color: on ? "var(--accent)" : "var(--muted)", boxShadow: boxed ? "inset 0 0 0 1px var(--line)" : undefined }}
    >
      <motion.span key={on ? "on" : "off"} initial={{ transform: on ? "scale(0.6)" : "scale(1)" }} animate={{ transform: "scale(1)" }} transition={{ type: "spring", duration: 0.35, bounce: 0.4 }} className="grid">
        <Heart size={19} weight={on ? "fill" : "regular"} />
      </motion.span>
    </button>
  );
}
