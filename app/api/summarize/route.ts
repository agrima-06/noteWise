import { generateSummary } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the data sent by the frontend
    const body = await request.json();

    const notes = body.notes;

    // Validate the user's input
    if (!notes || typeof notes !== "string") {
      return NextResponse.json(
        { error: "Notes are required." },
        { status: 400 }
      );
    }

    // Send the notes to Gemini
    const result = await generateSummary(notes);

    // Send Gemini's structured result back to the frontend
    return NextResponse.json(result);
  } catch (error) {
    console.error("Summarization error:", error);

    return NextResponse.json(
      { error: "Failed to summarize notes." },
      { status: 500 }
    );
  }
}