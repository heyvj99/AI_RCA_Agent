'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ScanText, ListTodo } from 'lucide-react';
import CollapsibleSidebar, { CollapsibleSidebarRef } from './CollapsibleSidebar';
import { Report } from './report';
import type { RecommendedTask } from './report';
import ChatPanel from './ChatPanel';
import SalesCostLineChart from './charts/SalesCostLineChart';
import SalesRevenueBarChart from './charts/SalesRevenueBarChart';

interface MainAreaLayoutProps {
  children?: React.ReactNode;
}

const MainAreaLayout: React.FC<MainAreaLayoutProps> = ({ children }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [previousStreamingState, setPreviousStreamingState] = useState(false);
  const [hasQueries, setHasQueries] = useState(false);
  const [hasCompletedFirstReport, setHasCompletedFirstReport] = useState(false);
  const [externalQuery, setExternalQuery] = useState<string | null>(null);
  const sidebarRef = useRef<CollapsibleSidebarRef>(null);

  // Track streaming state changes to move task to completed when report is generated
  useEffect(() => {
    // When streaming stops (was true, now false), move task to completed
    // Only move if we actually had streaming (previousStreamingState was true)
    if (previousStreamingState && !isStreaming && currentTaskId) {
      const taskIdToMove = currentTaskId;
      // Clear currentTaskId immediately to prevent duplicate calls
      setCurrentTaskId(null);
      // Mark that we've completed at least one report
      setHasCompletedFirstReport(true);
      // Small delay to ensure state updates are complete
      setTimeout(() => {
        sidebarRef.current?.moveTaskToCompleted(taskIdToMove, 2);
      }, 100);
    }
    setPreviousStreamingState(isStreaming);
  }, [isStreaming, currentTaskId, previousStreamingState]);

  // Handle new query - add task to sidebar
  const handleNewQuery = (query: string) => {
    setHasQueries(true); // Mark that queries have been submitted
    if (sidebarRef.current) {
      const taskId = sidebarRef.current.addNewTask({
        tag: 'Root Cause Analysis',
        mainText: query.length > 60 ? query.substring(0, 60) + '...' : query,
        question: query,
      });
      setCurrentTaskId(taskId);
    }
  };

  // Handle query selection from suggestion cards
  const handleQuerySelect = (query: string) => {
    setExternalQuery(query);
    // Clear it after a moment so the same query can be triggered again if needed
    setTimeout(() => setExternalQuery(null), 100);
  };

  // Sample data for the Report component
  const reportData = {
    title: "Root Cause Analysis Report",
    metadata: [
      { icon: <Calendar className="w-4 h-4" />, label: "Oct 15, 2025" },
      { icon: <ScanText className="w-4 h-4" />, label: "Root Cause Analysis" },
      { icon: <ListTodo className="w-4 h-4" />, label: "5 Recommended Tasks" }
    ],
    executiveSummary: `Overall sales showed a **moderate fluctuation** this period, influenced by shifts in **pricing, promotions, and product availability**.

- **Performance Overview:** Sales changed by **9%** compared to the previous period, mainly due to movement in high-contribution categories.

- **Key Drivers:**
  - 📉 *Decline factors:* Lower ad visibility, competitor discounting, and temporary stockouts.
  - 📈 *Growth levers:* Successful promotions and improved conversion on refreshed product pages.`,
    findings: [
      {
        title: "Server Resource Constraints",
        description: "CPU usage consistently exceeds 90% during peak hours, with memory consumption showing a gradual upward trend indicating potential memory leaks."
      },
      {
        title: "Database Performance Issues", 
        description: "Query execution times have increased by 300% over the past week, with several queries taking over 5 seconds to complete."
      },
      {
        title: "Memory Allocation Problems",
        description: "Memory usage patterns show gradual increases over time without corresponding decreases, suggesting memory leaks in the application code."
      }
    ],
    recommendations: [
      {
        text: "Scale server resources immediately to handle current load",
        link: { text: "View scaling options", url: "#" }
      },
      {
        text: "Optimize database queries and implement query caching",
        link: { text: "Query optimization guide", url: "#" }
      },
      {
        text: "Implement comprehensive memory monitoring and leak detection",
        link: { text: "Memory monitoring setup", url: "#" }
      }
    ],
    recommendedTasks: [
      {
        id: '1',
        title: 'Boost Discounts on Slow-Movers',
        description: 'These SKUs have been sitting in inventory longer than expected. A small discount increase can unlock higher conversions.',
        skuCount: 12,
        metric: {
          type: 'Revenue',
          direction: 'up'
        },
        impact: 'High'
      },
      {
        id: '2',
        title: 'Shift Ad Budget to Winning Category',
        description: 'Home Appliances are outperforming all other categories in CTR and ROAS this week.',
        skuCount: 4,
        metric: {
          type: 'Costs',
          direction: 'down'
        },
        impact: 'Medium'
      },
      {
        id: '3',
        title: 'Create Bundles to Lift AOV',
        description: 'Customers frequently buy these items together. Bundling can tap into natural purchase behavior.',
        skuCount: 11,
        metric: {
          type: 'AOV',
          direction: 'up'
        },
        impact: 'High'
      },
      {
        id: '4',
        title: 'Run a Targeted Abandoned Cart Campaign',
        description: 'Several products are missing key terms, limiting organic discovery.',
        skuCount: null,
        metric: {
          type: 'Ad Spend',
          direction: 'down'
        },
        impact: 'Low'
      },
      {
        id: '5',
        title: 'Optimize SEO for Low-Visibility SKUs',
        description: 'A spike in recent abandoned carts shows strong recoverable intent.',
        skuCount: 8,
        metric: {
          type: 'Conversion',
          direction: 'up'
        },
        impact: 'High'
      }
    ] as RecommendedTask[],
    charts: [
      {
        title: "Sales Performance & Cost Analysis",
        content: (<SalesCostLineChart />)
      },
      {
        title: "Sales Performance vs Targets",
        content: (<SalesRevenueBarChart />)
      }
    ]
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Left Panel - Collapsible Sidebar */}
      <CollapsibleSidebar ref={sidebarRef}/>

      {/* Center Panel - Report */}
      <div className="flex-1">
        <Report 
          {...reportData} 
          isStreaming={isStreaming || (hasQueries && !hasCompletedFirstReport)} 
          isInitialState={!hasQueries}
          onQuerySelect={handleQuerySelect}
        />
        {children}
      </div>

      {/* Right Panel - Chat */}
      <div className="w-96 p-0 border-l border-gray-200">
        <ChatPanel 
          onStreamingChange={setIsStreaming}
          onNewQuery={handleNewQuery}
          externalQuery={externalQuery}
        />
      </div>
    </div>
  );
};

export default MainAreaLayout;
