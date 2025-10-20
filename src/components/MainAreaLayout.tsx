'use client';

import React, { useState } from 'react';
import { Calendar, Tag, AlertTriangle } from 'lucide-react';
import CollapsibleSidebar from './CollapsibleSidebar';
import { Report } from './report';
import ChatPanel from './ChatPanel';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from './ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Bar, BarChart, LabelList } from 'recharts';
import { performanceData, chartConfig } from '../data/chartData';

interface MainAreaLayoutProps {
  children?: React.ReactNode;
}

const MainAreaLayout: React.FC<MainAreaLayoutProps> = ({ children }) => {
  const [isStreaming, setIsStreaming] = useState(false);

  // Sales performance data for bar chart
  const salesPerformanceData = [
    { month: "January", revenue: 52000 },
    { month: "February", revenue: 48000 },
    { month: "March", revenue: 51000 },
    { month: "April", revenue: 62000 },
    { month: "May", revenue: 60000 },
    { month: "June", revenue: 58000 },
    { month: "July", revenue: 54000 },
    { month: "August", revenue: 66000 },
    { month: "September", revenue: 69000 },
    { month: "October", revenue: 75000 },
    { month: "November", revenue: 72000 },
    { month: "December", revenue: 88000 }
  ];

  // Chart config for bar chart
  const barChartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6", // Blue
    },
    label: {
      color: "#ffffff",
    },
  };

  // Compute a responsive height for the vertical bar chart so it doesn't
  // constrain the main layout horizontally while allowing ample vertical space.
  // Each bar gets a fixed row height; extra space is added for padding/legend.
  const barRowHeight = 32; // px per bar (thickness + gap) - reduced for tighter spacing
  const barChartHeight = salesPerformanceData.length * barRowHeight + 120;

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
        title: "Sales Performance & Cost Analysis",
        content: (
          <ChartContainer config={chartConfig} className="w-full h-80">
            <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <ChartLegend 
                content={<ChartLegendContent />}
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="marketing"
                stroke="var(--color-marketing)"
                strokeWidth={2}
                dot={{ fill: "var(--color-marketing)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="operations"
                stroke="var(--color-operations)"
                strokeWidth={2}
                dot={{ fill: "var(--color-operations)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="support"
                stroke="var(--color-support)"
                strokeWidth={2}
                dot={{ fill: "var(--color-support)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )
      },
      {
        title: "Sales Performance vs Targets",
        content: (
          <ChartContainer
            config={barChartConfig}
            className="w-full aspect-auto"
            style={{ height: barChartHeight }}
          >
            <BarChart
              accessibilityLayer
              data={salesPerformanceData}
              layout="vertical"
              margin={{
                right: 96,
                top: 16,
                bottom: 56,
                left: 24,
              }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                width={0}
                hide
              />
              <XAxis 
                dataKey="revenue" 
                type="number" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 8, fill: '#6b7280' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={[0, 100000]}
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend 
                content={<ChartLegendContent />}
                verticalAlign="bottom"
                height={50}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar
                dataKey="revenue"
                layout="vertical"
                fill="#3b82f6"
                radius={[0, 8, 8, 0]}
                maxBarSize={40}
                barSize={20}
              >
                <LabelList
                  dataKey="month"
                  position="insideLeft"
                  offset={12}
                  className="fill-white font-semibold"
                  fontSize={14}
                />
                <LabelList
                  dataKey="revenue"
                  position="right"
                  offset={12}
                  className="fill-slate-700 font-medium"
                  fontSize={13}
                  formatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
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
        <Report {...reportData} isStreaming={isStreaming} />
        {children}
      </div>

      {/* Right Panel - Chat */}
      <div className="w-96 p-0 border-l border-gray-200">
        <ChatPanel onStreamingChange={setIsStreaming} />
      </div>
    </div>
  );
};

export default MainAreaLayout;
