'use client';

import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, BarChart3, DollarSign, ShoppingCart, Zap, Timer, TimerIcon, History } from 'lucide-react';

interface QuerySuggestion {
  id: string;
  query: string;
  icon?: React.ReactNode;
  iconBgColor: string;
  skill: 'Weekly Business Review' | 'Root Cause Analysis' | 'Gap to Plan' | 'Phantom Inventory Analysis';
}

interface QuerySuggestionsProps {
  onQuerySelect?: (query: string) => void;
}

const suggestions: QuerySuggestion[] = [
  {
    id: '1',
    query: "Analyze sales performance by product category for Q3 2024. Show revenue trends, top performers, and identify underperforming categories.",
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    iconBgColor: 'bg-blue-100',
    skill: 'Weekly Business Review'
  },
  {
    id: '2',
    query: "What's the ROI of our marketing campaigns this month? Break down by channel (Google Ads, Facebook, Email) and show cost per acquisition.",
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    iconBgColor: 'bg-green-100',
    skill: 'Root Cause Analysis'
  },
  {
    id: '3',
    query: "Identify products with high cart abandonment rates and suggest pricing or promotion strategies to improve conversion.",
    icon: <ShoppingCart className="w-5 h-5 text-purple-600" />,
    iconBgColor: 'bg-purple-100',
    skill: 'Gap to Plan'
  },
  {
    id: '4',
    query: "Compare this month's sales to last month. Highlight key drivers of change and recommend actions to optimize performance.",
    icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
    iconBgColor: 'bg-orange-100',
    skill: 'Phantom Inventory Analysis'
  }
];

export function QuerySuggestions({ onQuerySelect }: QuerySuggestionsProps) {
  const handleCardClick = (query: string) => {
    if (onQuerySelect) {
      onQuerySelect(query);
    }
  };

  return (
    <div className="w-full max-w-[992px] mx-auto px-4 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-900 mb-2">Hello, VJ</h1>
        <p className="text-md text-slate-600">What would you like to explore today?</p>
      </div>

      {/* Suggested Actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
          Connect your data source
        </button>
        <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
          Upload sales report
        </button>
        <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
          Use a template
        </button>
      </div>

      {/* Query Suggestion Cards */}
      <div className="mb-4 flex items-center gap-2">
        <History className="w-4 h-4 text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-700">Recents</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="p-5 cursor-pointer hover:shadow-md transition-shadow border-slate-200 bg-white"
            onClick={() => handleCardClick(suggestion.query)}
          >
            <div className="flex flex-col h-full">
              {suggestion.icon && (
                <div className={`mb-3 w-10 h-10 rounded-lg ${suggestion.iconBgColor} flex items-center justify-center`}>
                  {suggestion.icon}
                </div>
              )}
              <p className="text-sm text-slate-700 mb-3 line-clamp-3 flex-1">
                {suggestion.query}
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                  {suggestion.skill}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

