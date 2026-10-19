import type { Media } from './types';

export const portraitQuote: {
  quote: string;
  lead: string;
  name: string;
  role: string;
  image: Media;
  placeholder: true;
} = {
  lead: 'A guest does not need to understand everything.',
  quote:
    'They only need to arrive tired and leave a little lighter. We change the flowers in the alcove each week, and the dishes each season. Most people never notice. The ones who do, we remember.',
  name: 'Fumiko Saeki',
  role: 'Okami of a small ryokan in the Kiso Valley',
  image: {
    subject: 'Older woman in a muted kimono arranging a single camellia in an alcove, soft window light',
    tone: 'paper',
    alt: 'Portrait of an innkeeper arranging a single flower in a tatami room alcove',
  },
  placeholder: true,
};
