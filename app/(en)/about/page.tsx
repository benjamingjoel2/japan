import { initLocale, t, tx } from '@/lib/i18n/server';
import Link from '@/components/i18n/Link';
import { about } from '@/data/about';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'About',
    description: 'Komorebi is a small team planning private, slow journeys in Japan, around the seasons and away from the crowds.',
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('About')}
        ja="木漏れ日"
        title={t('Sunlight through leaves')}
        lead={t(about.lead)}
        image={{ subject: 'Komorebi: light through maple leaves onto a moss garden, Kyoto, early morning', tone: 'leaf' }}
      />
      <section className="grid gap-10 px-gutter pb-section md:grid-cols-[1fr_1.4fr] md:gap-grid">
        <h2 className="text-h3">{t('How it started')}</h2>
        <div className="flex max-w-[60ch] flex-col gap-5">
          {tx(about.story).map((p, i) => (
            <Reveal as="p" key={i} className={i ? 'text-body text-sumi-soft' : 'text-lead'}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>
      <section aria-labelledby="principles-h" className="bg-night px-gutter py-section text-washi">
        <h2 id="principles-h" className="mb-10 text-h2">
          {t('What we hold to')}
        </h2>
        <ol className="grid gap-x-[var(--gap)] gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {tx(about.principles).map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="border-t border-washi/25 pt-4">
              <span className="text-[13px] text-moss-pale tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-h3">{p.title}</h3>
              <p className="mt-2 text-body text-washi/80">{p.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-12 max-w-[56ch] text-body text-washi/80">
          {t('We also think hard about where we send people, and when. Read how we plan to be good guests on')}{' '}
          <Link href="/quiet-japan" className="underline underline-offset-4">
            {t('Quiet Japan')}
          </Link>
          .
        </p>
      </section>
      <section className="border-t border-line px-gutter py-section">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[30ch] text-lead">{t('We’d love to hear where you’d like to go.')}</p>
          <Button href="/plan">{t('Plan with us')}</Button>
        </div>
      </section>
    </>
  );
}
