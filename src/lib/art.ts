// Deterministic artwork for each project, drawn as SVG in the vocabulary of each trade:
// pattern pieces, floor plans, elevations, last profiles, ring drawings, joinery elevations,
// lathe profiles and loom swatches. Replace with real photography when designers upload work.
import type { Work, Shape } from "./data";
import { disciplineOfWork } from "./data";

export const SIZES: Record<Shape, [number, number]> = {
  tall: [400, 520],
  square: [400, 400],
  wide: [400, 290],
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const f = (n: number) => n.toFixed(1);

function open(W: number, H: number, label: string) {
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
}
function mtext(x: number, y: number, t: string, fill: string, anchor = "start", size = 9) {
  return `<text x="${f(x)}" y="${f(y)}" fill="${fill}" font-family="var(--font-mono), ui-monospace, monospace" font-size="${size}" letter-spacing="1.2" text-anchor="${anchor}">${esc(t)}</text>`;
}
function grid(W: number, H: number, step: number, color: string, op: number, major = 0) {
  let s = "";
  for (let x = step; x < W; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${color}" stroke-opacity="${major && x % major === 0 ? op * 2.6 : op}"/>`;
  for (let y = step; y < H; y += step) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${color}" stroke-opacity="${major && y % major === 0 ? op * 2.6 : op}"/>`;
  return s;
}
function dim(x1: number, x2: number, y: number, label: string, ink: string, bg: string) {
  const mid = (x1 + x2) / 2;
  return (
    `<line x1="${f(x1)}" y1="${f(y)}" x2="${f(x2)}" y2="${f(y)}" stroke="${ink}" stroke-opacity=".6"/>` +
    `<line x1="${f(x1)}" y1="${f(y - 5)}" x2="${f(x1)}" y2="${f(y + 5)}" stroke="${ink}" stroke-opacity=".6"/>` +
    `<line x1="${f(x2)}" y1="${f(y - 5)}" x2="${f(x2)}" y2="${f(y + 5)}" stroke="${ink}" stroke-opacity=".6"/>` +
    `<rect x="${f(mid - 28)}" y="${f(y - 7)}" width="56" height="14" fill="${bg}"/>` +
    mtext(mid, y + 3, label, ink, "middle", 8)
  );
}

/* ---------------- Fashion: pattern pieces on a cutting mat ---------------- */
function fashion(w: Work, W: number, H: number, uid: string) {
  const p = w.pal, r = rng(w.seed), id = uid + "f";
  const style = Math.floor(r() * 3);
  let pat = "";
  if (style === 0) pat = `<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="${p.a}"/><rect width="7" height="14" fill="${p.c}" opacity=".35"/><circle cx="10" cy="4" r="1.6" fill="${p.b}"/></pattern>`;
  else if (style === 1) pat = `<pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${p.a}"/><rect width="18" height="6" fill="${p.c}" opacity=".45"/><rect width="6" height="18" fill="${p.c}" opacity=".45"/><rect x="11" y="11" width="3" height="3" fill="${p.b}"/></pattern>`;
  else pat = `<pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="${p.a}"/><path d="M11 3 L15 11 L11 19 L7 11 Z" fill="${p.b}" opacity=".9"/><circle cx="0" cy="0" r="3" fill="${p.c}"/><circle cx="22" cy="22" r="3" fill="${p.c}"/><circle cx="22" cy="0" r="3" fill="${p.c}"/><circle cx="0" cy="22" r="3" fill="${p.c}"/></pattern>`;
  let s = open(W, H, w.title + ", pattern pieces") + `<defs>${pat}</defs><rect width="${W}" height="${H}" fill="${p.bg}"/>` + grid(W, H, 20, p.ink, 0.07);
  const bodice = "M40,20 L85,8 Q100,34 115,8 L160,20 L176,72 Q158,98 165,132 L172,250 L28,250 L35,132 Q42,98 24,72 Z";
  const sleeve = "M0,62 Q60,-12 120,62 L104,200 L16,200 Z";
  const sc = Math.min(W / 400, H / 400) * (W > H ? 0.82 : 1);
  const bx = W * 0.36 - 100 * sc, by = H * 0.5 - 130 * sc, rot = r() * 10 - 5;
  s += `<g transform="translate(${f(bx)},${f(by)}) rotate(${f(rot)} 100 130) scale(${sc.toFixed(3)})">`;
  s += `<path d="${bodice}" fill="url(#${id})" stroke="${p.ink}" stroke-width="1.6"/>`;
  s += `<path d="${bodice}" fill="none" stroke="${p.bg}" stroke-width="1.2" stroke-dasharray="5 4" transform="translate(100 135) scale(.9) translate(-100 -135)"/>`;
  s += `<line x1="100" y1="70" x2="100" y2="215" stroke="${p.bg}" stroke-width="1.4"/><path d="M95 78 L100 68 L105 78 M95 207 L100 217 L105 207" fill="none" stroke="${p.bg}" stroke-width="1.4"/></g>`;
  s += `<g transform="translate(${f(W * 0.66)},${f(H * 0.5 - 60 * sc)}) rotate(${f(8 + r() * 8)} 60 100) scale(${(sc * 0.82).toFixed(3)})">`;
  s += `<path d="${sleeve}" fill="${p.c}" stroke="${p.ink}" stroke-width="1.6"/>`;
  s += `<path d="${sleeve}" fill="none" stroke="${p.bg}" stroke-width="1.2" stroke-dasharray="5 4" transform="translate(60 120) scale(.88) translate(-60 -120)"/>`;
  s += `<line x1="60" y1="60" x2="60" y2="180" stroke="${p.bg}" stroke-width="1.4"/></g>`;
  s += mtext(16, H - 16, "FRONT BODICE · CUT 2 · SLEEVE · CUT 2", p.ink) + mtext(W - 16, 22, "SA 1.5 CM", p.ink, "end");
  return s + "</svg>";
}

/* ---------------- Architecture: generated floor plan ---------------- */
function arch(w: Work, W: number, H: number) {
  const p = w.pal, r = rng(w.seed);
  let s = open(W, H, w.title + ", floor plan") + `<rect width="${W}" height="${H}" fill="${p.bg}"/>` + grid(W, H, 10, p.c, 0.1, 50);
  const m = 46, rooms: number[][] = [];
  const names = ["LIVING", "KITCHEN", "BED 1", "BED 2", "BATH", "STUDY", "DINING", "STORE", "LOUNGE"];
  const split = (x: number, y: number, w2: number, h2: number, d: number) => {
    if (d === 0 || (w2 < 90 && h2 < 90)) { rooms.push([x, y, w2, h2]); return; }
    const vert = w2 > h2 ? true : h2 > w2 ? false : r() > 0.5;
    const t = 0.35 + r() * 0.3;
    if (vert) { const a = Math.round((w2 * t) / 5) * 5; split(x, y, a, h2, d - 1); split(x + a, y, w2 - a, h2, d - 1); }
    else { const b = Math.round((h2 * t) / 5) * 5; split(x, y, w2, b, d - 1); split(x, y + b, w2, h2 - b, d - 1); }
  };
  split(m, m, W - 2 * m, H - 2 * m - 20, 3);
  const court = Math.floor(r() * rooms.length);
  rooms.forEach((rm, i) => {
    s += `<rect x="${rm[0]}" y="${rm[1]}" width="${rm[2]}" height="${rm[3]}" fill="${i === court ? p.b : "none"}" fill-opacity="${i === court ? 0.7 : 0}" stroke="${p.a}" stroke-width="5"/>`;
  });
  rooms.forEach((rm, i) => {
    const dw = 22;
    if (rm[2] > 60 && rm[1] + rm[3] < H - m - 22) {
      const dx = rm[0] + 12 + Math.floor(r() * Math.max(1, rm[2] - dw - 24)), dy = rm[1] + rm[3];
      s += `<rect x="${dx}" y="${dy - 4}" width="${dw}" height="8" fill="${p.bg}"/><path d="M${dx} ${dy} L${dx} ${dy - dw} A${dw} ${dw} 0 0 1 ${dx + dw} ${dy}" fill="none" stroke="${p.a}" stroke-width="1"/>`;
    } else if (rm[3] > 60 && rm[0] > m + 2) {
      const ly = rm[1] + 12 + Math.floor(r() * Math.max(1, rm[3] - dw - 24));
      s += `<rect x="${rm[0] - 4}" y="${ly}" width="8" height="${dw}" fill="${p.bg}"/><path d="M${rm[0]} ${ly} L${rm[0] + dw} ${ly} A${dw} ${dw} 0 0 1 ${rm[0]} ${ly + dw}" fill="none" stroke="${p.a}" stroke-width="1"/>`;
    }
    const nm = i === court ? "COURT" : names[i % names.length];
    if (rm[2] > 54 && rm[3] > 30) s += mtext(rm[0] + rm[2] / 2, rm[1] + rm[3] / 2 + 3, nm, p.ink, "middle", 8);
  });
  const ow = W - 2 * m;
  for (let k = 0; k < 3; k++) { const wx = m + 30 + (k * (ow - 90)) / 2; s += `<rect x="${f(wx)}" y="${m - 3}" width="34" height="6" fill="${p.bg}" stroke="${p.a}" stroke-width="1"/><line x1="${f(wx)}" y1="${m}" x2="${f(wx + 34)}" y2="${m}" stroke="${p.a}"/>`; }
  const nx = W - 30, ny = 26;
  s += `<circle cx="${nx}" cy="${ny}" r="11" fill="none" stroke="${p.ink}"/><path d="M${nx} ${ny - 9} L${nx + 4} ${ny + 5} L${nx} ${ny + 2} L${nx - 4} ${ny + 5} Z" fill="${p.ink}"/>`;
  const sy = H - 22;
  for (let q = 0; q < 4; q++) s += `<rect x="${m + q * 20}" y="${sy}" width="20" height="4" fill="${q % 2 ? p.bg : p.ink}" stroke="${p.ink}" stroke-width=".8"/>`;
  s += mtext(m + 88, sy + 5, "0   2   4 M", p.ink, "start", 8) + mtext(W - m, sy + 5, "GROUND FLOOR", p.ink, "end", 8);
  return s + "</svg>";
}

/* ---------------- Interiors: room elevation ---------------- */
function interior(w: Work, W: number, H: number, uid: string) {
  const p = w.pal, r = rng(w.seed), id = uid + "i";
  const floorY = H * 0.76;
  let s = open(W, H, w.title + ", elevation");
  s += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.c}"/><stop offset="1" stop-color="${p.b}" stop-opacity=".55"/></linearGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="${p.bg}"/><rect y="${f(floorY)}" width="${W}" height="${f(H - floorY)}" fill="${p.ink}" opacity=".12"/><line x1="0" y1="${f(floorY)}" x2="${W}" y2="${f(floorY)}" stroke="${p.ink}" stroke-opacity=".5"/>`;
  const aw = W * 0.34, ax = W * 0.5 - aw / 2 + (r() * 40 - 20), at = H * 0.12, ab = floorY - H * 0.2;
  s += `<path d="M${f(ax)} ${f(ab)} L${f(ax)} ${f(at + aw / 2)} A${f(aw / 2)} ${f(aw / 2)} 0 0 1 ${f(ax + aw)} ${f(at + aw / 2)} L${f(ax + aw)} ${f(ab)} Z" fill="url(#${id})" stroke="${p.ink}" stroke-opacity=".6" stroke-width="2"/>`;
  s += `<line x1="${f(ax + aw / 2)}" y1="${f(at)}" x2="${f(ax + aw / 2)}" y2="${f(ab)}" stroke="${p.ink}" stroke-opacity=".35"/><line x1="${f(ax)}" y1="${f(at + aw / 2)}" x2="${f(ax + aw)}" y2="${f(at + aw / 2)}" stroke="${p.ink}" stroke-opacity=".35"/>`;
  s += `<circle cx="${f(ax + aw * 0.68)}" cy="${f(at + aw * 0.45)}" r="${f(aw * 0.09)}" fill="${p.b}" opacity=".8"/>`;
  s += `<ellipse cx="${f(W * 0.5)}" cy="${f(floorY + (H - floorY) * 0.45)}" rx="${f(W * 0.38)}" ry="${f((H - floorY) * 0.26)}" fill="${p.b}" opacity=".55"/>`;
  const sw = W * 0.56, sx = W * 0.5 - sw / 2, sh = H * 0.13, sy = floorY - sh;
  s += `<rect x="${f(sx)}" y="${f(sy - sh * 0.55)}" width="${f(sw)}" height="${f(sh * 0.8)}" rx="${f(sh * 0.3)}" fill="${p.a}"/>`;
  s += `<rect x="${f(sx - 8)}" y="${f(sy - sh * 0.1)}" width="${f(sw + 16)}" height="${f(sh * 0.85)}" rx="${f(sh * 0.25)}" fill="${p.a}"/><rect x="${f(sx - 8)}" y="${f(sy - sh * 0.1)}" width="${f(sw + 16)}" height="${f(sh * 0.85)}" rx="${f(sh * 0.25)}" fill="#000" opacity=".08"/>`;
  s += `<rect x="${f(sx + sw * 0.12)}" y="${f(sy - sh * 0.45)}" width="${f(sw * 0.18)}" height="${f(sh * 0.45)}" rx="8" fill="${p.c}"/><rect x="${f(sx + sw * 0.7)}" y="${f(sy - sh * 0.4)}" width="${f(sw * 0.16)}" height="${f(sh * 0.4)}" rx="8" fill="${p.b}"/>`;
  const tx = sx + sw + 26;
  s += `<rect x="${f(tx)}" y="${f(floorY - H * 0.1)}" width="34" height="${f(H * 0.1)}" rx="3" fill="${p.ink}" opacity=".75"/><line x1="${f(tx + 17)}" y1="${f(floorY - H * 0.1)}" x2="${f(tx + 17)}" y2="${f(floorY - H * 0.17)}" stroke="${p.ink}" stroke-width="2"/>`;
  s += `<path d="M${f(tx + 4)} ${f(floorY - H * 0.17)} L${f(tx + 30)} ${f(floorY - H * 0.17)} L${f(tx + 24)} ${f(floorY - H * 0.23)} L${f(tx + 10)} ${f(floorY - H * 0.23)} Z" fill="${p.c}" stroke="${p.ink}" stroke-opacity=".4"/>`;
  const px = sx - 40;
  s += `<path d="M${f(px - 14)} ${f(floorY)} L${f(px - 10)} ${f(floorY - 30)} L${f(px + 10)} ${f(floorY - 30)} L${f(px + 14)} ${f(floorY)} Z" fill="${p.b}"/>`;
  for (let k = 0; k < 7; k++) {
    const ang = -Math.PI / 2 + (k - 3) * 0.32, len = 40 + r() * 36;
    const cx = px + Math.cos(ang) * len * 0.55, cy = floorY - 30 + Math.sin(ang) * len * 0.55;
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="7" ry="${f(len * 0.38)}" transform="rotate(${f((ang * 180) / Math.PI + 90)} ${f(cx)} ${f(cy)})" fill="${p.a}" opacity="${(0.7 + r() * 0.3).toFixed(2)}"/>`;
  }
  const lx = W * 0.5 + (r() * 60 - 30);
  s += `<line x1="${f(lx)}" y1="0" x2="${f(lx)}" y2="${f(H * 0.1)}" stroke="${p.ink}" stroke-opacity=".6"/><path d="M${f(lx - 20)} ${f(H * 0.1 + 16)} A20 16 0 0 1 ${f(lx + 20)} ${f(H * 0.1 + 16)} Z" fill="${p.ink}" opacity=".85"/>`;
  s += dim(sx, sx + sw, H - 14, "2400", p.ink, p.bg) + mtext(14, 20, "ELEVATION A", p.ink);
  return s + "</svg>";
}

/* ---------------- Footwear: last profile ---------------- */
function shoe(w: Work, W: number, H: number) {
  const p = w.pal, r = rng(w.seed);
  let s = open(W, H, w.title + ", side profile") + `<rect width="${W}" height="${H}" fill="${p.bg}"/>`;
  s += `<circle cx="${f(W * 0.78)}" cy="${f(H * 0.28)}" r="${f(H * 0.22)}" fill="${p.c}" opacity=".55"/>`;
  const sc = Math.min(W / 400, H / 300) * 0.92, ox = (W - 400 * sc) / 2, oy = (H - 300 * sc) / 2 + 6;
  s += `<g transform="translate(${f(ox)},${f(oy)}) scale(${sc.toFixed(3)})">`;
  s += `<ellipse cx="205" cy="236" rx="160" ry="9" fill="${p.ink}" opacity=".12"/>`;
  s += `<path d="M52 214 L346 214 Q372 214 370 200 L368 192 L52 192 Q44 192 44 203 Q44 214 52 214 Z" fill="${p.c}" stroke="${p.ink}" stroke-width="1.5"/>`;
  s += `<path d="M52 192 L52 172 L96 172 L100 192 Z" fill="${p.b}" stroke="${p.ink}" stroke-width="1.5"/>`;
  s += `<path d="M60 192 L58 118 Q60 96 84 100 L148 112 Q188 120 226 146 L300 166 Q352 176 364 192 Z" fill="${p.a}" stroke="${p.ink}" stroke-width="1.5"/>`;
  s += `<path d="M286 162 Q300 178 296 192" fill="none" stroke="${p.ink}" stroke-width="1.2"/><path d="M60 150 Q120 150 150 112" fill="none" stroke="${p.ink}" stroke-width="1.2"/>`;
  s += `<path d="M64 186 L360 186" fill="none" stroke="${p.c}" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M66 146 Q122 144 146 116" fill="none" stroke="${p.c}" stroke-width="1" stroke-dasharray="3 3"/>`;
  for (let i = 0; i < 5; i++) { const lx = 160 + i * 14, ly = 120 + i * 7; s += `<circle cx="${lx}" cy="${ly}" r="2.4" fill="${p.c}"/><line x1="${lx - 7}" y1="${ly - 6}" x2="${lx + 9}" y2="${ly + 3}" stroke="${p.c}" stroke-width="2.4" stroke-linecap="round"/>`; }
  s += `<path d="M58 118 Q50 104 60 98 L72 100" fill="none" stroke="${p.ink}" stroke-width="1.5"/>`;
  s += dim(44, 370, 258, `${264 + Math.floor(r() * 12)} MM`, p.ink, p.bg) + "</g>";
  s += mtext(14, 20, "LAST 07 · LATERAL", p.ink);
  return s + "</svg>";
}

/* ---------------- Jewellery: ring drawings ---------------- */
function jewel(w: Work, W: number, H: number, uid: string) {
  const emerald = /emerald/i.test(w.title);
  const p = w.pal, r = rng(w.seed), g = uid + "j", gem = uid + "g";
  const cx = W * 0.42, cy = H * 0.58, R = Math.min(W, H) * 0.24;
  let s = open(W, H, w.title + ", ring drawing");
  s += `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.b}"/><stop offset=".45" stop-color="${p.a}"/><stop offset="1" stop-color="${p.c}"/></linearGradient>`;
  s += `<radialGradient id="${gem}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="${emerald ? p.b : "#E8EEF3"}"/><stop offset="1" stop-color="${emerald ? p.ink : "#9AA8B5"}"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="${p.bg}"/>` + grid(W, H, 24, p.ink, 0.05);
  s += `<ellipse cx="${f(cx + 6)}" cy="${f(cy + R * 0.98)}" rx="${f(R * 1.05)}" ry="${f(R * 0.12)}" fill="${p.ink}" opacity=".12"/>`;
  if (w.id.includes("bands")) {
    const tones = [p.a, p.b, p.c];
    tones.forEach((t, i) => {
      const yy = cy - R * 0.5 + i * R * 0.42;
      s += `<ellipse cx="${f(cx)}" cy="${f(yy)}" rx="${f(R)}" ry="${f(R * 0.38)}" fill="none" stroke="${t}" stroke-width="${f(R * 0.12)}"/>`;
      for (let k = 0; k < 14; k++) { const a = (k / 14) * Math.PI * 2; s += `<circle cx="${f(cx + Math.cos(a) * R)}" cy="${f(yy + Math.sin(a) * R * 0.38)}" r="1.4" fill="${p.ink}" opacity=".18"/>`; }
    });
    s += mtext(14, 20, "STACK · 3 × 1.8 MM", p.ink);
  } else {
    // band in three-quarter view
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(R)}" ry="${f(R * 0.9)}" fill="none" stroke="url(#${g})" stroke-width="${f(R * 0.16)}"/>`;
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(R * 0.86)}" ry="${f(R * 0.76)}" fill="none" stroke="${p.ink}" stroke-opacity=".25"/>`;
    const gy = cy - R * 0.98, gs = R * (emerald ? 0.42 : 0.38);
    // claws / bezel
    if (emerald) {
      s += `<rect x="${f(cx - gs * 0.8)}" y="${f(gy - gs * 0.62)}" width="${f(gs * 1.6)}" height="${f(gs * 1.1)}" rx="3" fill="${p.a}" stroke="${p.c}" stroke-width="2"/>`;
      s += `<path d="M${f(cx - gs * 0.6)} ${f(gy - gs * 0.45)} L${f(cx + gs * 0.6)} ${f(gy - gs * 0.45)} L${f(cx + gs * 0.68)} ${f(gy - gs * 0.35)} L${f(cx + gs * 0.68)} ${f(gy + gs * 0.25)} L${f(cx + gs * 0.6)} ${f(gy + gs * 0.35)} L${f(cx - gs * 0.6)} ${f(gy + gs * 0.35)} L${f(cx - gs * 0.68)} ${f(gy + gs * 0.25)} L${f(cx - gs * 0.68)} ${f(gy - gs * 0.35)} Z" fill="url(#${gem})"/>`;
      s += `<rect x="${f(cx - gs * 0.4)}" y="${f(gy - gs * 0.25)}" width="${f(gs * 0.8)}" height="${f(gs * 0.4)}" fill="none" stroke="#fff" stroke-opacity=".5"/>`;
    } else {
      for (let k = 0; k < 6; k++) { const a = Math.PI + (k / 5) * Math.PI; s += `<line x1="${f(cx + Math.cos(a) * gs * 0.3)}" y1="${f(gy + gs * 0.5)}" x2="${f(cx + Math.cos(a) * gs * 0.95)}" y2="${f(gy - gs * 0.2)}" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`; }
      const pts: string[] = [];
      for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2 + Math.PI / 8; pts.push(`${f(cx + Math.cos(a) * gs)},${f(gy - gs * 0.25 + Math.sin(a) * gs * 0.42)}`); }
      s += `<polygon points="${pts.join(" ")}" fill="url(#${gem})" stroke="${p.ink}" stroke-opacity=".3"/>`;
      s += `<path d="M${f(cx - gs)} ${f(gy - gs * 0.2)} L${f(cx)} ${f(gy + gs * 0.75)} L${f(cx + gs)} ${f(gy - gs * 0.2)}" fill="url(#${gem})" opacity=".85" stroke="${p.ink}" stroke-opacity=".3"/>`;
      s += `<line x1="${f(cx)}" y1="${f(gy - gs * 0.25)}" x2="${f(cx)}" y2="${f(gy + gs * 0.75)}" stroke="${p.ink}" stroke-opacity=".2"/>`;
    }
    // top view inset
    const ix = W * 0.82, iy = H * 0.24, ir = Math.min(W, H) * 0.08;
    s += `<circle cx="${f(ix)}" cy="${f(iy)}" r="${f(ir)}" fill="${p.bg}" stroke="${p.ink}" stroke-opacity=".6"/>`;
    for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; s += `<line x1="${f(ix)}" y1="${f(iy)}" x2="${f(ix + Math.cos(a) * ir)}" y2="${f(iy + Math.sin(a) * ir)}" stroke="${p.ink}" stroke-opacity=".35"/>`; }
    s += `<rect x="${f(ix - ir * 0.45)}" y="${f(iy - ir * 0.45)}" width="${f(ir * 0.9)}" height="${f(ir * 0.9)}" transform="rotate(45 ${f(ix)} ${f(iy)})" fill="none" stroke="${p.ink}" stroke-opacity=".5"/>`;
    s += mtext(ix, iy + ir + 16, `Ø ${(6 + r() * 1.4).toFixed(1)} MM`, p.ink, "middle", 8);
    s += mtext(14, 20, "SIDE · TOP", p.ink);
  }
  s += dim(cx - R, cx + R, H - 18, "US 6½", p.ink, p.bg);
  return s + "</svg>";
}

