import { initLocale, t } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
import { getPosts, formatDate } from '@/lib/journal';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Journal',
    description: 'Notes on travelling slowly in Japan: ryokan, seasons, quiet hours and old roads.',
    path: '/journal',
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale?: string }> }) {
  const locale = await initLocale(params);
  const posts = await getPosts(locale);
  return (
    <>
      <PageHeader label={t('Journal')} title={t('Notes from the road')} lead={t('Short, practical pieces on travelling slowly in Japan.')} />
      <ul className="grid gap-x-[var(--gap)] gap-y-14 px-gutter pb-section md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
            <Link href={`/journal/${p.slug}`} className="group flex flex-col gap-3">
              <span className="relative block aspect-[3/2] overflow-hidden rounded-media">
                <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
                  <Media media={{ subject: p.subject, tone: p.tone }} ratio={3 / 2} priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" label={false} />
                </span>
              </span>
              <span className="flex gap-3 text-[13px] text-moss">
                <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                <span>· {t('{n} min read', { n: p.readingMinutes })}</span>
              </span>
              <span className="font-display text-[30px] leading-tight group-hover:underline lg:text-[2.2vw]">{p.title}</span>
              <span className="max-w-[48ch] text-body text-sumi-soft">{p.description}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
