'use client';

import { MessageCircle, MoreVertical, Sparkles, ArrowUp, ArrowDown, UserPlus, TrendingUp, ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown, X, CheckSquare, Share } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import { Progress } from '../ui/progress';
import { useState, useEffect, useRef } from 'react';

export type ImpactLevel = 'High' | 'Medium' | 'Low';
export type MetricType = 'Revenue' | 'Costs' | 'Conversion' | 'Ad Spend' | 'AOV' | 'Stockouts';

export interface RecommendedTask {
  id: string;
  title: string;
  description: string;
  skuCount: number | null;
  metric: {
    type: MetricType;
    direction: 'up' | 'down';
  };
  impact: ImpactLevel;
}

export interface RecommendedTasksProps {
  tasks: RecommendedTask[];
  completedCount?: number;
  insight?: string;
  summaryCards?: {
    value: string;
    label: string;
    boldText?: string;
  }[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const getImpactColor = (impact: ImpactLevel): string => {
  switch (impact) {
    case 'High':
      return 'text-green-600';
    case 'Medium':
      return 'text-lime-500';
    case 'Low':
      return 'text-yellow-500';
    default:
      return 'text-gray-600';
  }
};

const getImpactIcon = (impact: ImpactLevel) => {
  // Using a simple checkmark circle for impact
  return (
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
      impact === 'High' ? 'bg-green-100' : impact === 'Medium' ? 'bg-lime-100' : 'bg-yellow-100'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        impact === 'High' ? 'bg-green-600' : impact === 'Medium' ? 'bg-lime-500' : 'bg-yellow-500'
      }`} />
    </div>
  );
};

const getMetricIcon = (direction: 'up' | 'down') => {
  return direction === 'up' ? (
    <ArrowUp className="w-4 h-4 text-slate-500" />
  ) : (
    <ArrowDown className="w-4 h-4 text-slate-500" />
  );
};

export function RecommendedTasks({
  tasks,
  completedCount = 2,
  insight = "completing all actions by Friday could cut inventory aging by 15%.",
  summaryCards = [
    { value: '+$12K', label: 'potential overspend avoided.', boldText: 'overspend' },
    { value: '+5%', label: 'boost in RoAS achieved.', boldText: 'RoAS' },
    { value: '+$75K', label: 'potential revenue unlocked.', boldText: 'revenue' },
  ],
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: RecommendedTasksProps) {
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const todoCount = tasks.length - completedCount;
  const totalTasks = tasks.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        const dropdownElement = dropdownRefs.current.get(openDropdownId);
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const toggleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const toggleDropdown = (taskId: string) => {
    setOpenDropdownId(openDropdownId === taskId ? null : taskId);
  };

  const handleMenuAction = (taskId: string, action: string) => {
    console.log(`Action "${action}" clicked for task ${taskId}`);
    setOpenDropdownId(null);
    // Add your action handlers here
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action "${action}" clicked for ${selectedTasks.size} tasks`);
    // Add your bulk action handlers here
  };

