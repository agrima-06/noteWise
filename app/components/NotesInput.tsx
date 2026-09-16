type NotesInputProps = {
  notes: string;
  setNotes: (notes: string) => void;
  onSummarize: () => void;
  onClear: () => void;
  loading: boolean;
};

export default function NotesInput({
  notes,
  setNotes,
  onSummarize,
  onClear,
  loading,
}: NotesInputProps) {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Your Notes
        </h2>

        <span className="text-sm text-gray-500">
          {notes.length} characters
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your class notes, article, or study material here..."
        className="min-h-[300px] w-full resize-none rounded-xl border border-gray-800 bg-black p-4 text-white outline-none placeholder:text-gray-600 focus:border-gray-500"
      />

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={onSummarize}
          disabled={loading}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Summarize Notes"}
        </button>

        <button
          onClick={onClear}
          disabled={loading}
          className="rounded-xl border border-gray-700 px-6 py-3 text-gray-300 transition hover:bg-gray-900 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </section>
  );
}