import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdBanner } from '@/components/ad-banner';
import { getNews } from '@/lib/news';
import { CATEGORIES } from '@/lib/constants';
import { NewsFeed } from '@/components/news-feed';

export const revalidate = 14400; // Revalidate every 4 hours

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentCategory =
    typeof searchParams?.category === 'string' && CATEGORIES.includes(searchParams.category)
      ? searchParams.category
      : CATEGORIES[0];

  const initialArticles = await getNews(currentCategory, 20, 1);

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header activeCategory={currentCategory} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <AdBanner />
          <NewsFeed initialArticles={initialArticles} category={currentCategory} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
