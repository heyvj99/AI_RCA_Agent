import { ReportHeader } from './ReportHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyFindings } from './KeyFindings';
import { Recommendations } from './Recommendations';
import { ChartSection } from './ChartSection';

interface ReportProps {
  title: string;
  metadata?: {
    icon?: React.ReactNode;
    label: string;
  }[];
  executiveSummary: string;
  findings: {
    title: string;
    description: string;
  }[];
  recommendations: {
    text: string;
    link?: {
      text: string;
      url: string;
    };
  }[];
  charts?: {
    title: string;
    content: React.ReactNode;
    fullWidth?: boolean;
  }[];
}

export function Report({
  title,
  metadata,
  executiveSummary,
  findings,
  recommendations,
  charts = [],
}: ReportProps) {
  return (
    <div className="w-full h-full overflow-auto bg-gray-50 relative">
      {/* Dotted background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 2px, transparent 2px)',
          backgroundSize: '18px 18px',
        }}
      />
      
      <div className="relative z-10">
        <ReportHeader title={title} metadata={metadata} />
        
        <div className="p-4 space-y-4 max-w-[992px]">
          <ExecutiveSummary content={executiveSummary} />
          
          <KeyFindings findings={findings} />
          
          <Recommendations recommendations={recommendations} />
          
          {charts.map((chart, index) => (
            <ChartSection 
              key={index} 
              title={chart.title}
              fullWidth={chart.fullWidth}
            >
              {chart.content}
            </ChartSection>
          ))}
        </div>
      </div>
    </div>
  );
}

