'use client';

import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, BarChart3, DollarSign, ShoppingCart, Zap } from 'lucide-react';

interface QuerySuggestion {
  id: string;
  query: string;
  icon?: React.ReactNode;
  source?: string;
  isTemplate?: boolean;
}

interface QuerySuggestionsProps {
  onQuerySelect?: (query: string) => void;
}

const suggestions: QuerySuggestion[] = [
  {
    id: '1',
    query: "Analyze sales performance by product category for Q3 2024. Show revenue trends, top performers, and identify underperforming categories.",
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    source: "Sales Dashboard Q3 2024"
  },
  {
    id: '2',
    query: "What's the ROI of our marketing campaigns this month? Break down by channel (Google Ads, Facebook, Email) and show cost per acquisition.",
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    isTemplate: true
  },
  {
    id: '3',
    query: "Identify products with high cart abandonment rates and suggest pricing or promotion strategies to improve conversion.",
    icon: <ShoppingCart className="w-5 h-5 text-purple-600" />,
    isTemplate: true
  },
  {
    id: '4',
    query: "Compare this month's sales to last month. Highlight key drivers of change and recommend actions to optimize performance.",
    icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
    isTemplate: true
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, Sales Analyst</h1>
        <p className="text-lg text-gray-600">How can I help you analyze your ecommerce performance today?</p>
      </div>

      {/* Suggested Actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors border border-green-200">
          Connect your data source
        </button>
        <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">
          Upload sales report
        </button>
        <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">
          Ask your first question
        </button>
        <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">
          Use a template
        </button>
      </div>

      {/* Query Suggestion Cards */}
      <div className="mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-700">Suggested</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="p-5 cursor-pointer hover:shadow-md transition-shadow border-gray-200 bg-white"
            onClick={() => handleCardClick(suggestion.query)}
          >
            <div className="flex flex-col h-full">
              {suggestion.icon && (
                <div className="mb-3">
                  {suggestion.icon}
                </div>
              )}
              <p className="text-sm text-gray-700 mb-3 line-clamp-3 flex-1">
                {suggestion.query}
              </p>
              <div className="mt-auto pt-3 border-t border-gray-100">
                {suggestion.isTemplate ? (
                  <span className="text-xs text-gray-500">Use template</span>
                ) : (
                  <span className="text-xs text-gray-500">{suggestion.source}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

