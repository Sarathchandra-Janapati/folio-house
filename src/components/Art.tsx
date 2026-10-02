import { artSVG } from "@/lib/art";
import type { Shape, Work } from "@/lib/data";

export function Art({ work, shape, variant = "a", className = "" }: { work: Work; shape?: Shape; variant?: string; className?: string }) {
  return <span className={`art-inner block ${className}`} dangerouslySetInnerHTML={{ __html: artSVG(work, shape, variant) }} />;
}
