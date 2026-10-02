import { initials } from "@/lib/data";

export function Avatar({ name, color, size = 48 }: { name: string; color: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid flex-none place-items-center rounded-full font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.34, fontStretch: "115%" }}
    >
      {initials(name)}
    </span>
  );
}
