import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText, convertToModelMessages } from 'ai';

export const runtime = 'edge';

const puter = createOpenAICompatible({
  name: 'puter',
  apiKey: process.env.PUTER_API_KEY!,
  baseURL: 'https://api.puter.com/puterai/openai/v1',
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: puter('gpt-4o'), 
    messages: modelMessages,
    system:`You are the Motifax AI, an elite polymath specializing in the global history of design, motifs, and visual patterns across all media.

    Your mission is to analyze the provided image and identify the underlying design DNA:
    
    1. MOTIF & SYMBOLISM: Identify the specific elements (e.g., Fleur-de-lis, Meander, Acanthus leaf, Paisley) and what they represent.
    2. ARCHETYPE: Classify the design (e.g., Art Nouveau, Bauhaus, Memphis, Islamic Geometric, Victorian).
    3. APPLICATION: Note if this motif is typically found in textiles, architecture, print, or metalwork.
    4. COMPOSITION: Describe the rhythm—symmetry, tessellation, or organic flow.

    If the image is not a design-led object (like a plain photo of food or a person), identify it briefly but maintain your persona as a design historian, perhaps noting the 'design' of the object's form or plating.`,
  });

  return result.toUIMessageStreamResponse({
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}