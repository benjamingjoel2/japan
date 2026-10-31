import { initLocale, lhref, t } from '@/lib/i18n/server';
import { htmlLang, ogLocale } from '@/lib/i18n/config';
import Link from '@/components/i18n/Link';
import { notFound } from 'next/navigation';
import { formatDate, getPost, getPosts, postSlugs } from '@/lib/journal';
import { pageMeta } from '@/lib/seo';
import { site } from '@/config/site';
import { Media } from '@/components/ui/Media';
import { HeadingWords } from '@/components/ui/HeadingWords';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  const locale = await initLocale(params);
  const p = await getPost((await params).slug, locale);
  if (!p) return {};
  return {
    ...pageMeta({ title: p.title, description: p.description, path: `/journal/${p.slug}`, raw: true }),
    openGraph: { type: 'article', title: p.title, description: p.description, publishedTime: p.date, locale: ogLocale[locale] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  const locale = await initLocale(params);
  const p = await getPost((await params).slug, locale);
  if (!p) notFound();
  const { Content } = p;
  const more = (await getPosts(locale)).filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: p.title,
          inLanguage: htmlLang[locale],
          description: p.description,
          datePublished: p.date,
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: `${site.url}${lhref(`/journal/${p.slug}`)}`,
        }}
      />
      <header className="px-gutter pt-[calc(var(--header-h)+48px)] pb-10 lg:pt-[calc(var(--header-h)+5vw)]">
        <p className="label mb-4">
          <Link href="/journal" className="hover:underline">
            {t('Journal')}
          </Link>{' '}
          · <time dateTime={p.date}>{formatDate(p.date, locale)}</time> · {t('{n} min read', { n: p.readingMinutes })}
        </p>
        <HeadingWords text={p.title} className="max-w-[18ch] text-h2" />
        <p className="mt-5 max-w-[40ch] text-lead">{p.description}</p>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-media md:aspect-[21/9]">
          <Media media={{ subject: p.subject, tone: p.tone }} sizes="100vw" priority />
        </div>
      </header>
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[1fr_40rem_1fr]">
        <div className="prose-k lg:col-start-2">
          <Content />
        </div>
      </div>
      <footer className="border-t border-line px-gutter py-section">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[30ch] text-lead">{t('Want us to plan something like this for you?')}</p>
          <Button href="/plan">{t('Plan with us')}</Button>
        </div>
        <h2 className="label mb-4">{t('More from the journal')}</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {more.map((m) => (
            <li key={m.slug}>
              <Link href={`/journal/${m.slug}`} className="font-display text-[26px] leading-tight hover:underline">
                {m.title}
              </Link>
              <p className="mt-1 text-[15px] text-sumi-soft">{m.description}</p>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
