interface ExecutiveSummaryProps {
  content: string;
}

export function ExecutiveSummary({ content }: ExecutiveSummaryProps) {
  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Executive Summary
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

