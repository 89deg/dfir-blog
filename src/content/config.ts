import { defineCollection, z } from 'astro:content';

const articleTag = z.enum(['NETWORK', 'CRYPTO', 'DISK', 'MOBILE', 'MEMORY']);
const noteTag = z.enum(['THM', 'LAB', 'LEARNING', 'MILESTONE']);
const toolDomain = z.enum(['android', 'windows', 'network', 'memory']);

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.string(),
    tag: articleTag,
    minutes: z.union([z.number(), z.string()]),
    draft: z.boolean().default(false)
  })
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    tag: noteTag
  })
});

// tier: honest, job-anchored self-assessment (3 = working proficiency,
// 2 = hands-on/learning, 1 = explored). difficulty comes from the platform,
// not from us; 'lab' marks own lab cases.
const toolDifficulty = z.enum(['easy', 'medium', 'hard', 'lab', 'in progress']);

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    domains: z.array(toolDomain).min(1),
    tier: z.number().int().min(1).max(3),
    desc: z.string(),
    verdict: z.string(),
    url: z.string(),
    linkLabel: z.string(),
    challenges: z.array(z.object({
      name: z.string(),
      platform: z.enum(['THM', 'CD', 'own lab']),
      difficulty: toolDifficulty,
      date: z.string(),
      url: z.string().url().optional()
    })).default([])
  })
});

const protocol = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    week: z.string(),
    meta: z.string(),
    blurb: z.string(),
    link: z.string().optional(),
    active: z.boolean().default(true)
  })
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    num: z.string(),
    title: z.string(),
    date: z.string(),
    status: z.string().default('CLOSED'),
    brief: z.string(),
    device: z.array(z.object({ k: z.string(), v: z.string() })),
    tools: z.array(z.string()),
    steps: z.array(z.string()),
    outcome: z.string()
  })
});

const radar = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    why: z.string(),
    order: z.number().default(0)
  })
});

export const collections = { articles, notes, tools, protocol, radar, cases };