/* ---------------- Furniture & lighting: elevations ---------------- */
function furniture(w: Work, W: number, H: number, uid: string) {
  const p = w.pal, r = rng(w.seed), floor = H * 0.82;
  let s = open(W, H, w.title + ", elevation") + `<rect width="${W}" height="${H}" fill="${p.bg}"/>`;
  s += `<line x1="0" y1="${f(floor)}" x2="${W}" y2="${f(floor)}" stroke="${p.ink}" stroke-opacity=".45"/>`;
  if (w.id.includes("pendant")) {
    const glow = uid + "glow";
    const cx = W / 2, top = H * 0.32, rw = W * 0.34;
    s += `<defs><radialGradient id="${glow}" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="${p.a}" stop-opacity=".95"/><stop offset="1" stop-color="${p.bg}" stop-opacity="0"/></radialGradient></defs>`;
    s += `<ellipse cx="${f(cx)}" cy="${f(top + rw * 0.4)}" rx="${f(rw * 1.6)}" ry="${f(H * 0.42)}" fill="url(#${glow})"/>`;
    s += `<line x1="${f(cx)}" y1="0" x2="${f(cx)}" y2="${f(top - rw * 0.42)}" stroke="${p.ink}" stroke-width="1.4"/>`;
    s += `<path d="M${f(cx - rw)} ${f(top)} A${f(rw)} ${f(rw * 0.42)} 0 0 1 ${f(cx + rw)} ${f(top)} Z" fill="${p.a}" stroke="${p.c}" stroke-width="1.2"/>`;
    for (let k = 1; k < 9; k++) { const x = cx - rw + (k * 2 * rw) / 9; const yy = top - Math.sqrt(Math.max(0, 1 - ((x - cx) / rw) ** 2)) * rw * 0.42; s += `<line x1="${f(x)}" y1="${f(yy)}" x2="${f(x)}" y2="${f(top)}" stroke="${p.c}" stroke-opacity=".45"/>`; }
    s += `<rect x="${f(cx - rw)}" y="${f(top - 2)}" width="${f(rw * 2)}" height="5" rx="2" fill="${p.b}"/>`;
    s += `<rect x="${f(W * 0.12)}" y="${f(floor - H * 0.2)}" width="${f(W * 0.76)}" height="10" fill="${p.b}"/><rect x="${f(W * 0.18)}" y="${f(floor - H * 0.2 + 10)}" width="10" height="${f(H * 0.2 - 10)}" fill="${p.b}"/><rect x="${f(W * 0.82 - 10)}" y="${f(floor - H * 0.2 + 10)}" width="10" height="${f(H * 0.2 - 10)}" fill="${p.b}"/>`;
    s += dim(cx - rw, cx + rw, top + 26, "Ø 520", p.ink, p.bg) + mtext(14, H - 12, "PENDANT · E27 · 2700K", p.ink);
  } else if (w.id.includes("table")) {
    const tl = W * 0.1, tr = W * 0.9, th = H * 0.42, ty = floor - th;
    s += `<rect x="${f(tl)}" y="${f(ty)}" width="${f(tr - tl)}" height="12" rx="2" fill="${p.a}" stroke="${p.c}"/>`;
    [tl + 40, tr - 40].forEach((lx) => {
      s += `<path d="M${f(lx - 10)} ${f(ty + 12)} L${f(lx + 10)} ${f(ty + 12)} L${f(lx + 22)} ${f(floor)} L${f(lx - 22)} ${f(floor)} Z" fill="${p.a}" stroke="${p.c}"/>`;
      s += `<rect x="${f(lx - 30)}" y="${f(floor - 8)}" width="60" height="8" fill="${p.c}"/>`;
    });
    s += `<rect x="${f(tl + 40)}" y="${f(ty + th * 0.55)}" width="${f(tr - tl - 80)}" height="7" fill="${p.c}"/>`;
    for (let k = 0; k < 18; k++) { const y = ty + 2 + r() * 8; s += `<line x1="${f(tl + r() * (tr - tl) * 0.6)}" y1="${f(y)}" x2="${f(tl + (tr - tl) * (0.4 + r() * 0.6))}" y2="${f(y)}" stroke="${p.c}" stroke-opacity=".35"/>`; }
    s += dim(tl, tr, ty - 22, "2400", p.ink, p.bg) + mtext(14, H - 12, "TRESTLE · WHITE OAK", p.ink);
  } else {
    // lounge chair, side elevation
    const sc = Math.min(W / 400, H / 400), ox = W / 2 - 150 * sc, oy = floor - 300 * sc;
    s += `<g transform="translate(${f(ox)},${f(oy)}) scale(${sc.toFixed(3)})">`;
    s += `<path d="M40 300 L80 150 M250 300 L220 160" stroke="${p.a}" stroke-width="12" stroke-linecap="round"/>`;
    s += `<path d="M60 160 L240 170" stroke="${p.a}" stroke-width="12" stroke-linecap="round"/>`;
    s += `<path d="M200 165 L265 40" stroke="${p.a}" stroke-width="12" stroke-linecap="round"/>`;
    s += `<rect x="62" y="122" width="180" height="40" rx="18" fill="${p.b}"/>`;
    s += `<rect x="198" y="40" width="44" height="120" rx="18" transform="rotate(28 220 100)" fill="${p.b}"/>`;
    s += `<path d="M70 135 Q150 128 232 135" stroke="${p.bg}" stroke-opacity=".35" stroke-width="2" fill="none"/>`;
    s += `<line x1="-20" y1="300" x2="-20" y2="160" stroke="${p.ink}" stroke-opacity=".6"/><line x1="-26" y1="160" x2="-14" y2="160" stroke="${p.ink}" stroke-opacity=".6"/><line x1="-26" y1="300" x2="-14" y2="300" stroke="${p.ink}" stroke-opacity=".6"/>`;
    s += `<rect x="-38" y="222" width="36" height="14" fill="${p.bg}"/>` + mtext(-20, 232, "380", p.ink, "middle", 8);
    s += "</g>" + mtext(14, 20, "SIDE ELEVATION · 1:10", p.ink);
  }
  return s + "</svg>";
}

