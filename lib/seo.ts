import type { Metadata } from 'next';
import { site } from '@/config/site';

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${site.name}`, description, url: path, siteName: site.name, type: 'website' },
  };
}
