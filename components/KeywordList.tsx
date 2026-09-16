type KeywordListProps = {
  keywords: string[];
};

export default function KeywordList({
  keywords,
}: KeywordListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span
          key={`${keyword}-${index}`}
          className="rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}