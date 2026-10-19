'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { quietPairings } from '@/data/quiet';
import type { QuietPairing } from '@/data/types';
import { JapanMap, project } from './JapanMap';
import { VerifyTag } from '@/components/ui/Tags';

const kinds: { id: QuietPairing['kind'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'timing', label: 'Better timing' },
  { id: 'alternative', label: 'Quieter alternative' },
  { id: 'route', label: 'Another route' },
];

export function QuietExplorer({ destinationNames }: { destinationNames: Record<string, string> }) {
  const regions = useMemo(() => ['All', ...Array.from(new Set(quietPairings.map((p) => p.region)))], []);
  const [region, setRegion] = useState('All');
  const [kind, setKind] = useState<(typeof kinds)[number]['id']>('all');
  const [hover, setHover] = useState<string | null>(null);
  const list = quietPairings.filter((p) => (region === 'All' || p.region === region) && (kind === 'all' || p.kind === kind));

  return (
    <div>
      <div className="sticky top-[var(--header-h)] z-20 -mx-[var(--gutter)] flex flex-wrap items-center gap-3 border-y border-line bg-washi/95 px-gutter py-3 backdrop-blur">
        <label className="flex items-center gap-2 text-[14px]">
          <span className="text-moss">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full border border-line bg-washi px-3 py-1.5"
          >
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <div role="radiogroup" aria-label="Kind of tip" className="flex flex-wrap rounded-full border border-line p-0.5">
          {kinds.map((k) => (
            <button
              key={k.id}
              type="button"
              role="radio"
              aria-checked={kind === k.id}
              onClick={() => setKind(k.id)}
              className={`rounded-full px-3 py-1.5 text-[13px] ${kind === k.id ? 'bg-sumi text-washi' : 'text-sumi-soft'}`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-moss" aria-live="polite">
          {list.length} pairings
        </span>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-grid">
        <figure className="lg:sticky lg:top-[calc(var(--header-h)+5rem)] lg:self-start">
          <JapanMap className="mx-auto h-auto w-full max-w-[32rem] text-sumi" title="Map of Quiet Japan pairings">
            {list.map((p) => {
              const [x, y] = project(p.lat, p.lng);
              const on = hover === p.id;
              return (
                <a key={p.id} href={`#${p.id}`} aria-label={p.quieter} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>
                  <circle cx={x} cy={y} r={on ? 16 : 10} fill={on ? 'var(--color-beni)' : 'var(--color-moss)'} stroke="var(--color-washi)" strokeWidth={3} />
                  {on && (
                    <text x={x + 20} y={y + 8} fontSize={24} fill="currentColor" stroke="var(--color-washi)" strokeWidth={6} paintOrder="stroke">
                      {p.quieter.split(',')[0]}
                    </text>
                  )}
                </a>
              );
            })}
          </JapanMap>
          <figcaption className="mt-3 text-[13px] text-sumi-soft">Hover a pin or a card to match them up.</figcaption>
        </figure>

        <ul className="flex flex-col">
          {list.map((p) => (
            <li
              key={p.id}
              id={p.id}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              className={`scroll-mt-[calc(var(--header-h)+5rem)] border-t border-line py-6 transition-colors ${hover === p.id ? 'bg-washi-deep/50' : ''}`}
            >
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-moss">
                <span className="uppercase tracking-wide">{kinds.find((k) => k.id === p.kind)?.label}</span>
                <span>·</span>
                <Link href={`/destinations/${p.destination}`} className="underline-offset-4 hover:underline">
                  {destinationNames[p.destination]}
                </Link>
                <VerifyTag />
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2 md:gap-grid">
                <div>
                  <p className="text-[12px] text-sumi-soft uppercase">Instead of</p>
                  <p className="text-[17px] text-sumi-soft line-through decoration-moss-light decoration-1">{p.famous}</p>
                </div>
                <div>
                  <p className="text-[12px] text-moss uppercase">Try</p>
                  <p className="font-display text-[24px] leading-tight lg:text-[1.6vw]">{p.quieter}</p>
                </div>
              </div>
              {p.betterTiming && <p className="mt-3 text-[15px]">{p.betterTiming}</p>}
              <p className="mt-2 max-w-[60ch] text-[15px] text-sumi-soft">{p.why}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
