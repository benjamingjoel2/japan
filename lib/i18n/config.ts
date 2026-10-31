// Locale settings shared by server and client code. English is the default and lives at the
// root URLs; French, German and Spanish live under /fr, /de and /es.

export const locales = ['en', 'fr', 'de', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const otherLocales = ['fr', 'de', 'es'] as const;

export const htmlLang: Record<Locale, string> = { en: 'en-GB', fr: 'fr', de: 'de', es: 'es' };
export const intlLocale: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR', de: 'de-DE', es: 'es-ES' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };
export const localeNames: Record<Locale, string> = { en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español' };

export type Messages = Record<string, string>;

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (locales as readonly string[]).includes(v);
}

/** Locale of a pathname: the first segment when it is fr/de/es, otherwise English. */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return isLocale(seg) && seg !== 'en' ? seg : 'en';
}

/** Pathname without its locale prefix ("/fr/journeys" -> "/journeys", "/fr" -> "/"). */
export function stripLocale(pathname: string) {
  const l = localeFromPath(pathname);
  if (l === 'en') return pathname || '/';
  const rest = pathname.slice(l.length + 1);
  return rest || '/';
}

/** Points an internal href at the same page in `locale`. External links, anchors, API and asset paths are untouched. */
export function localizeHref(href: string, locale: Locale) {
  if (locale === 'en' || !href.startsWith('/') || href.startsWith('//')) return href;
  if (/^\/(api|ph|_next|captions|icon|opengraph-image)(\/|$|\.)/.test(href)) return href;
  if (localeFromPath(href) !== 'en') return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  const path = m[1] === '/' ? '' : m[1];
  return `/${locale}${path}${m[2]}`;
}

/** Translate one string. Unknown strings fall back to English. `{name}` placeholders are filled from `vars`. */
export function makeT(messages?: Messages) {
  return function t(s: string, vars?: Record<string, string | number>) {
    let r = (messages && messages[s]) || s;
    if (vars) r = r.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
    return r;
  };
}

// Fields that hold identifiers, lookups or Japanese text, never visible English copy.
export const SKIP_KEYS = new Set([
  'slug', 'tone', 'subject', 'src', 'video', 'captions', 'id', 'destination', 'destinations', 'journeys',
  'stays', 'stay', 'type', 'bath', 'sleeping', 'kind', 'ja', 'romaji', 'sekki', 'photo', 'photographer',
  'href',
]);

/** Deep-translate a data structure: every string value outside SKIP_KEYS is looked up. */
export function makeTx(messages?: Messages) {
  const t = makeT(messages);
  const walk = (v: unknown, key?: string): unknown => {
    if (!messages) return v;
    if (typeof v === 'string') return key && SKIP_KEYS.has(key) ? v : t(v);
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === 'object') {
      if (key && SKIP_KEYS.has(key)) return v;
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
    }
    return v;
  };
  return <T,>(v: T): T => walk(v) as T;
}

/** Marks an English string for translation where it is defined (it is translated where it is shown). */
export const msg = (s: string) => s;
