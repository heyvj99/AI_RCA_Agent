import { ReportHeader } from './ReportHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyFindings } from './KeyFindings';
import { Recommendations } from './Recommendations';
import { ChartSection } from './ChartSection';
import { RecommendedTasks, type RecommendedTask } from './RecommendedTasks';
import { QuerySuggestions } from './QuerySuggestions';
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
  recommendedTasks?: RecommendedTask[];
  charts?: {
    title: string;
    content: React.ReactNode;
    fullWidth?: boolean;
  }[];
  isStreaming?: boolean;
  isInitialState?: boolean;
  onQuerySelect?: (query: string) => void;
}

export function Report({
  title,
  metadata,
  executiveSummary,
  findings,
  recommendations,
  recommendedTasks,
  charts = [],
  isStreaming = false,
  isInitialState = false,
  onQuerySelect,
}: ReportProps) {
  // Show initial state with query suggestions
  if (isInitialState && !isStreaming) {
    return (
      <div 
        className="w-full h-full bg-gray-50 relative flex flex-col"
        style={{
          backgroundImage: 'radial-gradient(circle, slate-50/15% 0.25px, transparent 0.25px)',
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0',
        }}
      >
        <div className="relative z-10 flex-1 overflow-auto flex justify-center">
          <QuerySuggestions onQuerySelect={onQuerySelect} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full bg-gray-50 relative flex flex-col"
      style={{
        backgroundImage: 'radial-gradient(circle, slate-50/15% 0.25px, transparent 0.25px)',
        backgroundSize: '18px 18px',
        backgroundPosition: '0 0',
      }}
    >
      <div className="relative z-10 flex-shrink-0 flex justify-center">
        <ReportHeader title={title} metadata={metadata} />
      </div>
      
      <div className="relative z-10 flex-1 overflow-auto flex justify-center">
        <div className="p-4 space-y-4 max-w-[992px] w-full">
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
              
              {recommendedTasks && recommendedTasks.length > 0 && (
                <RecommendedTasks tasks={recommendedTasks} />
              )}
              
              {/* <KeyFindings findings={findings} /> */}
              
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

