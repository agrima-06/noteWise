// gemini.ts = "How do I communicate with Gemini?"
// route.ts = "How does my application receive a user's request and ask Gemini to process it?"
// page.tsx = "How does the user interact with my application?"

import { GoogleGenAI, Type } from "@google/genai";

// Creating a Gemini client using the API key stored in my project.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export type SummaryResult = {
  summary: string[];
  keywords: string[];
  beginner_explanation: string;
};

export async function generateSummary(
  notes: string
): Promise<SummaryResult> {
  const prompt = `
You are NoteWise AI, an educational notes assistant.

Analyze the following notes and return a structured response.

Your response must contain:

1. summary:
   - 4 to 7 concise bullet points
   - Capture the most important concepts and facts
   - Keep the language clear and easy to understand

2. keywords:
   - 5 to 10 important keywords or concepts
   - Avoid unnecessary or generic words

3. beginner_explanation:
   - Explain the notes in simple, beginner-friendly language
   - Use an analogy or simple example when helpful
   - Assume the reader has no prior knowledge

Important rules:
- Use only information supported by the notes.
- Do not invent facts.
- Keep the explanation accurate.
- Return only the requested structured response.

NOTES:
${notes}
`;

  const config = {
    responseMimeType: "application/json",

    responseSchema: {
      type: Type.OBJECT,

      properties: {
        summary: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },

        keywords: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },

        beginner_explanation: {
          type: Type.STRING,
        },
      },

      required: [
        "summary",
        "keywords",
        "beginner_explanation",
      ],
    },
  };

  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash",
  ];

  let lastError: unknown;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        console.log(
          `Trying ${model} (attempt ${attempt + 1}/3)...`
        );

        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });

        if (!response.text) {
          throw new Error("Gemini returned an empty response.");
        }

        return JSON.parse(response.text) as SummaryResult;
      } catch (error: any) {
        lastError = error;

        const status = error?.status;

        console.error(
          `${model} failed on attempt ${attempt + 1}:`,
          error
        );

        // Retry only temporary server/rate-limit errors.
        if (
          status !== 503 &&
          status !== 429 &&
          status !== 500 &&
          status !== 502 &&
          status !== 504
        ) {
          throw error;
        }

        // Exponential backoff:
        // 1 second → 2 seconds → 4 seconds
        const delay = 1000 * Math.pow(2, attempt);

        console.log(
          `Retrying in ${delay / 1000} seconds...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }

    console.log(
      `${model} failed after 3 attempts. Trying fallback model...`
    );
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Gemini service is temporarily unavailable.");
}