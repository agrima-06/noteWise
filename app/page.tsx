"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NotesInput from "@/components/NotesInput";
import LoadingState from "@/components/LoadingState";
import ResultCard from "@/components/ResultCard";

type SummaryResult = {
  summary: string[];
  keywords: string[];
  beginner_explanation: string;
};

export default function Home() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setError("Please enter some notes first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (error) {
      console.error("Summarization error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to summarize notes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNotes("");
    setResult(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <NotesInput
          notes={notes}
          setNotes={setNotes}
          onSummarize={handleSummarize}
          onClear={handleClear}
          loading={loading}
        />

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        {loading && <LoadingState />}

        {result && !loading && (
          <ResultCard result={result} />
        )}
      </div>
    </main>
  );
}