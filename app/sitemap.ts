import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { journeys } from '@/data/journeys';
import { destinations } from '@/data/destinations';
import { stays } from '@/data/stays';
import { postSlugs } from '@/lib/journal';
import { locales, localizeHref } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics = ['/', '/journeys', '/destinations', '/stays', '/seasons', '/blossom-and-leaves', '/quiet-japan', '/about', '/journal', '/plan', '/privacy', '/booking-terms', '/cookies'];
  const paths: [string, number][] = [
    ...statics.map((p): [string, number] => [p, p === '/' ? 1 : 0.7]),
    ...journeys.map((j): [string, number] => [`/journeys/${j.slug}`, 0.8]),
    ...destinations.map((d): [string, number] => [`/destinations/${d.slug}`, 0.7]),
    ...stays.map((s): [string, number] => [`/stays/${s.slug}`, 0.5]),
    ...postSlugs.map((s): [string, number] => [`/journal/${s}`, 0.6]),
  ];
  const url = (p: string) => `${base}${p === '/' ? '' : p}`.replace(/(\.com)(\/(fr|de|es))\/$/, '$1$2');
  return paths.flatMap(([p, priority]) => {
    const languages = Object.fromEntries([...locales.map((l) => [l, url(localizeHref(p, l))]), ['x-default', url(p)]]);
    return locales.map((l) => ({ url: url(localizeHref(p, l)), lastModified: now, priority, alternates: { languages } }));
  });
}
