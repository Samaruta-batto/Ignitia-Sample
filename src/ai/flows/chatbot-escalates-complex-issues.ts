'use server';

/**
 * @fileOverview A flow to escalate complex chatbot issues to human support.
 *
 * - escalateToSupport - A function that initiates the escalation process.
 * - EscalationInput - The input type for the escalationToSupport function.
 * - EscalationOutput - The return type for the escalationToSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EscalationInputSchema = z.object({
  userQuery: z.string().describe('The user query that the chatbot could not resolve.'),
  chatHistory: z.string().optional().describe('The history of the chat with the chatbot.'),
});
export type EscalationInput = z.infer<typeof EscalationInputSchema>;

const EscalationOutputSchema = z.object({
  escalationMessage: z
    .string()
    .describe(
      'A message indicating that the issue has been escalated to human support and providing a ticket number or estimated response time.'
    ),
  ticketNumber: z.string().optional().describe('A unique ticket number for the support request.'),
});
export type EscalationOutput = z.infer<typeof EscalationOutputSchema>;

export async function escalateToSupport(input: EscalationInput): Promise<EscalationOutput> {
  return escalateToSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'escalateToSupportPrompt',
  input: {schema: EscalationInputSchema},
  output: {schema: EscalationOutputSchema},
  prompt: `You are a support escalation agent. The user has a problem that the chatbot was unable to solve.

  Based on the user's query and chat history, generate a message to the user indicating that their issue has been escalated to human support. Include a ticket number if available.

  User Query: {{{userQuery}}}
  Chat History: {{{chatHistory}}}

  Respond in a professional and helpful tone.
  Return a message in the following JSON format:
  {
    "escalationMessage": "",
    "ticketNumber": ""
  }`,
});

const escalateToSupportFlow = ai.defineFlow(
  {
    name: 'escalateToSupportFlow',
    inputSchema: EscalationInputSchema,
    outputSchema: EscalationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
