"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Muted background loop. Loads only near the viewport, pauses off-screen,
// and stays a still poster for people who prefer reduced motion.
export function BgVideo({ src, poster, className = "", playing = true }: { src?: string; poster?: string; className?: string; playing?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    if (inView && playing && !reduce) el.play().catch(() => {});
    else el.pause();
  }, [inView, playing, reduce, src]);

  if (!src || !ok) return null;
  return (
    <video
      ref={ref}
      className={`media-cover ${className}`}
      src={inView ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onError={() => setOk(false)}
    />
  );
}
