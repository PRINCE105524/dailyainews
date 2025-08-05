'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/types/news';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';

type NewsCardProps = {
  article: Article;
};

export function NewsCard({ article }: NewsCardProps) {
  const publishedAt = new Date(article.publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });

  const placeholderImg = `https://placehold.co/600x400/242424/white?text=${encodeURIComponent(
    article.source.name
  )}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block flex-grow">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.urlToImage || placeholderImg}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="news technology"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2">
            {article.source.name}
          </Badge>
          <CardTitle className="text-lg font-headline leading-tight line-clamp-3">
            {article.title}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <span>{timeAgo}</span>
        <Button asChild variant="secondary" size="sm">
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            See More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
