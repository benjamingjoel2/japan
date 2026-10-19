import { photos } from '@/data/photos';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata = pageMeta({
  title: 'Photo credits',
  description: 'The photographers whose work appears on this site, via Unsplash.',
  path: '/credits',
});

export default function CreditsPage() {
  const byPhotographer = new Map<string, number>();
  Object.values(photos).forEach((p) => byPhotographer.set(p.photographer, (byPhotographer.get(p.photographer) ?? 0) + 1));
  const names = [...byPhotographer.keys()].sort((a, b) => a.localeCompare(b));
  return (
    <>
      <PageHeader
        label="Credits"
        title="With thanks to the photographers"
        lead="Photographs on this site come from Unsplash, used under the Unsplash License, until our own photography replaces them."
      />
      <div className="px-gutter pb-section">
        <ul className="grid gap-x-[var(--gap)] gap-y-2 text-body sm:grid-cols-2 lg:grid-cols-4">
          {names.map((n) => (
            <li key={n} className="border-t border-line py-2">
              {n}
              {byPhotographer.get(n)! > 1 && <span className="text-moss"> · {byPhotographer.get(n)}</span>}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[14px] text-sumi-soft">
          Photos via{' '}
          <a href="https://unsplash.com/?utm_source=komorebi&utm_medium=referral" className="underline underline-offset-4">
            Unsplash
          </a>
          .
        </p>
      </div>
    </>
  );
}
