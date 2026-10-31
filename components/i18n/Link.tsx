'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { useT } from './I18nProvider';

/** next/link that keeps the visitor in their language. */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { href: lh } = useT();
  return <NextLink href={typeof href === 'string' ? lh(href) : href} {...rest} />;
}
