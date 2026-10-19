import type { ReactNode } from 'react';
import type { Media as MediaT } from '@/data/types';
import { Media } from './Media';
import { Reveal } from './Reveal';
import { HeadingWords } from './HeadingWords';

/** Inner-page opener: label, big title, lead, optional full-width image. */
export function PageHeader({
  label,
  title,
  lead,
  image,
  children,
  ja,
}: {
  label: string;
  title: string;
  lead?: ReactNode;
  image?: MediaT;
  children?: ReactNode;
  ja?: string;
}) {
  return (
    <header className="px-gutter pt-[calc(var(--header-h)+48px)] pb-12 lg:pt-[calc(var(--header-h)+5vw)] lg:pb-[4vw]">
      <p className="label mb-4">
        {label}
        {ja && (
          <span lang="ja" className="ml-3 font-jp">
            {ja}
          </span>
        )}
      </p>
      <HeadingWords text={title} className="max-w-[16ch] text-h2" />
      {lead && (
        <div className="rise-in mt-5 max-w-[38ch] text-lead lg:mt-[1.4vw]" style={{ ['--d' as string]: '0.35s' }}>
          {lead}
        </div>
      )}
      {children && <div className="mt-8">{children}</div>}
      {image && (
        <Reveal className="relative mt-10 aspect-[16/9] overflow-hidden rounded-media md:aspect-[21/9] lg:mt-[3vw]">
          <Media media={image} sizes="100vw" priority />
        </Reveal>
      )}
    </header>
  );
}
