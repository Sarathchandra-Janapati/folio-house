"use client";
import { useEffect, useRef, useState } from "react";
import type { Shape, Work } from "@/lib/data";
import { photoFor } from "@/lib/media";
import { Art } from "./Art";

// Real photography first; if the image host is unreachable, the trade drawing stands in.
export function Photo({
  work,
  shape,
  width = 1200,
  variant = "p",
  className = "",
  priority = false,
  alt,
}: {
  work: Work;
  shape?: Shape;
  width?: number;
  variant?: string;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const src = photoFor(work.id, width);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // Catch images that failed before hydration attached onError.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (!src || failed) return <Art work={work} shape={shape} variant={variant} className={`photo h-full w-full ${className}`} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      srcSet={`${photoFor(work.id, Math.round(width / 2))} ${Math.round(width / 2)}w, ${src} ${width}w, ${photoFor(work.id, width * 2)} ${width * 2}w`}
      sizes="(max-width: 768px) 100vw, 50vw"
      alt={alt ?? work.title}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`photo block h-full w-full object-cover text-transparent ${className}`}
    />
  );
}
