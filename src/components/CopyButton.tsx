"use client";
import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { toast } from "sonner";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          toast("Email copied");
          setTimeout(() => setDone(false), 1600);
        } catch {
          toast("Select the address and copy it manually");
        }
      }}
    >
      <span className="relative grid h-4 w-4 place-items-center">
        <Copy size={16} style={{ position: "absolute", opacity: done ? 0 : 1, transform: done ? "scale(0.6)" : "scale(1)", filter: done ? "blur(2px)" : "none", transition: "opacity 200ms ease, transform 200ms var(--ease-out), filter 200ms ease" }} />
        <Check size={16} weight="bold" style={{ position: "absolute", opacity: done ? 1 : 0, transform: done ? "scale(1)" : "scale(0.6)", filter: done ? "none" : "blur(2px)", transition: "opacity 200ms ease, transform 200ms var(--ease-out), filter 200ms ease" }} />
      </span>
      {done ? "Copied" : label}
    </button>
  );
}
