import { t, tx } from '@/lib/i18n/server';
import { about } from '@/data/about';
import { Media } from '@/components/ui/Media';
import { Reveal, SplitWords } from '@/components/ui/Reveal';
import { JapanMap } from '@/components/features/JapanMap';
import { KyotoSunrise, MicroSeasonNow, TokyoClock } from '@/components/features/LiveInfo';

export function AboutInfo() {
  return (
    <section id="komorebi" aria-label={t('About Komorebi')} className="relative -mt-[100svh] bg-washi px-gutter py-section">
      <header className="mb-[var(--section-header,3.5rem)] max-w-[62rem]">
        <SplitWords as="h2" text={t('Japan, in its own time')} className="text-h2" />
        <Reveal as="p" className="mt-5 max-w-[34ch] text-lead lg:mt-[1.4vw]">
          {t(about.lead)}
        </Reveal>
      </header>

      <div className="grid grid-cols-1 gap-grid md:grid-cols-4">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-media md:col-span-3 md:aspect-auto md:min-h-[34vw]">
          <Media
            media={{ subject: 'A gardener sweeping moss under maples, Kyoto, 6:50am', tone: 'leaf' }}
            sizes="(min-width: 768px) 75vw, 100vw"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-sumi/50 via-sumi/10 to-transparent" />
          <p className="absolute top-4 right-4 max-w-[22rem] text-body text-washi md:top-[1.4vw] md:right-[1.4vw]">
            {t(about.intro[0])}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-grid">
          <div className="relative overflow-hidden rounded-media bg-washi-deep/60 p-4">
            <JapanMap
              className="mx-auto h-auto w-full max-w-[16rem] text-sumi"
              points={[{ id: 'kyoto', lat: 35.0116, lng: 135.7681, label: t('Kyoto') }]}
              highlight="kyoto"
              land="var(--color-washi)"
              title={t('Map of Japan with Kyoto marked')}
            />
          </div>
          <dl className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-3 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col">
              <dt className="label">{t('Country')}</dt>
              <dd className="text-label">{t('Japan')}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="label">{t('Tokyo time')}</dt>
              <dd className="text-label">
                <TokyoClock /> <span className="text-moss">(GMT+9)</span>
              </dd>
            </div>
            <div className="col-span-2 flex flex-col md:col-span-1 lg:col-span-2">
              <dt className="label">{t('Micro-season, today')}</dt>
              <dd className="text-label">
                <MicroSeasonNow />
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="label">{t('Sunrise in Kyoto')}</dt>
              <dd className="text-label">
                <KyotoSunrise />
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
