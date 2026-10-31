import { z } from 'zod';

export const interests = ['food', 'craft', 'nature', 'walking', 'art', 'onsen', 'gardens', 'temples'] as const;
export const paces = ['gentle', 'balanced', 'fuller'] as const;
export const stayStyles = ['ryokan', 'design hotel', 'mix'] as const;
export const contactMethods = ['email', 'phone'] as const;
export const budgets = [
  { id: 'under-1m', jpy: [0, 1_000_000] },
  { id: '1m-1.5m', jpy: [1_000_000, 1_500_000] },
  { id: '1.5m-2.5m', jpy: [1_500_000, 2_500_000] },
  { id: '2.5m-plus', jpy: [2_500_000, 0] },
  { id: 'unsure', jpy: [0, 0] },
] as const;

export const enquirySchema = z
  .object({
    month: z.string().regex(/^(flexible|([1-9]|1[0-2]))$/),
    year: z.string().max(4).optional().default(''),
    days: z.coerce.number().int().min(3).max(60),
    visit: z.enum(['first', 'returning']),
    interests: z.array(z.enum(interests)).max(interests.length).default([]),
    pace: z.enum(paces),
    stayStyle: z.enum(stayStyles),
    adults: z.coerce.number().int().min(1).max(20),
    children: z.coerce.number().int().min(0).max(20).default(0),
    locale: z.enum(['en', 'fr', 'de', 'es']).optional().default('en'),
    budget: z.enum(budgets.map((b) => b.id) as [string, ...string[]]),
    currency: z.string().max(3).default('JPY'),
    name: z.string().trim().min(1, 'Please tell us your name').max(120),
    email: z.string().trim().email('Please check your email address').max(200),
    phone: z.string().trim().max(40).optional().default(''),
    contact: z.enum(contactMethods),
    notes: z.string().trim().max(4000).optional().default(''),
    journey: z.string().max(80).optional().default(''),
    destination: z.string().max(80).optional().default(''),
    stay: z.string().max(80).optional().default(''),
    // Honeypot: real people leave it empty.
    website: z.string().max(200).optional().default(''),
  })
  .refine((v) => v.contact === 'email' || v.phone.length >= 6, {
    message: 'Please add a phone number so we can reach you that way',
    path: ['phone'],
  });

export type Enquiry = z.infer<typeof enquirySchema>;
