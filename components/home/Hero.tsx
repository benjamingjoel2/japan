import Link from '@/components/i18n/Link';
import { getLocale, t } from '@/lib/i18n/server';
import { site } from '@/config/site';
import { heroDefaultMonth, heroMonths } from '@/data/hero-months';
import { monthName } from '@/lib/seasons';
import { MonthPicker } from './MonthPicker';

/**
 * Full-screen sticky hero with a month picker. The wrapper is 200vh and the next section
 * pulls itself up by 100vh, so the page slides over the hero rather than the hero scrolling away.
 */
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Hero() {
  const locale = getLocale();
  const months = heroMonths.map((x) => ({
    ...x,
    short: monthName(x.m, locale, 'short').replace('.', ''),
    name: capitalise(monthName(x.m, locale, 'long')),
    note: t(x.note),
  }));
  return (
    <div id="top" className="relative h-[200svh]">
      <section aria-labelledby="hero-h" className="sticky top-0 flex h-svh flex-col overflow-hidden bg-night">
        <MonthPicker months={months} initial={heroDefaultMonth} label={t('Choose a month')}>
          <p className="flex flex-wrap gap-x-3 text-body text-washi/85">
            {site.heroTags.flat().map((w) => (
              <span key={w}>{t(w)}</span>
            ))}
          </p>
          <h1 id="hero-h" className="mt-3 max-w-[16ch] font-display text-[clamp(2.6rem,5.4vw,5.5rem)] leading-[1.02]">
            {t('Slow, private journeys through the seasons of Japan.')}
          </h1>
          <Link href={site.cta.href} className="mt-5 inline-block text-label underline underline-offset-[6px] hover:text-washi/80">
            {t(site.cta.label)} →
          </Link>
        </MonthPicker>
      </section>
    </div>
  );
}
