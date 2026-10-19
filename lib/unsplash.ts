import { photos } from '@/data/photos';

export const UNSPLASH = 'https://images.unsplash.com/';

export function photoFor(subject: string) {
  const p = photos[subject];
  // Ask Unsplash for a capped master; next/image then resizes and re-encodes it.
  return p ? { ...p, src: `${UNSPLASH}${p.photo}?w=2400&q=80&fm=jpg&fit=max` } : null;
}
