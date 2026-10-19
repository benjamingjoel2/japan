import type { ComponentType } from 'react';
import type { Tone } from '@/data/types';

export type PostMeta = { title: string; description: string; date: string; readingMinutes: number; tone: Tone };
export type Post = PostMeta & { slug: string };

// Order of the journal index. Add a slug here when you add a file in /content/journal.
export const postSlugs = [
  'your-first-night-in-a-ryokan',
  'kyoto-without-the-crowds',
  'japans-72-seasons-explained',
  'walking-the-kumano-kodo',
] as const;

async function load(slug: string) {
  const mod = (await import(`@/content/journal/${slug}.mdx`)) as { default: ComponentType; meta: PostMeta };
  return mod;
}

export async function getPost(slug: string) {
  if (!postSlugs.includes(slug as (typeof postSlugs)[number])) return null;
  const mod = await load(slug);
  return { slug, ...mod.meta, Content: mod.default };
}

export async function getPosts(): Promise<Post[]> {
  const all = await Promise.all(postSlugs.map(async (slug) => ({ slug, ...(await load(slug)).meta })));
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
