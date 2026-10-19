'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { currencies, currencyOrder } from '@/config/currency';
import type { Currency } from '@/data/types';

const Ctx = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({
  currency: 'JPY',
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setC] = useState<Currency>('JPY');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('komorebi:currency') as Currency | null;
      if (saved && currencyOrder.includes(saved)) setC(saved);
    } catch {}
  }, []);
  const setCurrency = (c: Currency) => {
    setC(c);
    try {
      localStorage.setItem('komorebi:currency', c);
    } catch {}
  };
  return <Ctx.Provider value={{ currency, setCurrency }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);

export function formatPrice(jpy: number, c: Currency) {
  const { rate, locale } = currencies[c];
  const v = jpy * rate;
  const rounded = c === 'JPY' ? Math.round(v / 10_000) * 10_000 : Math.round(v / 100) * 100;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(rounded);
}
