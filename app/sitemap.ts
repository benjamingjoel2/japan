import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { journeys } from '@/data/journeys';
import { destinations } from '@/data/destinations';
import { stays } from '@/data/stays';
import { postSlugs } from '@/lib/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics = ['', '/journeys', '/destinations', '/stays', '/seasons', '/blossom-and-leaves', '/quiet-japan', '/about', '/journal', '/plan', '/legal', '/credits'];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p ? 0.7 : 1 })),
    ...journeys.map((j) => ({ url: `${base}/journeys/${j.slug}`, lastModified: now, priority: 0.8 })),
    ...destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, lastModified: now, priority: 0.7 })),
    ...stays.map((s) => ({ url: `${base}/stays/${s.slug}`, lastModified: now, priority: 0.5 })),
    ...postSlugs.map((s) => ({ url: `${base}/journal/${s}`, lastModified: now, priority: 0.6 })),
  ];
}
