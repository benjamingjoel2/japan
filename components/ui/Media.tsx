import Image from 'next/image';
import type { Media as MediaT, Tone } from '@/data/types';

// Generated placeholder art. Each tone is a palette + a motif, seeded by the subject
// so the same shot always draws the same way. Replace by setting `src` on the media.

const palettes: Record<Tone, { bg: [string, string]; ink: string; spot: string }> = {
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

function seeded(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

function Motif({ tone, rand, id }: { tone: Tone; rand: () => number; id: string }) {
  const p = palettes[tone];
  switch (tone) {
    case 'leaf':
    case 'maple':
    case 'blossom': {
      // Dappled light through leaves.
      return (
        <g filter={`url(#blur-${id})`}>
          {Array.from({ length: 26 }, (_, i) => (
            <circle
              key={i}
              cx={rand() * 400}
              cy={rand() * 300}
              r={4 + rand() * 26}
              fill={i % 3 ? p.spot : p.ink}
              opacity={0.15 + rand() * 0.45}
            />
          ))}
        </g>
      );
    }
    case 'mist':
    case 'snow':
    case 'sea': {
      // Layered ridgelines.
      return (
        <g>
          {Array.from({ length: 4 }, (_, i) => {
            const base = 120 + i * 45;
            let d = `M0 ${base}`;
            for (let x = 0; x <= 400; x += 40) d += ` L${x} ${base - rand() * 50}`;
            d += ' L400 300 L0 300 Z';
            return <path key={i} d={d} fill={p.ink} opacity={0.12 + i * 0.12} />;
          })}
        </g>
      );
    }
    case 'cedar': {
      return (
        <g>
          {Array.from({ length: 14 }, (_, i) => {
            const x = rand() * 400;
            const w = 6 + rand() * 18;
            return <rect key={i} x={x} y={0} width={w} height={300} fill={p.ink} opacity={0.3 + rand() * 0.5} />;
          })}
          <rect x="0" y="0" width="400" height="300" fill={`url(#shaft-${id})`} />
        </g>
      );
    }
    case 'lantern':
    case 'night':
    case 'dusk': {
      return (
        <g filter={`url(#blur-${id})`}>
          {Array.from({ length: 7 }, (_, i) => (
            <ellipse
              key={i}
              cx={40 + rand() * 320}
              cy={60 + rand() * 180}
              rx={10 + rand() * 18}
              ry={14 + rand() * 24}
              fill={p.spot}
              opacity={0.25 + rand() * 0.5}
            />
          ))}
        </g>
      );
    }
    case 'stone':
    case 'paper':
    default: {
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx={rand() * 400}
              cy={150 + rand() * 150}
              rx={20 + rand() * 60}
              ry={8 + rand() * 20}
              fill={p.ink}
              opacity={0.15 + rand() * 0.3}
            />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={`r${i}`}
              d={`M0 ${40 + i * 12} Q 200 ${30 + i * 12 + rand() * 20} 400 ${40 + i * 12}`}
              stroke={p.ink}
              strokeOpacity={0.12}
              fill="none"
            />
          ))}
        </g>
      );
    }
  }
}

export function Placeholder({ media, label = true }: { media: MediaT; label?: boolean }) {
  const rand = seeded(media.subject);
  const id = Math.floor(rand() * 1e8).toString(36);
  const p = palettes[media.tone] ?? palettes.paper;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.bg[0] }}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2={rand() > 0.5 ? 1 : 0.3} y2="1">
            <stop offset="0" stopColor={p.bg[1]} />
            <stop offset="1" stopColor={p.bg[0]} />
          </linearGradient>
          <linearGradient id={`shaft-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.spot} stopOpacity="0.35" />
            <stop offset="0.6" stopColor={p.spot} stopOpacity="0" />
          </linearGradient>
          <filter id={`blur-${id}`}>
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`grain-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(rand() * 100)} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          </filter>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${id})`} />
        <Motif tone={media.tone} rand={rand} id={id} />
        <rect width="400" height="300" filter={`url(#grain-${id})`} />
      </svg>
      {label && (
        <span className="pointer-events-none absolute right-2 bottom-2 left-2 font-sans text-[10px] leading-tight tracking-wide text-white/70 uppercase mix-blend-luminosity md:text-[11px]">
          <span className="sr-only">Placeholder image: </span>
          {media.subject}
        </span>
      )}
    </div>
  );
}

type Props = {
  media: MediaT;
  sizes?: string;
  priority?: boolean;
  className?: string;
  label?: boolean;
};

/** Fills its (relative) parent. Real image if `src` is set, otherwise placeholder art. */
export function Media({ media, sizes = '100vw', priority, className = '', label }: Props) {
  if (media.src) {
    return (
      <Image
        src={media.src}
        alt={media.alt ?? media.subject}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div role="img" aria-label={media.alt ?? media.subject} className={`absolute inset-0 ${className}`}>
      <Placeholder media={media} label={label} />
    </div>
  );
}
