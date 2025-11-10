import { MessageCircle, MoreVertical } from 'lucide-react';

interface ChartSectionProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function ChartSection({ title, children, fullWidth = true }: ChartSectionProps) {
  return (
    <div className={`bg-white p-8 rounded-lg border border-slate-200 ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-medium text-slate-900">{title}</h3>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded">
            <MessageCircle className="w-5 h-5 text-slate-500" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded">
            <MoreVertical className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

