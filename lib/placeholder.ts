import type { Tone } from '@/data/types';

// Generated placeholder art, served as cached SVG files from /ph/<tone>/<seed>.
// Each tone is a palette + a motif; the seed (a hash of the shot's subject) makes the same
// shot always draw the same way. Replace by setting `src` on the media item.

export const palettes: Record<Tone, { bg: [string, string]; ink: string; spot: string }> = {
  leaf: { bg: ['#4f5b3c', '#c9c48c'], ink: '#2f3826', spot: '#f1e7b8' },
  mist: { bg: ['#9aa39a', '#dcdcd2'], ink: '#6c766f', spot: '#f2f1ea' },
  dusk: { bg: ['#3c3a4a', '#c98f6b'], ink: '#2a2834', spot: '#f0c49a' },
  night: { bg: ['#141a1d', '#33403f'], ink: '#0b0f11', spot: '#d9b56e' },
  blossom: { bg: ['#d9b9b4', '#f4e6df'], ink: '#9b6b6a', spot: '#fff5f1' },
  maple: { bg: ['#6b2a1c', '#d9844a'], ink: '#3d150d', spot: '#f3c27a' },
  snow: { bg: ['#c9d1d4', '#f5f6f3'], ink: '#8e9aa0', spot: '#ffffff' },
  sea: { bg: ['#2f5560', '#a9c6c1'], ink: '#1c3a42', spot: '#e6f0ea' },
  stone: { bg: ['#6f6a60', '#c8c1b2'], ink: '#4a463f', spot: '#ebe5d6' },
  cedar: { bg: ['#1f2c22', '#5e6d4a'], ink: '#111a14', spot: '#c7c99a' },
  lantern: { bg: ['#2b1d16', '#a5552f'], ink: '#1a110c', spot: '#f6c26b' },
  paper: { bg: ['#e7dfcd', '#f6f1e6'], ink: '#b6ab92', spot: '#fffaf0' },
};

export const tones = Object.keys(palettes) as Tone[];

/** Short stable hash of a string, base 36. */
export function seedOf(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function rng(seed: string) {
  let h = parseInt(seed, 36) || 1;
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

function motif(tone: Tone, r: () => number) {
  const p = palettes[tone];
  switch (tone) {
    case 'leaf':
    case 'maple':
    case 'blossom':
      return `<g filter="url(#b)">${Array.from(
        { length: 26 },
        (_, i) =>
          `<circle cx="${n(r() * 400)}" cy="${n(r() * 300)}" r="${n(4 + r() * 26)}" fill="${i % 3 ? p.spot : p.ink}" opacity="${n(0.15 + r() * 0.45)}"/>`,
      ).join('')}</g>`;
    case 'mist':
    case 'snow':
    case 'sea':
      return Array.from({ length: 4 }, (_, i) => {
        const base = 120 + i * 45;
        let d = `M0 ${base}`;
        for (let x = 0; x <= 400; x += 40) d += ` L${x} ${n(base - r() * 50)}`;
        return `<path d="${d} L400 300 L0 300 Z" fill="${p.ink}" opacity="${n(0.12 + i * 0.12)}"/>`;
      }).join('');
    case 'cedar':
      return (
        Array.from(
          { length: 14 },
          () => `<rect x="${n(r() * 400)}" y="0" width="${n(6 + r() * 18)}" height="300" fill="${p.ink}" opacity="${n(0.3 + r() * 0.5)}"/>`,
        ).join('') + `<rect width="400" height="300" fill="url(#s)"/>`
      );
    case 'lantern':
    case 'night':
    case 'dusk':
      return `<g filter="url(#b)">${Array.from(
        { length: 7 },
        () =>
          `<ellipse cx="${n(40 + r() * 320)}" cy="${n(60 + r() * 180)}" rx="${n(10 + r() * 18)}" ry="${n(14 + r() * 24)}" fill="${p.spot}" opacity="${n(0.25 + r() * 0.5)}"/>`,
      ).join('')}</g>`;
    default:
      return (
        Array.from(
          { length: 9 },
          () =>
            `<ellipse cx="${n(r() * 400)}" cy="${n(150 + r() * 150)}" rx="${n(20 + r() * 60)}" ry="${n(8 + r() * 20)}" fill="${p.ink}" opacity="${n(0.15 + r() * 0.3)}"/>`,
        ).join('') +
        Array.from(
          { length: 12 },
          (_, i) =>
            `<path d="M0 ${40 + i * 12} Q 200 ${n(30 + i * 12 + r() * 20)} 400 ${40 + i * 12}" stroke="${p.ink}" stroke-opacity="0.12" fill="none"/>`,
        ).join('')
      );
  }
}

export function placeholderSvg(tone: Tone, seed: string) {
  const p = palettes[tone];
  const r = rng(seed);
  const x2 = r() > 0.5 ? 1 : 0.3;
  const grainSeed = Math.floor(r() * 100);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="${x2}" y2="1"><stop offset="0" stop-color="${p.bg[1]}"/><stop offset="1" stop-color="${p.bg[0]}"/></linearGradient><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.spot}" stop-opacity="0.35"/><stop offset="0.6" stop-color="${p.spot}" stop-opacity="0"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="6"/></filter><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${grainSeed}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0"/></filter></defs><rect width="400" height="300" fill="url(#g)"/>${motif(tone, r)}<rect width="400" height="300" filter="url(#n)"/></svg>`;
}
