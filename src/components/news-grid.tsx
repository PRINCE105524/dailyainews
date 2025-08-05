import type { Article } from "@/types/news";
import { NewsCard } from "./news-card";

type NewsGridProps = {
  articles: Article[];
  lastArticleRef?: (node: HTMLDivElement) => void;
};

export function NewsGrid({ articles, lastArticleRef }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
        <h2 className="text-xl font-semibold">No Articles Found</h2>
        <p className="mt-2 text-muted-foreground">
          We couldn't find any news for this category. Please try another one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article, index) => {
        if (lastArticleRef && index === articles.length - 1) {
          return (
            <div ref={lastArticleRef} key={article.url || index}>
              <NewsCard article={article} />
            </div>
          );
        }
        return <NewsCard key={article.url || index} article={article} />;
      })}
    </div>
  );
}
