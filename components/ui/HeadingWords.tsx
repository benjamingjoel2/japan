import type { ElementType } from 'react';

/**
 * Page-top heading whose words rise on load. Pure CSS, so it plays before hydration and
 * doesn't hold back the largest paint. Reduced motion is handled globally in CSS.
 */
export function HeadingWords({
  text,
  as = 'h1',
  className,
  delay = 0.1,
  stagger = 0.07,
}: {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const Tag = as as ElementType;
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
          <span className="word-up inline-block" style={{ ['--d' as string]: `${delay + i * stagger}s` }}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
