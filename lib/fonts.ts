import { Instrument_Serif, Geist } from 'next/font/google';

export const display = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-display-face',
  display: 'swap',
});
export const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist', display: 'swap' });
