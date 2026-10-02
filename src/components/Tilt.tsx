"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// 3D tilt toward the pointer plus a moving spotlight. Springs keep it soft and interruptible.
export function Tilt({ children, className = "", max = 8, style }: { children: React.ReactNode; className?: string; max?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        className="spot h-full w-full rounded-[inherit]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = ref.current!.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width;
          const ny = (e.clientY - r.top) / r.height;
          px.set(nx);
          py.set(ny);
          ref.current!.style.setProperty("--mx", `${nx * 100}%`);
          ref.current!.style.setProperty("--my", `${ny * 100}%`);
        }}
        onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
      >
        {children}
      </motion.div>
    </div>
  );
}
