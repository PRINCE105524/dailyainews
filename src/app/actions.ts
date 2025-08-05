'use server';

import { z } from 'zod';
import { generateSeoTags, GenerateSeoTagsInput } from '@/ai/flows/seo-meta-tag-generator';
import { getNews } from '@/lib/news';

const SeoActionSchema = z.object({
  articleTitle: z.string().min(1, 'Article title is required.'),
  articleContent: z.string().min(1, 'Article content is required.'),
});

export async function generateSeoTagsAction(input: GenerateSeoTagsInput) {
  try {
    const validatedInput = SeoActionSchema.parse(input);
    const result = await generateSeoTags(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating SEO tags:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input provided for SEO generation.' };
    }
    return { success: false, error: 'An unexpected error occurred while generating SEO tags. Please try again later.' };
  }
}

export async function getMoreNewsAction(category: string, page: number) {
  try {
    const articles = await getNews(category, 20, page);
    return { success: true, data: articles };
  } catch (error) {
    console.error('Error fetching more news:', error);
    return { success: false, error: 'Failed to fetch more news.' };
  }
}
