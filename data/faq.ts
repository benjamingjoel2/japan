import type { FaqItem } from './types';

export const faq: FaqItem[] = [
  {
    q: 'How do we get around?',
    a: [
      'Mostly by train. Japan’s rail network is punctual, clean and easy once you have done it twice, and we book reserved seats for the longer journeys so you never stand with luggage.',
      'Your suitcases travel separately by takkyūbin, the national courier service. They are typically collected one morning and delivered to your next inn the following day, so you ride with a small bag. In rural areas, a private driver fills the gaps.',
    ],
    images: [
      {
        subject: 'Shinkansen gliding past rice fields, early summer',
        tone: 'leaf',
        alt: 'A bullet train passing green rice fields',
      },
      {
        subject: 'Suitcase with a courier tag at a ryokan entrance',
        tone: 'paper',
        alt: 'A suitcase tagged for courier delivery at an inn doorway',
      },
    ],
  },
  {
    q: 'Should we buy a rail pass?',
    a: [
      'Often not. The national Japan Rail Pass rose sharply in price in October 2023, and for many slower itineraries, individual tickets or a regional pass now work out cheaper.',
      'We price your route both ways and choose whichever is better value. Prices change, so we check them again when we book.',
    ],
    images: [
      {
        subject: 'Paper train tickets and a timetable on a station bench',
        tone: 'stone',
        alt: 'Train tickets and a printed timetable on a wooden bench',
      },
      {
        subject: 'Local two-carriage train crossing a river valley in autumn',
        tone: 'maple',
        alt: 'A small local train crossing a valley with autumn colour',
      },
    ],
    verify: 'Verify current rail pass prices before launch.',
  },
  {
    q: 'What about etiquette?',
    a: [
      'Nobody expects you to know everything. Take your shoes off where the floor steps up, speak softly on trains, carry your rubbish with you, and ask before photographing people.',
      'Your guide will mention the small things as they come up, gently and only once.',
    ],
    images: [
      {
        subject: 'Row of shoes neatly lined up at a genkan step',
        tone: 'paper',
        alt: 'Shoes lined up at the entrance step of a traditional house',
      },
      {
        subject: 'Quiet train carriage, morning light through the window',
        tone: 'mist',
        alt: 'A calm, half-empty train carriage in morning light',
      },
    ],
  },
  {
    q: 'Should we tip?',
    a: [
      'No. Tipping is not part of the culture in Japan, and offering money can cause gentle confusion. Good service is simply the standard.',
      'If you want to thank a guide or an innkeeper, a few warm words, or a small gift from home, will be remembered far longer.',
    ],
    images: [
      {
        subject: 'Innkeeper bowing at a doorway as guests leave, morning',
        tone: 'mist',
        alt: 'An innkeeper bowing farewell at the entrance of a ryokan',
      },
      {
        subject: 'Small wrapped gift on a lacquer tray',
        tone: 'lantern',
        alt: 'A small gift wrapped in paper on a lacquer tray',
      },
    ],
  },
  {
    q: 'Can I use an onsen if I have tattoos?',
    a: [
      'Often, yes, with a little planning. Policies vary from bath to bath: some welcome tattoos, some ask you to cover small ones, and some still say no.',
      'We check ahead, choose tattoo-friendly baths, and where in doubt book inns with private baths, so you can soak without thinking about it.',
    ],
    images: [
      {
        subject: 'Private wooden onsen tub on a balcony overlooking a valley',
        tone: 'cedar',
        alt: 'A private wooden hot spring tub overlooking a forested valley',
      },
      {
        subject: 'Steam over an outdoor stone bath, early evening',
        tone: 'dusk',
        alt: 'Steam rising from an outdoor stone bath',
      },
    ],
    verify: 'Verify tattoo policies for each named bath at time of booking.',
  },
  {
    q: 'What if we have dietary needs?',
    a: [
      'Tell us early. Vegetarian and vegan travel can be hard in Japan, because dashi, a fish stock, is in almost everything, including dishes that look entirely vegetable. Allergies need the same care.',
      'We plan for it. Chefs and inns are briefed in Japanese well before you arrive, we favour kitchens with experience, and you carry translated allergy cards for anywhere unplanned.',
    ],
    images: [
      {
        subject: 'Shōjin ryōri vegetarian temple meal on red lacquer trays',
        tone: 'maple',
        alt: 'A Buddhist vegetarian meal served on red lacquer trays',
      },
      {
        subject: 'Hand-written allergy card beside a bowl of rice',
        tone: 'paper',
        alt: 'A card with Japanese writing next to a rice bowl',
      },
    ],
  },
  {
    q: 'Cash or cards?',
    a: [
      'Both. Cards are accepted in most hotels, department stores and city restaurants, but small shops, shrines, rural inns and market stalls often prefer cash.',
      'Carry some yen and a rechargeable IC transport card. Post office and convenience store ATMs usually accept foreign cards.',
    ],
    images: [
      {
        subject: 'Coins in a small wooden tray at a shop counter',
        tone: 'stone',
        alt: 'Yen coins in a wooden tray on a counter',
      },
      {
        subject: 'Convenience store glowing at night on a quiet street',
        tone: 'night',
        alt: 'A brightly lit convenience store on a dark street',
      },
    ],
  },
  {
    q: 'How do we stay connected?',
    a: [
      'An eSIM is the simplest option if your phone supports it: set it up before you fly and it works when you land. Otherwise we can arrange a pocket wifi device, delivered to your first hotel.',
      'Coverage is excellent in cities and along the main rail lines, and patchier on mountain trails, which some travellers find is rather the point.',
    ],
    images: [
      {
        subject: 'Phone showing a map, held on a forest trail',
        tone: 'cedar',
        alt: 'A hand holding a phone with a map on a forest path',
      },
      {
        subject: 'Window seat on a train, phone and a cup of tea on the tray',
        tone: 'mist',
        alt: 'A phone and a cup of tea on a train window tray',
      },
    ],
  },
  {
    q: 'When is the best time to go?',
    a: [
      'Every season has its reasons. Late March to early April brings blossom, and November brings maples. Both are lovely and both are busy.',
      'Our quieter favourites are May, early June, late October and the first half of December. Winter is cold and clear, with snow in the north. July and August are hot and humid on the main islands, but fine in Hokkaido and the mountains.',
    ],
    images: [
      {
        subject: 'Single cherry tree in blossom beside a farmhouse, early morning',
        tone: 'blossom',
        alt: 'A cherry tree in full blossom beside a farmhouse',
      },
      {
        subject: 'Snow on a thatched roof, Hokkaido or the Alps, blue hour',
        tone: 'snow',
        alt: 'Snow resting on a thatched roof at dusk',
      },
    ],
  },
  {
    q: 'Won’t it be crowded?',
    a: [
      'Some places will be, at some hours. Crowds in Japan are concentrated: a handful of famous sites, between about 10am and 4pm, especially at weekends and in peak season.',
      'So we go early, go late, or go next door. A temple at 7am, a neighbouring valley instead of the famous one, a weekday instead of a Saturday. It makes more difference than you would think.',
    ],
    images: [
      {
        subject: 'Empty torii path at dawn, light mist',
        tone: 'mist',
        alt: 'A path of shrine gates empty at dawn',
      },
      {
        subject: 'Quiet side street in Kyoto, wooden facades, early morning',
        tone: 'stone',
        alt: 'A quiet street of wooden houses in early morning light',
      },
    ],
  },
  {
    q: 'What are the entry requirements and travel taxes?',
    a: [
      'Many nationalities, including visitors from the US, UK, most of Europe and Australia, can currently enter Japan visa-free for short stays. Check your own passport’s rules before you book.',
      'Japan charges an International Tourist Tax of ¥1,000 per departing traveller, usually included in your air fare. Some cities, including Tokyo, Kyoto and Kanazawa, add a small accommodation tax per night. The government has also announced plans for a JESTA pre-arrival screening system, similar to an ESTA, in the coming years.',
      'These rules change. We confirm the current position before you travel.',
    ],
    images: [
      {
        subject: 'Passport and boarding pass on a wooden table, morning light',
        tone: 'paper',
        alt: 'A passport and boarding pass on a table',
      },
      {
        subject: 'Aircraft wing over Mount Fuji in winter',
        tone: 'snow',
        alt: 'View of Mount Fuji from an aircraft window',
      },
    ],
    verify: 'Verify against official Japanese government sources.',
  },
  {
    q: 'Can we travel with children?',
    a: [
      'Yes, and Japan is one of the easiest places to do it: safe, clean, and full of trains, which most children consider a highlight in themselves.',
      'We slow the pace further, choose inns with family rooms or private baths, and swap a temple or two for a forest walk, a craft workshop or an afternoon at the sea.',
    ],
    images: [
      {
        subject: 'Child feeding deer in a park in Nara, morning',
        tone: 'leaf',
        alt: 'A child holding out a cracker to a deer',
      },
      {
        subject: 'Family in yukata walking an onsen town street at dusk',
        tone: 'lantern',
        alt: 'A family in cotton robes walking a lantern-lit street',
      },
    ],
  },
  {
    q: 'How do deposits and cancellations work?',
    a: [
      'A deposit secures your journey once you approve the plan, with the balance due before travel. The amounts and dates are set out in your written quote.',
      'Cancellation charges rise as your travel date gets closer, because inns and guides are booked in your name. Our Booking Terms explain how it works, and we strongly recommend travel insurance from the moment you book.',
    ],
    images: [
      {
        subject: 'Calendar and fountain pen on a desk beside a cup of green tea',
        tone: 'paper',
        alt: 'A desk calendar and pen next to a cup of tea',
      },
      {
        subject: 'Hand-written journey plan in a notebook, pressed maple leaf',
        tone: 'maple',
        alt: 'A notebook with a hand-written itinerary and a pressed leaf',
      },
    ],
  },
];
