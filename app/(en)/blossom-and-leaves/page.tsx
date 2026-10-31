import { initLocale, t, tx } from '@/lib/i18n/server';
import { blossomDisclaimer, blossomRegions, officialForecastUrl } from '@/data/blossom';
import { journeys } from '@/data/journeys';
import { destinations } from '@/data/destinations';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { BlossomPlanner } from '@/components/features/BlossomPlanner';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Blossom & Leaves',
    description:
      'When cherry blossom and autumn leaves typically arrive across Japan, region by region. Blossom travels north from the south; colour travels south from the north. Typical windows, not forecasts.',
    path: '/blossom-and-leaves',
  });
}

export default async function BlossomPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('Blossom & Leaves')}
        ja="花見・紅葉"
        title={t('Two waves, one country')}
        lead={t('In spring the blossom starts in the south and walks north for about two months. In autumn the colour starts in the northern mountains and walks south. Choose your date and watch where it typically is.')}
      />
      <div className="px-gutter pb-section">
        <div className="mb-8 flex flex-col gap-3 rounded-media border border-beni/30 bg-beni/5 p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px]">
            <strong className="font-semibold">{t('Typical windows, not forecasts.')}</strong> {t(blossomDisclaimer)}{' '}
            {t('Each year Japan’s weather services publish forecasts from late winter (blossom) and late summer (leaves).')}
          </p>
          {/* TODO: replace with the official forecast link for the year before launch. */}
          <a href={officialForecastUrl} className="shrink-0 text-[14px] underline underline-offset-4">
            {t('This year’s official forecast (link to come)')}
          </a>
        </div>
        <BlossomPlanner
          regions={tx(blossomRegions)}
          journeyTitles={Object.fromEntries(tx(journeys).map((j) => [j.slug, j.title]))}
          destinationNames={Object.fromEntries(tx(destinations).map((d) => [d.slug, d.name]))}
        />
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-lead">
            {t('We plan blossom and leaf journeys with spare days built in, so the trip bends with the weather.')}
          </p>
          <Button href="/plan">{t('Plan with us')}</Button>
        </div>
      </div>
    </>
  );
}
