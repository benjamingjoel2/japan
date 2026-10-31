'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { localizeHref, makeT, makeTx, type Locale, type Messages } from '@/lib/i18n/config';

const Ctx = createContext<{ locale: Locale; messages?: Messages }>({ locale: 'en' });

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages?: Messages; children: ReactNode }) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Client-side translation of UI strings (the server passes only the strings client components use). */
export function useT() {
  const { locale, messages } = useContext(Ctx);
  return useMemo(
    () => ({ locale, t: makeT(messages), tx: makeTx(messages), href: (h: string) => localizeHref(h, locale) }),
    [locale, messages],
  );
}