/* ---------------- Ceramics: lathe profiles ---------------- */
function objects(w: Work, W: number, H: number, uid: string) {
  const p = w.pal, r = rng(w.seed), shelfY = H * 0.8;
  let s = open(W, H, w.title + ", vessel profiles") + `<rect width="${W}" height="${H}" fill="${p.bg}"/><rect y="${f(shelfY)}" width="${W}" height="${f(H - shelfY)}" fill="${p.c}" opacity=".45"/>`;
  const n = 3, gap = W / (n + 1), cols = [p.a, p.b, p.c];
  for (let v = 0; v < n; v++) {
    const gid = `${uid}v${v}`;
    const cx = gap * (v + 1) + (r() * 20 - 10);
    const h = H * (0.28 + r() * 0.28), base = H * 0.035 + r() * H * 0.03;
    const steps = 24, b1 = r() * Math.PI, f1 = 0.8 + r() * 1.4, amp = H * 0.05 + r() * H * 0.06;
    const pts: [number, number][] = [];
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      let rad = base * 1.6 + Math.sin(t * Math.PI * f1 + b1) * amp * 0.6 + Math.sin(t * Math.PI) * amp;
      if (t > 0.86) rad *= 1 - (t - 0.86) * 2.2;
      pts.push([Math.max(rad, base * 0.8), shelfY - t * h]);
    }
    let d = `M${f(cx - pts[0][0])} ${f(shelfY)}`;
    pts.forEach((q) => (d += ` L${f(cx - q[0])} ${f(q[1])}`));
    for (let j = pts.length - 1; j >= 0; j--) d += ` L${f(cx + pts[j][0])} ${f(pts[j][1])}`;
    d += " Z";
    const col = cols[v % 3];
    s += `<defs><linearGradient id="${gid}" x1="0" x2="1"><stop offset="0" stop-color="${col}"/><stop offset=".45" stop-color="${col}" stop-opacity=".82"/><stop offset="1" stop-color="${p.ink}" stop-opacity=".9"/></linearGradient></defs>`;
    s += `<ellipse cx="${f(cx + 10)}" cy="${f(shelfY + 2)}" rx="${f(pts[0][0] * 1.6)}" ry="5" fill="${p.ink}" opacity=".15"/><path d="${d}" fill="url(#${gid})"/>`;
    const gl = Math.floor(steps * (0.35 + r() * 0.2));
    s += `<path d="M${f(cx - pts[gl][0])} ${f(pts[gl][1])} Q${f(cx)} ${f(pts[gl][1] + 6)} ${f(cx + pts[gl][0])} ${f(pts[gl][1])}" fill="none" stroke="${p.bg}" stroke-opacity=".35" stroke-width="1.5"/>`;
    const top = pts[pts.length - 1];
    s += `<ellipse cx="${f(cx)}" cy="${f(top[1])}" rx="${f(top[0])}" ry="3" fill="${p.ink}" opacity=".55"/>`;
  }
  s += mtext(14, 20, "PROFILE · 1:4", p.ink);
  return s + "</svg>";
}

