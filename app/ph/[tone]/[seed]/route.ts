import { placeholderSvg, tones } from '@/lib/placeholder';
import type { Tone } from '@/data/types';

// Placeholder artwork, cached hard: the same URL always returns the same picture.
export async function GET(_req: Request, { params }: { params: Promise<{ tone: string; seed: string }> }) {
  const { tone, seed } = await params;
  const id = seed.replace(/\.svg$/, '');
  if (!tones.includes(tone as Tone) || !/^[0-9a-z]{1,8}$/.test(id)) return new Response('Not found', { status: 404 });
  return new Response(placeholderSvg(tone as Tone, id), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
