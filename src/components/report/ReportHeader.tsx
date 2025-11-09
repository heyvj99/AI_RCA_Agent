interface ReportHeaderProps {
  title: string;
  metadata?: {
    icon?: React.ReactNode;
    label: string;
  }[];
}

export function ReportHeader({ title, metadata }: ReportHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white w-full">
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      {metadata && metadata.length > 0 && (
        <div className="flex items-center justify-between gap-6 px-4 py-3 border-t border-gray-100">
          {metadata.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

