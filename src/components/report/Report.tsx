import { ReportHeader } from './ReportHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyFindings } from './KeyFindings';
import { Recommendations } from './Recommendations';
import { ChartSection } from './ChartSection';
import { Skeleton } from '../ui/skeleton';

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
  isStreaming?: boolean;
}

export function Report({
  title,
  metadata,
  executiveSummary,
  findings,
  recommendations,
  charts = [],
  isStreaming = false,
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
          {isStreaming ? (
            // Loading skeleton state
            <>
              {/* Executive Summary Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-700 mb-3">Executive Summary</h3>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              {/* Key Findings Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-700 mb-3">Key Findings</h3>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Recommendations Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-700 mb-3">Recommendations</h3>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Charts Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-700 mb-3">Charts</h3>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </>
          ) : (
            // Normal content when not streaming
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

