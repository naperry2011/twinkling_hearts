import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** In-home care services. One entry per service detail page. */
const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    order: z.number().default(0),
    icon: z.enum(['hands', 'pill', 'broom', 'respite']),
    summary: z.string(), // one-line for cards
    intro: z.string(), // warm "what it is" paragraph
    includes: z.array(z.string()), // sub-services / what's included
    helps: z.array(z.string()), // who it helps / signs it fits
    expect: z.array(z.string()), // what to expect / how it works
    metaDescription: z.string(),
  }),
});

/** Service-area landing pages (local SEO backbone). */
const areas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/areas' }),
  schema: z.object({
    city: z.string(),
    region: z.string(), // state abbreviation
    regionName: z.string(),
    order: z.number().default(0),
    intro: z.string(),
    neighborhoods: z.array(z.string()).default([]),
    metaDescription: z.string(),
    placeholder: z.boolean().default(false),
  }),
});

/** FAQ entries grouped by category. */
const faqs = defineCollection({
  loader: file('./src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    category: z.enum([
      'Getting Started',
      'Caregivers & Safety',
      'Services & Scheduling',
      'Cost & Payment',
    ]),
    order: z.number().default(0),
  }),
});

/** Client / family testimonials. */
const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    author: z.string(),
    relation: z.string(), // e.g. "Daughter of a client"
    location: z.string().optional(),
    order: z.number().default(0),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { services, areas, faqs, testimonials };
