import type { Article, NewsApiResponse } from '@/types/news';
import { NEWS_API_KEY } from './constants';

export async function getNews(
  category: string,
  pageSize: number = 20,
  page: number = 1
): Promise<Article[]> {
  const today = new Date();
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - 28); // Fetch news from the last 28 days
  const from = fromDate.toISOString().split('T')[0];

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    category
  )}&from=${from}&sortBy=publishedAt&language=en&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
  
  try {
    const response = await fetch(url, {
        next: {
            revalidate: 3600 * 4, // 4 hours
        }
    });

    if (!response.ok) {
      console.error(`News API request failed with status: ${response.status}`);
      const errorBody = await response.json();
      console.error('Error body:', errorBody);
      return [];
    }

    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
        console.error('News API returned an error status:', data);
        return [];
    }
    
    const seenTitles = new Set<string>();
    const filteredArticles = data.articles.filter((article) => {
      // Filter out articles without images or with duplicate titles
      const hasImage = !!article.urlToImage;
      const isDuplicate = seenTitles.has(article.title);
      if (hasImage && !isDuplicate) {
        seenTitles.add(article.title);
        return true;
      }
      return false;
    });

    return filteredArticles;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}
