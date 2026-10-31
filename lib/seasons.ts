import { microSeasons } from '@/data/seasons';
import type { MicroSeason, MonthDay } from '@/data/types';
import { intlLocale, type Locale } from '@/lib/i18n/config';

const fmtCache = new Map<string, Intl.DateTimeFormat>();
/** Month name in a locale (UTC, so server and browser agree). */
export function monthName(m: number, locale: Locale = 'en', style: 'long' | 'short' = 'long') {
  if (locale === 'en') return style === 'long' ? MONTH_NAMES[m - 1] : MONTH_NAMES[m - 1].slice(0, 3);
  const key = `${locale}:${style}`;
  let f = fmtCache.get(key);
  if (!f) fmtCache.set(key, (f = new Intl.DateTimeFormat(intlLocale[locale], { month: style, timeZone: 'UTC' })));
  const s = f.format(new Date(Date.UTC(2001, m - 1, 15)));
  return s;
}


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Day of a non-leap year, 1–365. Feb 29 folds onto Feb 28. */
export function dayOfYear({ m, d }: MonthDay) {
  const cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  return cum[m - 1] + Math.min(d, m === 2 ? 28 : 31);
}

export function formatMonthDay(md: MonthDay, locale: Locale = 'en') {
  return locale === 'en' ? `${md.d} ${MONTHS[md.m - 1]}` : `${md.d}${locale === 'de' ? '.' : ''} ${monthName(md.m, locale, 'short')}`;
}

export function formatRange(a: MonthDay, b: MonthDay, locale: Locale = 'en') {
  if (a.m !== b.m) return `${formatMonthDay(a, locale)} – ${formatMonthDay(b, locale)}`;
  return locale === 'en' ? `${a.d}–${b.d} ${MONTHS[a.m - 1]}` : `${a.d}${locale === 'de' ? '.' : ''}–${formatMonthDay(b, locale)}`;
}

function inRange(doy: number, s: MicroSeason) {
  const a = dayOfYear(s.start);
  const b = dayOfYear(s.end);
  return a <= b ? doy >= a && doy <= b : doy >= a || doy <= b;
}

/** Today's micro-season in Japan time. */
export function getMicroSeason(date = new Date()): MicroSeason {
  const jst = new Date(date.getTime() + 9 * 3600_000);
  const md = { m: (jst.getUTCMonth() + 1) as MonthDay['m'], d: jst.getUTCDate() };
  const doy = dayOfYear(md);
  return microSeasons.find((s) => inRange(doy, s)) ?? microSeasons[0];
}

/** Micro-seasons overlapping a given month. */
export function seasonsInMonth(month: number): MicroSeason[] {
  const a = dayOfYear({ m: month as MonthDay['m'], d: 1 });
  const b = dayOfYear({ m: month as MonthDay['m'], d: 28 });
  return microSeasons.filter((s) => inRange(a, s) || inRange(b, s) || (dayOfYear(s.start) >= a && dayOfYear(s.start) <= b));
}

/** Micro-season numbers a journey's best months pass through. */
export function seasonsForMonths(months: number[]): MicroSeason[] {
  const set = new Map<number, MicroSeason>();
  months.forEach((m) => seasonsInMonth(m).forEach((s) => set.set(s.n, s)));
  return [...set.values()].sort((x, y) => dayOfYear(x.start) - dayOfYear(y.start));
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
