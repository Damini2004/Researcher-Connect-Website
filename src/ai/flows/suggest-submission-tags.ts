// src/ai/flows/suggest-submission-tags.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests relevant categories/tags for journal submissions based on the submission content.
 *
 * - suggestSubmissionTags - A function that triggers the tag suggestion flow.
 * - SuggestSubmissionTagsInput - The input type for the suggestSubmissionTags function.
 * - SuggestSubmissionTagsOutput - The return type for the suggestSubmissionTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSubmissionTagsInputSchema = z.object({
  submissionContent: z.string().describe('The content of the journal submission.'),
});

export type SuggestSubmissionTagsInput = z.infer<typeof SuggestSubmissionTagsInputSchema>;

const SuggestSubmissionTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('An array of suggested categories or tags for the submission.'),
});

export type SuggestSubmissionTagsOutput = z.infer<typeof SuggestSubmissionTagsOutputSchema>;

export async function suggestSubmissionTags(input: SuggestSubmissionTagsInput): Promise<SuggestSubmissionTagsOutput> {
  return suggestSubmissionTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSubmissionTagsPrompt',
  input: {schema: SuggestSubmissionTagsInputSchema},
  output: {schema: SuggestSubmissionTagsOutputSchema},
  prompt: `You are an expert in categorizing journal submissions. Based on the content of the submission, suggest relevant categories or tags. Return the tags as an array of strings.

Submission Content: {{{submissionContent}}}`,
});

const suggestSubmissionTagsFlow = ai.defineFlow(
  {
    name: 'suggestSubmissionTagsFlow',
    inputSchema: SuggestSubmissionTagsInputSchema,
    outputSchema: SuggestSubmissionTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
