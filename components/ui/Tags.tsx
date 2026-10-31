'use client';

import { useT } from '@/components/i18n/I18nProvider';
export function PlaceholderTag({ className = '' }: { className?: string }) {
  const { t } = useT();
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/30 px-2 py-0.5 text-[11px] tracking-wide uppercase ${className}`}
    >
      {t('Placeholder')}
    </span>
  );
}

export function VerifyTag({ note, className = '' }: { note?: string; className?: string }) {
  const { t } = useT();
  return (
    <span
      title={note ?? t('Verify before launch')}
      className={`inline-flex items-center gap-1 rounded-full bg-beni/10 px-2 py-0.5 text-[11px] tracking-wide text-[#8a3420] uppercase ${className}`}
    >
      <span aria-hidden="true">●</span> {t('Verify')}{note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}