  const clearSelection = () => {
    setSelectedTasks(new Set());
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-900">Recommended Tasks</h2>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <MessageCircle className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Progress and Summary Section */}
      <div className="flex flex-col gap-5 mb-4">
        {/* Top : Progress and Insight */}
        <div className="flex flex-row gap-4 w-full">
          {/* Progress - 50% width */}
          <div className="flex flex-col gap-1.5 w-1/2">
            <div className="flex items-end justify-between">
              <div className="text-base font-medium text-slate-700">
                <span>{todoCount} To-Do, </span>
                <span className="text-slate-500">{completedCount} Completed</span>
              </div>
              <div className="text-sm text-slate-500">
                {completedCount}/{totalTasks}
              </div>
            </div>
            <Progress 
              value={40} 
              className="bg-violet-50 border border-violet-400 h-1.5"
              indicatorClassName="bg-violet-600"
            />
          </div>

          {/* Insight Box - 50% width */}
          <div className="bg-white border violet-100 rounded-sm p-2 w-1/2">
            <div className="flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 leading-5">{insight}</p>
            </div>
          </div>
        </div>

        {/* Bottom : Summary Cards */}
        <div className="flex gap-2 flex-1">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-b from-violet-50 to-white border border-violet-200 rounded-sm p-2 flex flex-col justify-between min-h-[80px]"
            >
              <p className="text-lg font-medium text-gray-600">{card.value}</p>
              <p className="text-sm text-slate-500">
                {card.label.split(card.boldText || '').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && card.boldText && (
                      <span className="font-medium text-slate-950">{card.boldText}</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Container for Action Bar and Table */}
      <div>
        {/* Action Bar - appears when rows are selected */}
        {selectedTasks.size > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 pb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-gray-900">
                  {selectedTasks.size} {selectedTasks.size === 1 ? 'task' : 'tasks'} selected
                </span>
              </div>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              {/* <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-200 text-xs font-medium"
                onClick={() => handleBulkAction('Take Action')}
              >
                <TrendingUp className="w-3 h-3 mr-1.5" />
                Take Action
              </Button> */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-gray-200 text-xs font-medium flex items-center gap-1"
                  onClick={() => handleBulkAction('Assign to')}
                >
                  <UserPlus className="w-3 h-3 mr-1.5" />
                  Assign to
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200"
                onClick={() => handleBulkAction('Export')}
              >
                <Share className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className={`border border-slate-200 rounded-sm overflow-hidden ${selectedTasks.size > 0 ? '-mt-4' : ''}`}>
        <Table>
          <TableHeader>
            <TableRow className="bg-violet-50 border-b border-slate-200 hover:bg-violet-50 [&>th]:border-0">
              <TableHead className="w-10 p-2 border-r border-slate-200">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                    checked={selectedTasks.size === tasks.length && tasks.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTasks(new Set(tasks.map(t => t.id)));
                      } else {
                        setSelectedTasks(new Set());
                      }
                    }}
                  />
                </div>
              </TableHead>
              <TableHead className="w-[326px] p-2 border-r border-slate-200">
                <p className="text-sm font-medium text-gray-900">Recommended Tasks</p>
              </TableHead>
              <TableHead className="w-[120px] p-2 border-r border-slate-200">
                <p className="text-sm font-medium text-gray-900">No. of SKUs</p>
              </TableHead>
              <TableHead className="w-[120px] p-2 border-r border-slate-200">
                <p className="text-sm font-medium text-gray-900">Metrics</p>
              </TableHead>
              <TableHead className="w-[120px] p-2 border-r border-slate-200">
                <p className="text-sm font-medium text-gray-900">Impact</p>
              </TableHead>
              <TableHead className="flex-1 p-2">
                <p className="text-sm font-medium text-gray-900">Actions</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="group bg-white hover:bg-gray-50 transition-colors border-b border-slate-200 [&>td]:border-0">
                <TableCell className="w-10 p-2 border-r border-slate-200 whitespace-normal">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      checked={selectedTasks.has(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                    />
                  </div>
                </TableCell>
                <TableCell className="w-[326px] p-2 border-r border-slate-200 min-h-[87px] whitespace-normal">
                  <div className="flex flex-col justify-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-slate-500 leading-5 line-clamp-2">{task.description}</p>
                  </div>
                </TableCell>
                <TableCell className="w-[120px] p-2 border-r border-slate-200 whitespace-normal">
                  <p className="text-sm text-slate-500">
                    {task.skuCount !== null ? task.skuCount : '-'}
                  </p>
                </TableCell>
                <TableCell className="w-[120px] p-2 border-r border-slate-200 whitespace-normal">
                  <div className="flex items-center gap-0.5">
                    {getMetricIcon(task.metric.direction)}
                    <span className="text-sm text-slate-500">{task.metric.type}</span>
                  </div>
                </TableCell>
                <TableCell className="w-[120px] p-2 border-r border-slate-200 whitespace-normal">
                  <div className="flex items-center gap-0.5 justify-center">
                    {getImpactIcon(task.impact)}
                    <span className={`text-sm font-medium ${getImpactColor(task.impact)}`}>
                      {task.impact}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="flex-1 p-2 whitespace-normal">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-200"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                    <div 
                      className="relative" 
                      ref={(el) => {
                        if (el) {
                          dropdownRefs.current.set(task.id, el);
                        } else {
                          dropdownRefs.current.delete(task.id);
                        }
                      }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-gray-200 text-xs font-medium flex items-center gap-1"
                        onClick={() => toggleDropdown(task.id)}
                      >
                        Take Action
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                      {openDropdownId === task.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <ul className="py-1">
                            <li>
                              <button
                                onClick={() => handleMenuAction(task.id, 'Take Action')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Take Action
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleMenuAction(task.id, 'Assign to')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Assign to
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-1 p-3 bg-white">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 h-8 px-4 py-2 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          {(() => {
            const pages: (number | 'ellipsis')[] = [];
            const showEllipsis = totalPages > 5;
            
            if (!showEllipsis) {
              // Show all pages if 5 or fewer
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Always show first page
              pages.push(1);
              
              if (currentPage > 3) {
                pages.push('ellipsis');
              }
              
              // Show pages around current page
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);
              
              for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                  pages.push(i);
                }
              }
              
              if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
              }
              
              // Always show last page
              if (totalPages > 1) {
                pages.push(totalPages);
              }
            }
            
            return pages.map((item, index) => {
              if (item === 'ellipsis') {
                return (
                  <div key={`ellipsis-${index}`} className="h-8 w-8 flex items-center justify-center">
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                  </div>
                );
              }
              
              const page = item;
              const isActive = page === currentPage;
              
              return (
                <button
                  key={page}
                  onClick={() => !isActive && handlePageChange(page)}
                  className={`h-8 w-8 flex items-center justify-center rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-white border border-slate-200 text-slate-500'
                      : 'text-slate-500 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            });
          })()}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 h-8 px-4 py-2 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

