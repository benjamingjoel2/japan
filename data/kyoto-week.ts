// Homepage carousel: "Seven days in Kyoto & Nara".
// A shorter, more personal cut of the kyoto-nara-slowly journey.
// Times and openings are typical and should be verified before publishing.

import type { DayPlan } from './types';

export const kyotoWeek: { title: string; intro: string; days: DayPlan[] } = {
  title: 'Seven days in Kyoto & Nara',
  intro:
    'Kyoto at 7am belongs to the monks and the gardeners. This is a week spent mostly in those hours, with long afternoons and very good dinners.',
  days: [
    {
      day: 1,
      title: 'Shoes off',
      place: 'Kyoto',
      morning: 'Your bags go ahead from the airport. You take the train with nothing heavier than a coat.',
      afternoon: 'Tea in a tatami room overlooking moss, a single maple, and a stone basin filling drop by drop.',
      evening: '7:00, a nine-course kaiseki dinner in your room, the season arranged on each plate.',
      stay: 'yuzuriha',
      image: {
        subject: 'Tatami room opening onto a moss garden, late afternoon light, a cup of tea on the floor',
        tone: 'leaf',
        alt: 'A quiet tatami room looking onto a small moss garden',
      },
    },
    {
      day: 2,
      title: 'Before the gates',
      place: 'Kyoto, Higashiyama',
      morning: '6:45 at Tōfuku-ji, before the gates open to tour groups. A gardener rakes the gravel.',
      afternoon: 'Higashiyama’s back lanes, and a workshop where tea whisks are split from a single piece of bamboo.',
      evening: 'Eight seats at a Gion counter. The chef slices sea bream an arm’s length away.',
      stay: 'yuzuriha',
      image: {
        subject: 'Empty wooden bridge at Tōfuku-ji, 6:45am, maple canopy, soft mist',
        tone: 'maple',
        alt: 'An empty temple bridge under maple trees in early mist',
      },
    },
    {
      day: 3,
      title: 'Moss and rice fields',
      place: 'Ōhara',
      morning: '8:30 at Sanzen-in, the moss garden damp and green, small stone figures half buried in it.',
      afternoon: 'Pickles, rice and miso soup at a farmhouse, then a walk through shiso fields toward the hills.',
      evening: 'A long soak in a cypress tub, then tofu simmered at the table.',
      stay: 'yuzuriha',
      image: {
        subject: 'Deep green moss garden at Sanzen-in, Ōhara, small stone jizō figures, overcast morning',
        tone: 'mist',
        alt: 'Moss-covered ground with small stone figures under tall trees',
      },
    },
    {
      day: 4,
      title: 'A house of your own',
      place: 'Kyoto, Nishijin',
      morning: 'Move into your machiya: a narrow townhouse, an inner garden the size of a tatami mat, a key on a cord.',
      afternoon: 'A Nishijin weaver at a loom that clacks like rain on a tin roof.',
      evening: 'An izakaya three doors down. The menu is on a blackboard and changes with the market.',
      stay: 'kinari-machiya',
      image: {
        subject: 'Wooden lattice front of a Kyoto machiya at dusk, a paper lantern lit by the door',
        tone: 'lantern',
        alt: 'A wooden townhouse facade with a lit paper lantern at dusk',
      },
    },
    {
      day: 5,
      title: 'The quiet west',
      place: 'Kyoto, Arashiyama',
      morning: '9:00 at Ōkōchi Sansō, the bamboo path still quiet below, matcha and a sweet at the top.',
      afternoon: 'Saga-Toriimoto, a street of thatched roofs and old tea houses the crowds rarely reach.',
      evening: 'Shōjin ryōri in a temple guest room: sesame tofu, mountain vegetables, nothing wasted.',
      stay: 'kinari-machiya',
      image: {
        subject: 'Thatched roofs along a quiet lane in Saga-Toriimoto, autumn afternoon',
        tone: 'paper',
        alt: 'Old thatched houses along an empty village street',
      },
    },
    {
      day: 6,
      title: 'Deer at dawn',
      place: 'Nara',
      morning: '7:30 in Nara Park. The deer are still sleepy and Tōdai-ji’s great hall is almost silent.',
      afternoon: 'Isuien, a garden that borrows the temple roofs beyond its wall as scenery.',
      evening: 'Persimmon-leaf sushi, a cup of local sake, and the stone lanterns of Kasuga Taisha.',
      image: {
        subject: 'Deer resting on grass in Nara Park at first light, temple roof behind',
        tone: 'dusk',
        alt: 'Deer lying on grass in soft morning light near a temple',
      },
    },
    {
      day: 7,
      title: 'Oldest wood',
      place: 'Nara, Ikaruga',
      morning: '8:00 at Hōryū-ji, among some of the oldest wooden buildings in the world, before the school buses.',
      afternoon: 'A slow walk past rice fields to Hokki-ji’s three-storey pagoda, then the car to the airport.',
      evening: 'A box of Uji tea in your bag, and the smell of temple incense on your coat.',
      image: {
        subject: 'Ancient wooden pagoda at Hōryū-ji against a pale morning sky',
        tone: 'stone',
        alt: 'A weathered wooden pagoda in early morning light',
      },
    },
  ],
};
