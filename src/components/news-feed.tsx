'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Article } from '@/types/news';
import { getMoreNewsAction } from '@/app/actions';
import { NewsGrid } from './news-grid';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type NewsFeedProps = {
  initialArticles: Article[];
  category: string;
};

function Loader() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

export function NewsFeed({ initialArticles, category }: NewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length > 0);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();

  const loadMoreNews = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const response = await getMoreNewsAction(category, page);
    setLoading(false);

    if (response.success && response.data) {
      if (response.data.length === 0) {
        setHasMore(false);
        toast({ description: "You've reached the end of the news." });
      } else {
        setArticles((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Failed to load more news.',
      });
      setHasMore(false);
    }
  }, [category, page, loading, hasMore, toast]);
  
  const lastArticleElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreNews();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreNews]);

  useEffect(() => {
    setArticles(initialArticles);
    setPage(2);
    setHasMore(initialArticles.length > 0);
  }, [initialArticles]);


  return (
    <div>
      <NewsGrid articles={articles} lastArticleRef={lastArticleElementRef} />
      {loading && <Loader />}
      {!hasMore && articles.length > 0 && (
        <p className="text-center text-muted-foreground mt-8">
          You've seen all the latest news.
        </p>
      )}
    </div>
  );
}
