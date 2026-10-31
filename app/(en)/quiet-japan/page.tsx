import { initLocale, t, tx } from '@/lib/i18n/server';
import { guestPrinciples, overtourismNote, quietPairings } from '@/data/quiet';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { QuietExplorer } from '@/components/features/QuietExplorer';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Quiet Japan',
    description:
      'Famous places paired with quieter alternatives and better timings: the temple at opening time, the garden next door, Kanazawa as well as Kyoto. And how we plan to be good guests.',
    path: '/quiet-japan',
  });
}

export default async function QuietPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('Quiet Japan')}
        ja="静かな日本"
        title={t('The same Japan, at a better hour')}
        lead={t('Crowds are mostly a matter of timing and a few hundred metres. Here are the swaps we make, place by place.')}
      />
      <div className="px-gutter pb-section">
        <QuietExplorer pairings={tx(quietPairings)} destinationNames={Object.fromEntries(tx(destinations).map((d) => [d.slug, d.name]))} />
      </div>

      <section aria-labelledby="guests-h" className="bg-night px-gutter py-section text-washi">
        <div className="grid gap-10 md:grid-cols-2 md:gap-grid">
          <div>
            <h2 id="guests-h" className="text-h2">
              {t('Being good guests')}
            </h2>
            <div className="mt-6 flex max-w-[52ch] flex-col gap-4 text-body text-washi/85">
              {tx(overtourismNote).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ol className="flex flex-col">
            {tx(guestPrinciples).map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 0.06} className="border-t border-washi/20 py-5">
                <h3 className="flex gap-3 text-h3">
                  <span className="text-moss-pale tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {g.title}
                </h3>
                <p className="mt-2 max-w-[48ch] pl-10 text-body text-washi/80">{g.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="mt-14 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40ch] text-lead">{t('Every place on this page is checked again before we send you there.')}</p>
          <Button href="/plan" variant="light">
            {t('Plan with us')}
          </Button>
        </div>
      </section>
    </>
  );
}
