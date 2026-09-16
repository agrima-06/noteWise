export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
      <div className="mb-5 inline-flex rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm text-gray-400">
        ✦ AI-powered learning assistant
      </div>

      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Turn messy notes into
        <span className="block text-gray-400">
          clear knowledge.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
        Paste your notes and let AI transform them into concise
        summaries, important keywords, and beginner-friendly
        explanations.
      </p>
    </section>
  );
}