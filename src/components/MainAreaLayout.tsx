'use client';

import React from 'react';
import { Calendar, Tag, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import CollapsibleSidebar from './CollapsibleSidebar';
import { Report } from './report';
import ChatPanel from './ChatPanel';

interface MainAreaLayoutProps {
  children?: React.ReactNode;
}

const MainAreaLayout: React.FC<MainAreaLayoutProps> = ({ children }) => {
  // Sample data for the Report component
  const reportData = {
    title: "Root Cause Analysis Report",
    metadata: [
      { icon: <Calendar className="w-4 h-4" />, label: "Dec 15, 2024" },
      { icon: <Tag className="w-4 h-4" />, label: "System Analysis" },
      { icon: <AlertTriangle className="w-4 h-4" />, label: "Critical Issues Found" }
    ],
    executiveSummary: "This comprehensive analysis reveals significant performance degradation in our system infrastructure. The investigation identified multiple root causes including insufficient server resources, inefficient database queries, and memory allocation issues. Immediate action is required to prevent further system instability.",
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
    charts: [
      {
        title: "Performance Metrics Over Time",
        content: (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">Performance Chart</p>
            </div>
          </div>
        )
      },
      {
        title: "Resource Utilization",
        content: (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Resource Chart</p>
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Left Panel - Collapsible Sidebar */}
      <CollapsibleSidebar />

      {/* Center Panel - Report */}
      <div className="flex-1">
        <Report {...reportData} />
        {children}
      </div>

      {/* Right Panel - Chat */}
      <div className="w-96 p-0 border-l border-gray-200">
        <ChatPanel />
      </div>
    </div>
  );
};

export default MainAreaLayout;
