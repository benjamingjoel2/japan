import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'dark' | 'light' | 'outline-light' | 'outline';

const styles: Record<Variant, string> = {
  dark: 'bg-sumi text-washi',
  light: 'bg-washi text-sumi',
  'outline-light': 'border border-washi/80 text-washi',
  outline: 'border border-sumi/70 text-sumi',
};

/**
 * Pill button. On hover the label slides up and an identical label rises from below,
 * the same two-layer swap the reference uses, built with CSS only.
 */
export function Button({
  href,
  children,
  variant = 'dark',
  className = '',
  ...rest
}: { href?: string; children: ReactNode; variant?: Variant; className?: string } & Omit<
  ComponentProps<'button'>,
  'children'
>) {
  const inner = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-soft group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-soft group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
  const cls = `group inline-flex h-11 shrink-0 items-center justify-center rounded-full px-[22px] text-label leading-none whitespace-nowrap ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
