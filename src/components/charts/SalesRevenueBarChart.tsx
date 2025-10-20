'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '../ui/chart';

type SalesRecord = { month: string; revenue: number; targetn: number };

interface SalesRevenueLineChartProps {
  data?: SalesRecord[];
}

const DEFAULT_DATA: SalesRecord[] = [
  { month: 'January', revenue: 52000, targetn: 60000 },
  { month: 'February', revenue: 48000, targetn: 57000 },
  { month: 'March', revenue: 51000, targetn: 62000 },
  { month: 'April', revenue: 62000, targetn: 64000 },
  { month: 'May', revenue: 60000, targetn: 65000 },
  { month: 'June', revenue: 58000, targetn: 61000 },
  { month: 'July', revenue: 54000, targetn: 59000 },
  { month: 'August', revenue: 66000, targetn: 68000 },
  { month: 'September', revenue: 69000, targetn: 70000 },
  { month: 'October', revenue: 75000, targetn: 76000 },
  { month: 'November', revenue: 72000, targetn: 74000 },
  { month: 'December', revenue: 88000, targetn: 82000 },
];

const chartConfig = {
  revenue: {
    label: 'Performance',
    color: '#3b82f6',
  },
  targetn: {
    label: 'Target',
    color: '#94a3b8',
  },
};

const SalesRevenueBarChart: React.FC<SalesRevenueLineChartProps> = ({ data }) => {
  const chartData = (data ?? DEFAULT_DATA).map((d) => ({
    month: d.month,
    revenue: d.revenue,
    targetn: d.targetn,
  }));

  return (
    <ChartContainer config={chartConfig} className="w-full h-80">
      <LineChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(value) => (typeof value === 'string' ? value.slice(0, 3) : value)}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
        <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-revenue)', strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="targetn"
          stroke="var(--color-targetn)"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default SalesRevenueBarChart;
