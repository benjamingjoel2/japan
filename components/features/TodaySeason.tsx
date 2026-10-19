'use client';

import { useEffect, useState } from 'react';
import { getMicroSeason } from '@/lib/seasons';

/** Marks today's micro-season card and offers a jump link. Runs on the client so a cached page stays current. */
export function TodaySeason() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const s = getMicroSeason();
    setN(s.n);
    const el = document.getElementById(`ko-${s.n}`);
    el?.setAttribute('data-today', 'true');
    const badge = el?.querySelector('[data-today-badge]');
    badge?.removeAttribute('hidden');
  }, []);
  if (!n) return null;
  return (
    <a href={`#ko-${n}`} className="inline-flex items-center gap-2 rounded-full bg-sumi px-4 py-2 text-label text-washi">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-beni" /> Jump to today&rsquo;s season (no. {n})
    </a>
  );
}
