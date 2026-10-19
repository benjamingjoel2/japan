'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useIsClient, useNow } from '@/lib/hooks';
import { getMicroSeason } from '@/lib/seasons';
import { KYOTO, formatMinutes, sunTimes } from '@/lib/sun';

function tokyoParts(d: Date) {
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false });
  const [h, m] = f.format(d).split(':');
  return { h, m };
}

/** Live Tokyo clock with a blinking colon. Renders a stable placeholder on the server. */
export function TokyoClock() {
  const now = useNow(15_000);
  if (!now) return <span className="tabular-nums">--:--</span>;
  const { h, m } = tokyoParts(now);
  return (
    <time dateTime={now.toISOString()} className="tabular-nums" aria-label={`${h}:${m} in Tokyo`}>
      {h}
      <span className="blink" aria-hidden="true">
        :
      </span>
      {m}
    </time>
  );
}

export function KyotoSunrise() {
  const client = useIsClient();
  const t = useMemo(() => (client ? formatMinutes(sunTimes(new Date(), KYOTO.lat, KYOTO.lng, 9).sunrise) : null), [client]);
  return <span className="tabular-nums">{t ?? '--:--'}</span>;
}

/** Today's micro-season (computed in Japan time on the client so it never goes stale in a cached page). */
export function MicroSeasonNow({ withLink = true, className = '' }: { withLink?: boolean; className?: string }) {
  const client = useIsClient();
  const s = useMemo(() => (client ? getMicroSeason() : null), [client]);
  if (!s) return <span className={className}>&nbsp;</span>;
  const body = (
    <>
      <span lang="ja" className="font-jp">
        {s.ja}
      </span>{' '}
      <span>{s.en}</span>
    </>
  );
  return withLink ? (
    <Link href={`/seasons#ko-${s.n}`} className={`underline-offset-4 hover:underline ${className}`}>
      {body}
    </Link>
  ) : (
    <span className={className}>{body}</span>
  );
}
