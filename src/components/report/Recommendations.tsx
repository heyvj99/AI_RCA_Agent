interface Recommendation {
  text: string;
  link?: {
    text: string;
    url: string;
  };
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-white p-8 rounded-lg border border-slate-200">
      <h2 className="text-base font-semibold text-slate-900 mb-4">
        Recommendations
      </h2>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className="text-slate-700 leading-relaxed">
              {rec.text}
              {rec.link && (
                <>
                  {' '}
                  <a
                    href={rec.link.url}
                    className="text-blue-600 hover:text-blue-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rec.link.text}
                  </a>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

