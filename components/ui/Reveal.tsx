'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
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
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
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
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  if (reduce) return <Tag className={className}>{text}</Tag>;
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
