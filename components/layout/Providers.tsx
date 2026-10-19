'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { CurrencyProvider } from '@/lib/currency';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CurrencyProvider>{children}</CurrencyProvider>
    </MotionConfig>
  );
}
