// Home hero month picker: one photograph and one line per month.
// `subject` must match a key in data/photos.ts. VERIFY seasonal timings before launch;
// blossom and leaf dates move by a week or two year to year and by region.
import type { Tone } from './types';

export type HeroMonth = { m: number; note: string; subject: string; tone: Tone };

export const heroMonths: HeroMonth[] = [
  { m: 1, tone: 'mist', subject: 'Steam rising from an outdoor bath under snow-dusted cedars, the Alps behind, dusk', note: 'Snow in the Japan Alps and onsen towns at their quietest.' },
  { m: 2, tone: 'mist', subject: 'Outdoor bath in heavy snowfall, birch trees behind, steam and blue evening light', note: 'Powder snow in Hokkaido, and the first plum blossom in Kyoto.' },
  { m: 3, tone: 'leaf', subject: 'Single cherry tree in blossom beside a farmhouse, early morning', note: 'The first cherry blossom opens in the south and moves north.' },
  { m: 4, tone: 'leaf', subject: 'Weeping cherry over a still garden pond, Kyoto, soft morning light', note: 'Cherry blossom in Kyoto and Tokyo: we go early, before the crowds.' },
  { m: 5, tone: 'mist', subject: 'Mount Fuji at first light above Lake Shōji, mist on the water, a single rowboat', note: 'Fresh green maples, long days and clear mornings around Fuji.' },
  { m: 6, tone: 'leaf', subject: 'Mossy stone steps under tall cedars on the Nakahechi trail, soft rain', note: 'Rainy season: moss gardens and cedar trails at their greenest.' },
  { m: 7, tone: 'mist', subject: 'Sand street on Taketomi between coral stone walls and red-tiled roofs, evening', note: 'Summer festivals on the mainland, and slow island days in the far south.' },
  { m: 8, tone: 'dusk', subject: 'Calm Inland Sea at dusk from a Naoshima beach, small islands in silhouette', note: 'Lantern evenings and the art islands of the Inland Sea.' },
  { m: 9, tone: 'leaf', subject: 'Stone path through cedar forest on the Nakasendō between Magome and Tsumago, autumn morning', note: 'The heat breaks and the old post road through the Kiso Valley is quiet.' },
  { m: 10, tone: 'dusk', subject: 'Lantern-lit path among moss-covered gravestones and tall cedars at Okunoin, dusk', note: 'Autumn colour starts in the mountains; the best walking weather of the year.' },
  { m: 11, tone: 'leaf', subject: 'Light through maple leaves, Tōfuku-ji, 7am', note: 'Maple season in Kyoto, seen at opening time.' },
  { m: 12, tone: 'stone', subject: 'Rope supports on pine trees in Kenroku-en after fresh snow, grey morning', note: 'Crisp, clear days, winter crab and the first snow in Kanazawa.' },
];

/** The month shown first, before the visitor picks one. */
export const heroDefaultMonth = 11;
