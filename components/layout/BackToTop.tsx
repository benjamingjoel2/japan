'use client';
import { useT } from '@/components/i18n/I18nProvider';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  const { t } = useT();
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t('Back to top')}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-3 left-3 z-40 grid size-10 place-items-center rounded-full bg-sumi text-washi shadow-lg transition-[opacity,transform] duration-500 ease-soft lg:bottom-[1vw] lg:left-[var(--gutter)] lg:size-[50px] ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </button>
  );
}
