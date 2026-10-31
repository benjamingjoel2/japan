import type { ComponentType } from 'react';
import type { Tone } from '@/data/types';
import { intlLocale, type Locale } from '@/lib/i18n/config';

export type PostMeta = { title: string; description: string; date: string; readingMinutes: number; tone: Tone };
export type Post = PostMeta & { slug: string; subject: string };

// Order of the journal index. Add a slug here when you add a file in /content/journal
// (English) and its translations in /content/journal/{fr,de,es}.
export const postSlugs = [
  'your-first-night-in-a-ryokan',
  'kyoto-without-the-crowds',
  'japans-72-seasons-explained',
  'walking-the-kumano-kodo',
] as const;

type Mod = { default: ComponentType; meta: PostMeta };

async function load(slug: string, locale: Locale): Promise<Mod> {
  if (locale === 'en') return (await import(`@/content/journal/${slug}.mdx`)) as Mod;
  return (await import(`@/content/journal/${locale}/${slug}.mdx`)) as Mod;
}

export async function getPost(slug: string, locale: Locale = 'en') {
  if (!postSlugs.includes(slug as (typeof postSlugs)[number])) return null;
  const [mod, en] = await Promise.all([load(slug, locale), load(slug, 'en')]);
  // `subject` (the English title) picks the photo, so every language shows the same one.
  return { slug, ...mod.meta, subject: en.meta.title, Content: mod.default };
}

export async function getPosts(locale: Locale = 'en'): Promise<Post[]> {
  const all = await Promise.all(
    postSlugs.map(async (slug) => {
      const p = (await getPost(slug, locale))!;
      return { slug, title: p.title, description: p.description, date: p.date, readingMinutes: p.readingMinutes, tone: p.tone, subject: p.subject };
    }),
  );
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string, locale: Locale = 'en') {
  return new Date(iso).toLocaleDateString(intlLocale[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
