// gemini.ts = "How do I communicate with Gemini?"
// route.ts = "How does my application receive a user's request and ask Gemini to process it?"
// page.tsx = "How does the user interact with my application?"


import { GoogleGenAI, Type } from "@google/genai";
//Creating a Gemini client using the API key stored in my project.
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
    //the prompt we're sending to the model.
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

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",//Use this Gemini model for the generation.
    contents: prompt,//the prompt we're sending to the model.

    config: {
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
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(response.text) as SummaryResult;
}