'use client';

import { m, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import type { ElementType, ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Blur-rise on entering the viewport: opacity 0, blur 5px, 1rem down → settled. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  amount = 0.3,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'span' | 'li' | 'h2' | 'h3' | 'section' | 'article';
  amount?: number;
} & Omit<HTMLMotionProps<'div'>, 'children'>) {
  const reduce = usePrefersReducedMotion();
  const M = m[as] as typeof m.div;
  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: '1rem', filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Splits a heading into words that rise in sequence. Screen readers get the plain string. */
export function SplitWords({
  text,
  className,
  as = 'h2',
  stagger = 0.06,
  delay = 0,
  id,
}: {
  id?: string;
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  stagger?: number;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const Tag = as as ElementType;
  if (reduce) return <Tag id={id} className={className}>{text}</Tag>;
  const words = text.split(' ');
  const M = m[as] as typeof m.h2;
  // The trigger sits on the heading: the word spans start clipped by their masks, so they
  // never intersect the viewport themselves.
  return (
    <M
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
          <m.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1, ease } } }}
          >
            {w}
            {i < words.length - 1 ? '\u00a0' : ''}
          </m.span>
        </span>
      ))}
    </M>
  );
}
