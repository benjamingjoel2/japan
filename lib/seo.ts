import type { Metadata } from 'next';
import { site } from '@/config/site';
import { locales, localizeHref, ogLocale } from '@/lib/i18n/config';
import { getLocale, t } from '@/lib/i18n/server';

/** hreflang alternates (en, fr, de, es, x-default) and the canonical for a path in the current locale. */
export function alternatesFor(path: string): Metadata['alternates'] {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, localizeHref(path, l)]));
  languages['x-default'] = path;
  return { canonical: localizeHref(path, getLocale()), languages };
}

/** Page metadata. Title and description are English source strings, translated here. */
export function pageMeta({ title, description, path, raw }: { title: string; description: string; path: string; raw?: boolean }): Metadata {
  const tt = raw ? title : t(title);
  const dd = raw ? description : t(description);
  const url = localizeHref(path, getLocale());
  return {
    title: tt,
    description: dd,
    alternates: alternatesFor(path),
    openGraph: { title: `${tt} · ${site.name}`, description: dd, url, siteName: site.name, type: 'website', locale: ogLocale[getLocale()] },
  };
}
