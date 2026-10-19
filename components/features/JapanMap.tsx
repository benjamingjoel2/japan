import { JAPAN_PATH, JAPAN_VIEWBOX, project } from '@/lib/japan-geo';
import type { ReactNode } from 'react';

export type MapPoint = { id: string; lat: number; lng: number; label?: string };

/**
 * Stylised map of Japan from Natural Earth data. Children are drawn in map coordinates
 * (use `project(lat, lng)`), so feature pages can layer their own marks on top.
 */
export function JapanMap({
  points = [],
  highlight,
  className = '',
  land = 'var(--color-washi-deep)',
  stroke = 'var(--color-moss-light)',
  dot = 'var(--color-beni)',
  title = 'Map of Japan',
  children,
  crop,
}: {
  points?: MapPoint[];
  highlight?: string;
  className?: string;
  land?: string;
  stroke?: string;
  dot?: string;
  title?: string;
  children?: ReactNode;
  /** Optional viewBox crop [x, y, w, h] in map units. */
  crop?: [number, number, number, number];
}) {
  const vb = crop ?? [0, 0, JAPAN_VIEWBOX.w, JAPAN_VIEWBOX.h];
  return (
    <svg viewBox={vb.join(' ')} className={className} role="img" aria-label={title}>
      <path d={JAPAN_PATH} fill={land} stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />
      {points.map((p) => {
        const [x, y] = project(p.lat, p.lng);
        const on = highlight === p.id;
        return (
          <g key={p.id}>
            {on && <circle cx={x} cy={y} r={22} fill={dot} opacity={0.18} />}
            <circle cx={x} cy={y} r={on ? 9 : 6} fill={dot} />
            {p.label && on && (
              <text x={x + 16} y={y + 6} fontSize={26} fill="currentColor" className="font-sans">
                {p.label}
              </text>
            )}
          </g>
        );
      })}
      {children}
    </svg>
  );
}

export { project };