/* ---------------- Textiles: loom swatch ---------------- */
function textile(w: Work, W: number, H: number) {
  const p = w.pal, r = rng(w.seed);
  let s = open(W, H, w.title + ", swatch") + `<rect width="${W}" height="${H}" fill="${p.bg}"/>`;
  const mx = W * 0.14, my = H * 0.1, sw = W - 2 * mx, sh = H * 0.72, rot = r() * 6 - 3;
  s += `<g transform="rotate(${f(rot)} ${W / 2} ${H / 2})"><rect x="${f(mx + 6)}" y="${f(my + 8)}" width="${f(sw)}" height="${f(sh)}" fill="${p.ink}" opacity=".15"/><rect x="${f(mx)}" y="${f(my)}" width="${f(sw)}" height="${f(sh)}" fill="${p.a}"/>`;
  const stripW = sw / 5;
  for (let c = 0; c < 5; c++) {
    const x0 = mx + c * stripW;
    if (c > 0) s += `<line x1="${f(x0)}" y1="${f(my)}" x2="${f(x0)}" y2="${f(my + sh)}" stroke="${p.ink}" stroke-opacity=".35"/>`;
    let y = my + 6;
    while (y < my + sh - 10) {
      const bh = 6 + r() * 22, kind = r();
      if (kind < 0.35) { const st = stripW / 4; for (let k = 0; k < 4; k++) s += `<rect x="${f(x0 + k * st)}" y="${f(y + (r() * 4 - 2))}" width="${f(st + 0.5)}" height="${f(Math.min(bh, my + sh - y))}" fill="${p.b}" opacity=".95"/>`; }
      else if (kind < 0.6) s += `<rect x="${f(x0 + stripW * 0.3)}" y="${f(y)}" width="${f(stripW * 0.4)}" height="${f(bh * 0.6)}" fill="${p.c}"/>`;
      else if (kind < 0.75) for (let d2 = 0; d2 < 3; d2++) s += `<rect x="${f(x0 + 4 + (d2 * (stripW - 8)) / 3)}" y="${f(y)}" width="${f((stripW - 8) / 6)}" height="3" fill="${p.c}" opacity=".9"/>`;
      y += bh + 4 + r() * 16;
    }
  }
  for (let ty = my; ty < my + sh; ty += 3) s += `<line x1="${f(mx)}" y1="${f(ty)}" x2="${f(mx + sw)}" y2="${f(ty)}" stroke="${p.ink}" stroke-opacity=".07"/>`;
  for (let fx = mx + 3; fx < mx + sw - 1; fx += 5) { const fl = 10 + r() * 12; s += `<line x1="${f(fx)}" y1="${f(my + sh)}" x2="${f(fx + (r() * 3 - 1.5))}" y2="${f(my + sh + fl)}" stroke="${p.a}" stroke-width="1.6" stroke-linecap="round"/>`; }
  s += "</g>" + mtext(14, H - 14, "WARP 24 EPI · WEFT 18 PPI", p.ink);
  return s + "</svg>";
}

export function artSVG(w: Work, shape?: Shape, variant = "a"): string {
  const [W, H] = SIZES[shape ?? w.shape];
  const uid = `${w.id}-${variant}-`;
  switch (disciplineOfWork(w).kind) {
    case "fashion": return fashion(w, W, H, uid);
    case "arch": return arch(w, W, H);
    case "interior": return interior(w, W, H, uid);
    case "shoe": return shoe(w, W, H);
    case "jewel": return jewel(w, W, H, uid);
    case "furniture": return furniture(w, W, H, uid);
    case "objects": return objects(w, W, H, uid);
    case "textile": return textile(w, W, H);
  }
}
