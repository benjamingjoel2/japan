import { photos } from '@/data/photos';

export const UNSPLASH = 'https://images.unsplash.com/';

export function photoFor(subject: string) {
  const p = photos[subject];
  // The image loader adds width/quality/format; Unsplash's CDN does the resizing.
  return p ? { ...p, src: `${UNSPLASH}${p.photo}` } : null;
}
