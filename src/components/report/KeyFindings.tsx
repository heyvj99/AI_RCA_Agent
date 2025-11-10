interface Finding {
  title: string;
  description: string;
}

interface KeyFindingsProps {
  findings: Finding[];
}

export function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="bg-white p-8 rounded-lg border border-slate-200">
      <h2 className="text-base font-semibold text-slate-900 mb-4">
        Key Findings
      </h2>
      <div className="space-y-4">
        {findings.map((finding, index) => (
          <div key={index} className="text-sm">
            <h3 className="font-semibold text-slate-900 mb-1">
              {finding.title}
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {finding.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

