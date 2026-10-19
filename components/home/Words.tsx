import { reviews } from '@/data/reviews';
import { Marquee } from '@/components/ui/Marquee';
import { PlaceholderTag } from '@/components/ui/Tags';

export function Words() {
  return (
    <section id="words" aria-labelledby="words-h" className="bg-washi pt-section">
      <header className="mb-10 px-gutter text-center lg:mb-[3vw]">
        <h2 id="words-h" className="text-h2">
          Words from the road
        </h2>
        <p className="mt-4 flex items-center justify-center gap-2 text-label text-moss">
          <PlaceholderTag /> Sample reviews, to be replaced with real ones.
        </p>
      </header>
      <div className="relative">
        <Marquee label="Reviews" speed={0.5}>
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="mr-5 flex min-h-[50vh] w-[78vw] shrink-0 snap-start flex-col justify-between gap-10 border-l-2 border-sumi/15 px-3 first:ml-[var(--gutter)] md:min-h-[26vw] md:w-[43vw] md:px-4 lg:mr-[2vw] lg:w-[33vw] md:first:ml-0"
            >
              <blockquote className="text-lead">
                <p>{r.quote}</p>
              </blockquote>
              <figcaption className="text-label">
                <span className="block text-moss">{r.name}</span>
                <span className="block">
                  {r.from} · {r.trip}
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[12vw] bg-gradient-to-r from-washi to-transparent md:block" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[12vw] bg-gradient-to-l from-washi to-transparent md:block" />
      </div>
    </section>
  );
}
