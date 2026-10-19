import type { Currency } from '@/data/types';

// Approximate conversion rates from JPY. Placeholder values — update before launch
// (or wire to a rates API). Shown to visitors as approximate.
export const ratesAsOf = '2026-10-01';

export const currencies: Record<Currency, { rate: number; symbol: string; locale: string }> = {
  JPY: { rate: 1, symbol: '¥', locale: 'ja-JP' },
  USD: { rate: 0.0067, symbol: '$', locale: 'en-US' },
  GBP: { rate: 0.0051, symbol: '£', locale: 'en-GB' },
  EUR: { rate: 0.0059, symbol: '€', locale: 'de-DE' },
  AUD: { rate: 0.0102, symbol: 'A$', locale: 'en-AU' },
};

export const currencyOrder: Currency[] = ['JPY', 'USD', 'GBP', 'EUR', 'AUD'];
