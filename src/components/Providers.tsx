"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

type SavedCtx = { saved: string[]; toggle: (id: string) => boolean; has: (id: string) => boolean };
const Ctx = createContext<SavedCtx>({ saved: [], toggle: () => false, has: () => false });
export const useSaved = () => useContext(Ctx);

const KEY = "folio-house:saved";

export function Providers({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);
  const toggle = useCallback((id: string) => {
    let now = false;
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      now = next.includes(id);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    return now;
  }, []);
  const has = useCallback((id: string) => saved.includes(id), [saved]);
  return (
    <MotionConfig reducedMotion="user">
      <Ctx.Provider value={{ saved, toggle, has }}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "glass-strong",
            style: {
              background: "rgba(24,24,27,0.85)",
              color: "var(--ink)", backdropFilter: "blur(20px)",
              border: "none",
              borderRadius: "14px",
              fontFamily: "var(--font-archivo), sans-serif",
            },
          }}
        />
      </Ctx.Provider>
    </MotionConfig>
  );
}
