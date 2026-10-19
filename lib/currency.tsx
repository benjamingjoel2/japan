'use client';

import { useSyncExternalStore } from 'react';
import { currencies, currencyOrder } from '@/config/currency';
import type { Currency } from '@/data/types';

// The visitor's currency choice, kept in localStorage and shared by every price on the page.
const KEY = 'komorebi:currency';
const listeners = new Set<() => void>();

function read(): Currency {
  try {
    const saved = localStorage.getItem(KEY) as Currency | null;
    if (saved && currencyOrder.includes(saved)) return saved;
  } catch {}
  return 'JPY';
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

function setCurrency(c: Currency) {
  try {
    localStorage.setItem(KEY, c);
  } catch {}
  listeners.forEach((l) => l());
}

export function useCurrency() {
  const currency = useSyncExternalStore(subscribe, read, () => 'JPY' as Currency);
  return { currency, setCurrency };
}

export function formatPrice(jpy: number, c: Currency) {
  const { rate, locale } = currencies[c];
  const v = jpy * rate;
  const rounded = c === 'JPY' ? Math.round(v / 10_000) * 10_000 : Math.round(v / 100) * 100;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(rounded);
}
