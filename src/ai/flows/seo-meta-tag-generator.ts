// This file is machine-generated - edit at your own risk.
'use server';
/**
 * @fileOverview An AI-powered SEO meta tag generator.
 *
 * - generateSeoTags - A function that generates SEO meta tags for a given article.
 * - GenerateSeoTagsInput - The input type for the generateSeoTags function.
 * - GenerateSeoTagsOutput - The return type for the generateSeoTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoTagsInputSchema = z.object({
  articleTitle: z.string().describe('The title of the article.'),
  articleContent: z.string().describe('The content of the article.'),
});
export type GenerateSeoTagsInput = z.infer<typeof GenerateSeoTagsInputSchema>;

const GenerateSeoTagsOutputSchema = z.object({
  metaTitle: z.string().describe('The meta title for the article.'),
  metaDescription: z
    .string()
    .describe('The meta description for the article.'),
  metaKeywords: z.string().describe('The meta keywords for the article.'),
});
export type GenerateSeoTagsOutput = z.infer<typeof GenerateSeoTagsOutputSchema>;

export async function generateSeoTags(input: GenerateSeoTagsInput): Promise<GenerateSeoTagsOutput> {
  return generateSeoTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoTagsPrompt',
  input: {schema: GenerateSeoTagsInputSchema},
  output: {schema: GenerateSeoTagsOutputSchema},
  prompt: `You are an SEO expert. Your task is to generate meta tags for a given article to attract higher click-through rates.

Article Title: {{{articleTitle}}}
Article Content: {{{articleContent}}}

Generate a meta title, meta description, and meta keywords that are optimized for search engines and user engagement. The meta title should be concise and engaging. The meta description should accurately summarize the article's content and entice users to click. The meta keywords should be relevant to the article's topic.

Make the meta description two sentences long.

Ensure all tags are concise and do not exceed the recommended length for SEO.
`,
});

const generateSeoTagsFlow = ai.defineFlow(
  {
    name: 'generateSeoTagsFlow',
    inputSchema: GenerateSeoTagsInputSchema,
    outputSchema: GenerateSeoTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
