import KeywordList from "./KeywordList";

type SummaryResult = {
  summary: string[];
  keywords: string[];
  beginner_explanation: string;
};

type ResultCardProps = {
  result: SummaryResult;
};

export default function ResultCard({
  result,
}: ResultCardProps) {
  return (
    <div className="mt-8 space-y-6">

      {/* Summary */}
      <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Summary
        </h2>

        <ul className="space-y-3">
          {result.summary.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 text-gray-300"
            >
              <span className="text-gray-500">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Keywords */}
      <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Important Keywords
        </h2>

        <KeywordList keywords={result.keywords} />
      </section>

      {/* Beginner Explanation */}
      <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Explain It Simply
        </h2>

        <p className="leading-7 text-gray-300">
          {result.beginner_explanation}
        </p>
      </section>

    </div>
  );
}