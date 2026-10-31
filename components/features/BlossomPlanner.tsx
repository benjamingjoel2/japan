'use client';

import Link from '@/components/i18n/Link';
import { useMemo, useState } from 'react';
import { useT } from '@/components/i18n/I18nProvider';
import { msg } from '@/lib/i18n/config';
import type { BlossomRegion, MonthDay } from '@/data/types';
import { dayOfYear, formatMonthDay, formatRange, monthName } from '@/lib/seasons';
import { JapanMap, project } from './JapanMap';

type Mode = 'blossom' | 'leaves';

const MODES: Record<Mode, { label: string; color: string; span: [number, number]; def: number; verb: string }> = {
  // span: chart range in day-of-year; def: default slider position
  blossom: { label: msg('Cherry blossom'), color: 'var(--color-blossom)', span: [1, 151], def: 88, verb: msg('in bloom') },
  leaves: { label: msg('Autumn leaves'), color: 'var(--color-koyo)', span: [244, 365], def: 320, verb: msg('at peak colour') },
};

const nominal = (r: BlossomRegion, mode: Mode) => mode === 'leaves' && r.id === 'okinawa';

function fromDoy(doy: number): MonthDay {
  const cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  const m = cum.findIndex((c, i) => doy > c && doy <= cum[i + 1]);
  return { m: (m + 1) as MonthDay['m'], d: doy - cum[m] };
}

function state(r: BlossomRegion, mode: Mode, doy: number) {
  const w = r[mode];
  const a = dayOfYear(w.from);
  const b = dayOfYear(w.to);
  if (doy >= a && doy <= b) return 'now';
  if (doy < a) return a - doy <= 14 ? 'soon' : 'later';
  return 'past';
}

