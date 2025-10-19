interface ChartSectionProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function ChartSection({ title, children, fullWidth = true }: ChartSectionProps) {
  return (
    <div className={`bg-white p-8 rounded-lg border border-gray-200 ${fullWidth ? 'w-full' : ''}`}>
      <h3 className="text-base font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="w-full">{children}</div>
    </div>
  );
}

