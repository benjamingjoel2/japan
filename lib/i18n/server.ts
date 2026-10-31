import { cache } from 'react';
import { localizeHref, makeT, makeTx, isLocale, type Locale, type Messages } from './config';
import fr from '@/i18n/fr.json';
import de from '@/i18n/de.json';
import es from '@/i18n/es.json';
import clientKeys from '@/i18n/client-keys.json';

// Server-side translation. The locale of the page being rendered is kept in a per-request
// store: layouts, pages and generateMetadata call setLocale() with the [locale] param.
const dicts: Record<Locale, Messages | undefined> = { en: undefined, fr, de, es };

const store = cache(() => ({ locale: 'en' as Locale }));

export function setLocale(l: unknown) {
  store().locale = isLocale(l) ? l : 'en';
  return store().locale;
}

/** Reads `locale` from route params (absent on English routes) and makes it current. */
export async function initLocale(params?: Promise<Record<string, string | string[] | undefined>>) {
  const p = params ? await params : {};
  return setLocale(p.locale);
}

export function getLocale(): Locale {
  return store().locale;
}

export function t(s: string, vars?: Record<string, string | number>) {
  return makeT(dicts[getLocale()])(s, vars);
}

export function tx<T>(v: T): T {
  return makeTx(dicts[getLocale()])(v);
}

/** Internal href in the current locale. */
export function lhref(href: string) {
  return localizeHref(href, getLocale());
}

/** The small set of translations client components need (their own UI strings). */
export function clientMessages(locale: Locale): Messages | undefined {
  const d = dicts[locale];
  if (!d) return undefined;
  const out: Messages = {};
  for (const k of clientKeys as string[]) if (d[k]) out[k] = d[k];
  return out;
}