export function BlossomPlanner({
  regions: blossomRegions,
  journeyTitles,
  destinationNames,
}: {
  regions: BlossomRegion[];
  journeyTitles: Record<string, string>;
  destinationNames: Record<string, string>;
}) {
  const { t, locale } = useT();
  const [mode, setModeState] = useState<Mode>('blossom');
  const cfg = MODES[mode];
  const [doy, setDoy] = useState(cfg.def);
  const setMode = (m: Mode) => {
    setModeState(m);
    setDoy(MODES[m].def);
  };
  const [hover, setHover] = useState<string | null>(null);

  // Blossom travels south → north, leaves north → south: sort so the wave reads top to bottom.
  const rows = useMemo(
    () => [...blossomRegions].sort((a, b) => dayOfYear(a[mode].from) - dayOfYear(b[mode].from)),
    [mode, blossomRegions],
  );
  const [s0, s1] = cfg.span;
  const pct = (d: number) => ((Math.min(Math.max(d, s0), s1) - s0) / (s1 - s0)) * 100;
  const months = Array.from({ length: 12 }, (_, i) => ({ i, doy: dayOfYear({ m: (i + 1) as MonthDay['m'], d: 1 }) })).filter(
    (m) => m.doy >= s0 && m.doy <= s1,
  );
  const date = fromDoy(doy);
  const nowCount = rows.filter((r) => !nominal(r, mode) && state(r, mode, doy) === 'now').length;

  return (
    <div>
      {/* Controls: one row above the charts. */}
      <div className="sticky top-[var(--header-h)] z-20 -mx-[var(--gutter)] flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line bg-washi/95 px-gutter py-3 backdrop-blur">
        <div role="radiogroup" aria-label={t('Season')} className="flex rounded-full border border-line p-0.5">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[14px] ${mode === m ? 'bg-sumi text-washi' : 'text-sumi-soft'}`}
            >
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: MODES[m].color }} />
              {t(MODES[m].label)}
            </button>
          ))}
        </div>
        <label className="flex min-w-[16rem] flex-1 items-center gap-3 text-[14px]">
          <span className="shrink-0 text-moss">{t('Travel date')}</span>
          <input
            type="range"
            min={s0}
            max={s1}
            value={doy}
            onChange={(e) => setDoy(+e.target.value)}
            className="w-full accent-[var(--color-sumi)]"
            aria-valuetext={locale === 'en' ? `${date.d} ${monthName(date.m)}` : formatMonthDay(date, locale)}
          />
          <output className="w-24 shrink-0 text-right font-medium tabular-nums">
            {formatMonthDay(date, locale)}
          </output>
        </label>
        <p className="text-[14px] text-sumi-soft" aria-live="polite">
          {t('Typically {state} around then:', { state: t(cfg.verb) })} <strong className="text-sumi">{nowCount}</strong>{' '}
          {t('of {n} regions', { n: rows.length })}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-grid">
        {/* Map */}
        <figure className="lg:sticky lg:top-[calc(var(--header-h)+5rem)] lg:self-start">
          <JapanMap className="mx-auto h-auto w-full max-w-[34rem] text-sumi" title={t('Map of Japan showing where {thing} is typically {state} on the chosen date', { thing: t(cfg.label).toLowerCase(), state: t(cfg.verb) })}>
            {rows.map((r) => {
              const [x, y] = project(r.lat, r.lng);
              const st = nominal(r, mode) ? 'nominal' : state(r, mode, doy);
              const on = hover === r.id;
              return (
                <g key={r.id} onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}>
                  {st === 'now' && <circle cx={x} cy={y} r={30} fill={cfg.color} opacity={0.2} className="motion-safe:animate-pulse" />}
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 15 : 11}
                    fill={st === 'now' ? cfg.color : st === 'soon' ? 'var(--color-washi)' : 'var(--color-washi-deep)'}
                    stroke={st === 'past' || st === 'nominal' ? 'var(--color-moss-light)' : cfg.color}
                    strokeWidth={st === 'soon' ? 4 : 2}
                    strokeDasharray={st === 'nominal' ? '4 4' : undefined}
                  />
                  {(on || st === 'now') && (
                    <text x={x + 20} y={y + 8} fontSize={24} fill="currentColor" stroke="var(--color-washi)" strokeWidth={6} paintOrder="stroke">
                      {r.name}
                    </text>
                  )}
                </g>
              );
            })}
          </JapanMap>
          <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-sumi-soft">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: cfg.color }} /> {t('Typically {state}', { state: t(cfg.verb) })}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2" style={{ borderColor: cfg.color }} /> {t('Within two weeks')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-moss-light bg-washi-deep" /> {t('Later or past')}
            </span>
          </figcaption>
        </figure>

        {/* Timeline: the wave */}
        <figure>
          <figcaption className="mb-3 flex items-center justify-between text-[13px] text-sumi-soft">
            <span>
              {t(cfg.label)}: {mode === 'blossom' ? t('typical windows by region, south to north') : t('typical windows by region, north to south')}
            </span>
          </figcaption>
          <div className="relative">
            {/* Month grid */}
            <div aria-hidden="true" className="absolute inset-y-0 right-0 left-[38%] md:left-[30%]">
              {months.map((m) => (
                <div key={m.i} className="absolute inset-y-0 border-l border-line" style={{ left: `${pct(m.doy)}%` }}>
                  <span className="absolute -top-5 left-1 text-[11px] text-moss">{monthName(m.i + 1, locale, 'short')}</span>
                </div>
              ))}
              <div className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-sumi" style={{ left: `${pct(doy)}%` }} />
            </div>
            <ul className="relative pt-6">
              {rows.map((r) => {
                const w = r[mode];
                const a = dayOfYear(w.from);
                const b = dayOfYear(w.to);
                const nom = nominal(r, mode);
                const on = hover === r.id;
                return (
                  <li
                    key={r.id}
                    className={`grid grid-cols-[38%_1fr] items-center border-b border-line/60 py-2 md:grid-cols-[30%_1fr] ${on ? 'bg-washi-deep/60' : ''}`}
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className="pr-3 text-[14px] leading-tight">
                      {r.name}
                      <span className="block text-[12px] text-moss">{r.area}</span>
                    </span>
                    <span className="relative h-7">
                      <span
                        className="absolute top-1/2 h-3 -translate-y-1/2 rounded-[4px]"
                        style={{
                          left: `${pct(a)}%`,
                          width: `max(6px, ${pct(b) - pct(a)}%)`,
                          background: nom ? 'transparent' : cfg.color,
                          border: nom ? `1.5px dashed var(--color-moss-light)` : undefined,
                        }}
                      />
                      <span
                        className="absolute top-1/2 -translate-y-1/2 pl-2 text-[12px] whitespace-nowrap text-sumi-soft tabular-nums"
                        style={pct(b) > 72 ? { right: `${100 - pct(a)}%`, paddingRight: 8 } : { left: `${pct(b)}%` }}
                      >
                        {formatRange(w.from, w.to, locale)}
                        {nom ? ` (${t('nominal')})` : ''}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </figure>
      </div>

      {/* Region notes: the table view, with links */}
      <h2 className="mt-16 mb-2 text-h3">{t('Region by region')}</h2>
      <ul className="mt-4 grid gap-x-[var(--gap)] md:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => (
          <li key={r.id} className="border-t border-line py-5">
            <h3 className="font-display text-[26px] leading-tight">
              {r.name} <span className="text-[0.6em] text-moss">{r.area}</span>
            </h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-[14px]">
              <div>
                <dt className="flex items-center gap-1.5 text-moss">
                  <span className="size-2 rounded-full" style={{ background: MODES.blossom.color }} /> {t('Blossom')}
                </dt>
                <dd className="tabular-nums">{formatRange(r.blossom.from, r.blossom.to, locale)}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-moss">
                  <span className="size-2 rounded-full" style={{ background: MODES.leaves.color }} /> {t('Leaves')}
                </dt>
                <dd className="tabular-nums">{formatRange(r.leaves.from, r.leaves.to, locale)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[15px] text-sumi-soft">{r.note}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.destinations.map((d) => (
                <Link key={d} href={`/destinations/${d}`} className="rounded-full border border-line px-2.5 py-1 text-[12px] hover:bg-sumi hover:text-washi">
                  {destinationNames[d]}
                </Link>
              ))}
              {r.journeys.map((j) => (
                <Link key={j} href={`/journeys/${j}`} className="rounded-full bg-sumi/5 px-2.5 py-1 text-[12px] hover:bg-sumi hover:text-washi">
                  {journeyTitles[j]}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
