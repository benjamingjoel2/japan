import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/journal';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = pageMeta({
  title: 'Journal',
  description: 'Notes on travelling slowly in Japan: ryokan, seasons, quiet hours and old roads.',
  path: '/journal',
});

export default async function JournalPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader label="Journal" title="Notes from the road" lead="Short, practical pieces on travelling slowly in Japan." />
      <ul className="grid gap-x-[var(--gap)] gap-y-14 px-gutter pb-section md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
            <Link href={`/journal/${p.slug}`} className="group flex flex-col gap-3">
              <span className="relative block aspect-[3/2] overflow-hidden rounded-media">
                <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
                  <Media media={{ subject: p.title, tone: p.tone }} sizes="(min-width: 768px) 50vw, 100vw" label={false} />
                </span>
              </span>
              <span className="flex gap-3 text-[13px] text-moss">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span>· {p.readingMinutes} min read</span>
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
