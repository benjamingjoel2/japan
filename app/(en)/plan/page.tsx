import { initLocale, t, tx } from '@/lib/i18n/server';
import { Suspense } from 'react';
import { journeys } from '@/data/journeys';
import { blossomRegions } from '@/data/blossom';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlanForm } from '@/components/features/PlanForm';
import { CurrencySwitcher } from '@/components/ui/Price';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return pageMeta({
    title: 'Plan with us',
    description: 'Tell us when you would like to travel and what you love. A Komorebi specialist will write back with ideas, no obligation.',
    path: '/plan',
  });
}

export default async function PlanPage({ params }: { params: Promise<{ locale?: string }> }) {
  await initLocale(params);
  return (
    <>
      <PageHeader
        label={t('Plan with us')}
        title={t('Tell us a little')}
        lead={t('When you’d like to go, what you love, how you like to travel. We’ll write back with a first sketch, then plan it together.')}
      >
        <CurrencySwitcher />
      </PageHeader>
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[1fr_44rem_1fr]">
        <div className="lg:col-start-2">
          <Suspense fallback={<div className="min-h-[2200px]" aria-hidden="true" />}>
            <PlanForm
              journeyTitles={Object.fromEntries(tx(journeys).map((j) => [j.slug, j.title]))}
              regions={tx(blossomRegions)}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
