import type { TeamMember } from './types';

export const team: TeamMember[] = [
  {
    name: 'Aiko Morimoto',
    role: 'Travel specialist',
    base: 'Kyoto',
    intro: 'Aiko plans most of our Kyoto and Nara journeys, and knows which temples open their gates before the buses arrive.',
    bio: [
      'Aiko grew up in a wooden house in northern Kyoto, a short walk from the hills where the city keeps its quieter temples. She worked in small inns for a decade before she started planning journeys.',
      'She still walks the routes she designs, usually at 6:30 in the morning. Her favourite month is June, when the moss is greenest and the visitors are fewest.',
    ],
    image: {
      subject: 'Woman in a linen jacket on a temple veranda, northern Kyoto, soft morning light',
      tone: 'leaf',
      alt: 'Portrait of Aiko on a wooden temple veranda',
    },
    placeholder: true,
  },
  {
    name: 'Kenta Hayashi',
    role: 'Local guide',
    base: 'Kanazawa',
    intro: 'Kenta introduces travellers to Kanazawa’s lacquer, gold leaf and tea houses, and to the makers behind them.',
    bio: [
      'Kenta trained as a lacquer artisan before an injury to his wrist moved him from the workbench to the street. He now guides through the old districts he grew up in.',
      'Most of the makers we visit are his friends. He will take you to the fish market before breakfast if you ask, and sometimes if you don’t.',
    ],
    image: {
      subject: 'Man standing in a narrow lane of wooden teahouses, Kanazawa, overcast',
      tone: 'stone',
      alt: 'Portrait of Kenta in a lane of wooden teahouses',
    },
    placeholder: true,
  },
  {
    name: 'Mayumi Tanaka',
    role: 'Walking guide',
    base: 'Kumano Kodo',
    intro: 'Mayumi walks the Kumano Kodo with our travellers, at a pace that leaves room for the forest.',
    bio: [
      'Mayumi moved to the Kii Peninsula from Osaka twenty years ago and never went back. She has walked the Nakahechi route more times than she can count.',
      'She knows the names of the trees, the history of the stone steps, and where the tea house keeps its best pickles. She carries a spare pair of socks for whoever needs them.',
    ],
    image: {
      subject: 'Woman with a walking stick on mossy stone steps among tall cedars',
      tone: 'cedar',
      alt: 'Portrait of Mayumi on a forest trail of stone steps',
    },
    placeholder: true,
  },
  {
    name: 'Hannah Clarke',
    role: 'Trip designer',
    base: 'London',
    intro: 'Hannah lived in Japan for eight years and now designs journeys for travellers in the UK and Europe.',
    bio: [
      'Hannah taught English in rural Nagano, then worked for a sake brewery in Kyoto, before coming home to London with a suitcase full of ceramics.',
      'She is the first voice most of our UK and European travellers hear. She will ask how you like to spend a slow afternoon before she asks where you want to go.',
    ],
    image: {
      subject: 'Woman at a desk with a paper map of Japan and a ceramic cup, London window light',
      tone: 'paper',
      alt: 'Portrait of Hannah at a desk with a map and a cup of tea',
    },
    placeholder: true,
  },
  {
    name: 'Shota Ishikawa',
    role: 'Food and sake guide',
    base: 'Tokyo',
    intro: 'Shota knows the counters, the breweries and the late-night noodle shops, and which ones will look after you.',
    bio: [
      'Shota spent his twenties in restaurant kitchens and his thirties visiting breweries. He holds a sake sommelier qualification and an opinion on every bowl of soba in Tokyo.',
      'He is careful with dietary needs and talks to chefs ahead of time, so a vegetarian or an allergy never means a lesser meal.',
    ],
    image: {
      subject: 'Man pouring sake at a cedar counter, small Tokyo bar, warm evening light',
      tone: 'lantern',
      alt: 'Portrait of Shota pouring sake at a wooden counter',
    },
    placeholder: true,
  },
];
