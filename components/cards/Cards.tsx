import Link from '@/components/i18n/Link';
import type { Destination, Journey, Stay } from '@/data/types';
import { Media } from '@/components/ui/Media';
import { Price } from '@/components/ui/Price';
import { SpecTable } from '@/components/ui/SpecTable';
import { PlaceholderTag } from '@/components/ui/Tags';
import { monthName } from '@/lib/seasons';
import { staySpecRows } from '@/lib/stay';
import { getLocale, t, tx } from '@/lib/i18n/server';

export function monthsLabel(ms: number[]) {
  const locale = getLocale();
  return ms.map((m) => monthName(m, locale, 'short')).join(' · ');
}

export function JourneyCard({ j: raw, priority }: { j: Journey; priority?: boolean }) {
  const j = tx(raw);
  return (
    <Link href={`/journeys/${j.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-[4/5] overflow-hidden rounded-media">
        <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
          <Media media={j.image} ratio={4 / 5} priority={priority} sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw" />
        </span>
      </span>
      <span className="flex items-baseline justify-between gap-3 text-[13px] text-moss">
        <span>{t('{n} days', { n: j.days })}</span>
        <Price jpy={j.fromJPY} className="text-sumi" />
      </span>
      <span className="font-display text-[28px] leading-tight lg:text-[2vw]">{j.title}</span>
      <span className="text-body text-sumi-soft">{j.tagline}</span>
      <span className="text-[13px] text-moss">{t('Best: {months}', { months: monthsLabel(j.bestMonths) })}</span>
    </Link>
  );
}

export function StayCard({ s: raw, destination, priority }: { s: Stay; destination?: string; priority?: boolean }) {
  const s = tx(raw);
  return (
    <Link href={`/stays/${s.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-media">
        <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
          <Media media={s.images[0]} ratio={4 / 3} priority={priority} sizes="(min-width: 992px) 33vw, 100vw" />
        </span>
      </span>
      <span className="flex items-center gap-2 text-[13px] text-moss">
        <span className="capitalize">{t(s.type)}</span>
        {destination && <span>· {t(destination)}</span>}
        <PlaceholderTag />
      </span>
      <span className="font-display text-[28px] leading-tight lg:text-[2vw]">{s.name}</span>
      <span className="text-body text-sumi-soft">{s.summary}</span>
      <SpecTable rows={staySpecRows(s, t)} cols={3} className="border-t border-line pt-3" />
    </Link>
  );
}

export function DestinationCard({ d: raw, priority }: { d: Destination; priority?: boolean }) {
  const d = tx(raw);
  return (
    <Link href={`/destinations/${d.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-[3/4] overflow-hidden rounded-media">
        <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
          <Media media={d.image} ratio={3 / 4} priority={priority} sizes="(min-width: 992px) 25vw, 50vw" label={false} />
        </span>
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sumi/60 to-transparent" />
        <span className="absolute bottom-3 left-3 right-3 text-washi">
          {d.ja && (
            <span lang="ja" className="block font-jp text-[13px] opacity-80">
              {d.ja}
            </span>
          )}
          <span className="block font-display text-[26px] leading-tight lg:text-[1.8vw]">{d.name}</span>
        </span>
      </span>
      <span className="text-[15px] text-sumi-soft">{d.tagline}</span>
    </Link>
  );
}
