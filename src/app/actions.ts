'use server';

import { z } from 'zod';
import { getNews } from '@/lib/news';

const SeoActionSchema = z.object({
  articleTitle: z.string().min(1, 'Article title is required.'),
  articleContent: z.string().min(1, 'Article content is required.'),
});

export async function getMoreNewsAction(category: string, page: number) {
  try {
    const articles = await getNews(category, 20, page);
    return { success: true, data: articles };
  } catch (error) {
    console.error('Error fetching more news:', error);
    return { success: false, error: 'Failed to fetch more news.' };
  }
}
