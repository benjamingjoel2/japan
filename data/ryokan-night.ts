import type { RyokanStage } from './types';

export const ryokanNight: {
  title: string;
  intro: string;
  cta: string;
  stages: RyokanStage[];
} = {
  title: 'A Night in a Ryokan',
  intro:
    'A ryokan is not a hotel with tatami. It is an evening with a shape to it, from the first cup of tea to the last grain of rice at breakfast.',
  cta: 'Every journey includes at least one night like this.',
  stages: [
    {
      title: 'Arrival',
      ja: '到着',
      body: 'Shoes come off at the step and are gone when you look back. Tea and a small sweet wait on a low table. Then the shoji slide open, and the garden is part of the room.',
      media: {
        subject: 'Shoji sliding open onto a garden from a tatami room, late afternoon',
        tone: 'paper',
        alt: 'Paper screens opening from a tatami room onto a small green garden',
        captions: '/captions/ryokan-1.vtt',
      },
    },
    {
      title: 'The bath',
      ja: '湯',
      body: 'Before dinner, the onsen. The light goes blue, the steam thickens, and somewhere a crow settles in a cedar. Ten minutes is enough to forget the train.',
      media: {
        subject: 'Outdoor stone bath at dusk, steam against dark cedars',
        tone: 'dusk',
        alt: 'Steam rising off an outdoor hot spring bath at dusk',
        captions: '/captions/ryokan-2.vtt',
      },
    },
    {
      title: 'Kaiseki',
      ja: '懐石',
      body: 'Dinner arrives in small courses, each one a piece of the season: a single chestnut, a leaf of sansho, sashimi on ice cut from the river. Take your time. The kitchen does.',
      media: {
        subject: 'Kaiseki course on lacquer and ceramic, autumn leaf garnish, low light',
        tone: 'maple',
        alt: 'A small seasonal dish on a lacquer tray decorated with a maple leaf',
        captions: '/captions/ryokan-3.vtt',
      },
    },
    {
      title: 'Futon',
      ja: '布団',
      body: 'While you ate, the room changed. The table is gone and the futon is laid out, thick and crisp, with a lamp turned low. You will sleep closer to the floor, and deeper.',
      media: {
        subject: 'Futon laid on tatami under a paper lamp, night',
        tone: 'night',
        alt: 'A futon made up on tatami, lit by a low paper lamp',
        captions: '/captions/ryokan-4.vtt',
      },
    },
    {
      title: 'Morning',
      ja: '朝',
      body: 'Mist sits in the valley. Breakfast is grilled fish, miso, pickles and rice from a wooden tub. Afterwards, one more bath, and a slow look at the garden before the car comes.',
      media: {
        subject: 'Morning mist over a ryokan garden, stone lantern, wet moss',
        tone: 'mist',
        alt: 'A quiet garden with a stone lantern, softened by morning mist',
        captions: '/captions/ryokan-5.vtt',
      },
    },
  ],
};
