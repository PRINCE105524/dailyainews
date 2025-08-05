'use client';

import { useState } from 'react';
import { Copy, Sparkles, Loader2, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Article } from '@/types/news';
import type { GenerateSeoTagsOutput } from '@/ai/flows/seo-meta-tag-generator';
import { generateSeoTagsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from './ui/scroll-area';

type SeoGeneratorDialogProps = {
  article: Article;
};

export function SeoGeneratorDialog({ article }: SeoGeneratorDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSeoTagsOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const response = await generateSeoTagsAction({
      articleTitle: article.title,
      articleContent: article.description || article.content || '',
    });
    setLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: 'Success!',
        description: 'SEO meta tags have been generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Failed to generate SEO tags.',
      });
    }
  };

  const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast({ description: "Copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {copied ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          SEO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI-Powered SEO Meta Tags
          </DialogTitle>
          <DialogDescription>
            Generate optimized meta tags for this article to improve click-through rates.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h4 className="font-semibold text-sm line-clamp-2">
            Article: {article.title}
          </h4>
          <ScrollArea className="h-24 rounded-md border p-4 text-sm text-muted-foreground">
            {article.description || article.content || 'No content available.'}
          </ScrollArea>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating tags...</p>
          </div>
        )}

        {result && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title</Label>
              <div className="flex items-center gap-2">
                <Input id="meta-title" value={result.metaTitle} readOnly />
                <CopyButton textToCopy={result.metaTitle} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
               <div className="flex items-center gap-2">
                <Textarea id="meta-description" value={result.metaDescription} readOnly className="h-24"/>
                <CopyButton textToCopy={result.metaDescription} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-keywords">Meta Keywords</Label>
               <div className="flex items-center gap-2">
                <Input id="meta-keywords" value={result.metaKeywords} readOnly />
                <CopyButton textToCopy={result.metaKeywords} />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleGenerate} disabled={loading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {result ? 'Regenerate' : 'Generate Tags'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
