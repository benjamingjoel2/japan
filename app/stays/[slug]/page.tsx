import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stays } from '@/data/stays';
import { destinations } from '@/data/destinations';
import { journeys } from '@/data/journeys';
import { pageMeta } from '@/lib/seo';
import { Media } from '@/components/ui/Media';
import { Button } from '@/components/ui/Button';
import { SpecTable } from '@/components/ui/SpecTable';
import { Reveal } from '@/components/ui/Reveal';
import { HeadingWords } from '@/components/ui/HeadingWords';
import { PlaceholderTag } from '@/components/ui/Tags';
import { JourneyCard, staySpecRows } from '@/components/cards/Cards';

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

const get = (slug: string) => stays.find((s) => s.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = get((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.name, description: s.summary, path: `/stays/${s.slug}` });
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = get((await params).slug);
  if (!s) notFound();
  const d = destinations.find((x) => x.slug === s.destination);
  const sJourneys = journeys.filter((j) => j.stays.includes(s.slug));

  return (
    <>
      <div className="px-gutter pt-[calc(var(--header-h)+40px)] pb-section lg:pt-[calc(var(--header-h)+3vw)]">
        <p className="label mb-4 flex flex-wrap items-center gap-2">
          <Link href="/stays" className="hover:underline">
            Stays
          </Link>
          <span>·</span>
          <span className="capitalize">{s.type}</span>
          {d && (
            <>
              <span>·</span>
              <Link href={`/destinations/${d.slug}`} className="hover:underline">
                {d.name}
              </Link>
            </>
          )}
          <PlaceholderTag />
        </p>
        {/* Same three-column composition as the homepage stays slider. */}
        <div className="grid grid-cols-1 gap-grid md:grid-cols-[1.25fr_1fr_0.6fr]">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-media md:aspect-auto md:min-h-[38vw]">
            <Media media={s.images[0]} sizes="(min-width: 768px) 45vw, 100vw" priority />
          </Reveal>
          <div className="flex flex-col gap-4 md:px-[1vw]">
            <HeadingWords text={s.name} className="font-display text-[44px] leading-none md:text-[7vw] lg:text-[4.4vw]" />
            <p className="text-lead">{s.summary}</p>
            {s.description.map((p, i) => (
              <p key={i} className="text-body text-sumi-soft">
                {p}
              </p>
            ))}
            <SpecTable rows={staySpecRows(s)} className="mt-auto border-t border-line pt-3" />
          </div>
          <Reveal delay={0.1} className="relative aspect-[3/4] self-start overflow-hidden rounded-media">
            <Media media={s.images[1]} sizes="20vw" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-grid">
          <div>
            <h2 className="label mb-3">The details</h2>
            <ul className="flex flex-col">
              {s.details.map((x) => (
                <li key={x} className="flex gap-3 border-t border-line py-3 text-body">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-beni" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-[34ch] text-lead">We can include a night here in any journey that passes nearby.</p>
            <Button href={`/plan?stay=${s.slug}`}>Plan with us</Button>
          </div>
        </div>
      </div>

      {sJourneys.length > 0 && (
        <section aria-labelledby="sj-h" className="border-t border-line px-gutter py-section">
          <h2 id="sj-h" className="mb-10 text-h2">
            Journeys that stay here
          </h2>
          <ul className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-3">
            {sJourneys.map((j) => (
              <li key={j.slug}>
                <JourneyCard j={j} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
