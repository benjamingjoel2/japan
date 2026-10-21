'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// LazyMotion + `m` components keep the animation runtime out of the first bundle;
// its features load in a separate chunk right after hydration.
const loadFeatures = () => import('@/lib/motion-features').then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
