'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '../ui/chart';
import { performanceData, chartConfig } from '@/data/chartData';

const SalesCostLineChart: React.FC = () => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-80">
      <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: '#666' }}
          tickFormatter={(value) => (typeof value === 'string' ? value.slice(0, 3) : value)}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: '#666' }}
          tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
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
          dot={{ fill: 'var(--color-sales)', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="marketing"
          stroke="var(--color-marketing)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-marketing)', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="operations"
          stroke="var(--color-operations)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-operations)', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="support"
          stroke="var(--color-support)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-support)', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default SalesCostLineChart;


