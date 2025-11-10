'use client';

import React, { useState } from 'react';
import { RotateCw, List, ChevronRight, ChevronDown, Check, Circle, CircleCheck } from 'lucide-react';

export interface TaskCardProps {
  tag: string;
  mainText: string;
  question: string;
  status?: 'in-progress' | 'completed';
  completedAt?: string;
  pendingTasks?: number;
  highlighted?: boolean;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  tag,
  question,
  status,
  completedAt,
  pendingTasks,
  highlighted = false,
  className = '',
}) => {
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  const [isCompletedTasksExpanded, setIsCompletedTasksExpanded] = useState(false);

  // Dummy tasks data
  const dummyTasks = [
    'Shift ad spend to 4 top performers',
    'Pause 1 underperforming ad campaign',
  ];

  // Dummy completed tasks data
  const dummyCompletedTasks = [
    'Shift ad spend to 4 top performers',
    'Restock 2 high-demand out-of-stock SKUs',
    'Increase discounts on 6 slow movers',
    'Pause 1 underperforming ad campaign',
  ];

  const borderColor = highlighted 
    ? 'border-violet-300' 
    : status === 'in-progress' 
    ? 'border-gray-200' 
    : 'border-slate-300';

  const bgColor = (status === 'completed' && completedAt && (pendingTasks === 0 || pendingTasks === undefined))
    ? 'bg-transparent'
    : 'bg-white';

  return (
    <div className={`${bgColor} border rounded-lg ${borderColor} ${className}`}>
      <div className="flex flex-col gap-3 p-3">
        {/* Tag */}
        <div className="flex items-start">
          <div className="bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5">
            <p className="font-normal text-xs text-gray-500">{tag}</p>
          </div>
        </div>

        {/* Main Text */}
        <p className="font-medium text-sm text-gray-900 leading-5">
           Kellogg&apos;s: 10 Jul→16 Jul &apos;25 vs 03 Jul→09 Jul &apos;25
        </p>

        {/* Question */}
        <p className="font-normal text-sm text-gray-700 leading-5">
        A detailed report on <span className="">{question}</span>
        </p>

        {/* State 1: In-Progress - shows loading icon */}
        {status === 'in-progress' && (
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-purple-600 animate-spin" />
            <p className="font-normal text-sm text-purple-600">
              Blake is working on your request...
            </p>
          </div>
        )}

        {/* Completion timestamp - shown for completed reports */}
        {status === 'completed' && completedAt && (
          <p className="font-normal text-xs text-gray-500">
            Completed on {completedAt}
          </p>
        )}

        {/* Footer - State 2: Completed report but pending tasks */}
        {status === 'completed' && pendingTasks !== undefined && pendingTasks > 0 && (
          <div className="pt-2 border-t border-gray-100 bg-gray-50 -mx-3 -mb-3 px-3 pb-3 rounded-b-lg">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsTasksExpanded(!isTasksExpanded)}
            >
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-purple-600" />
                <p className="font-normal text-sm text-purple-600">
                  {pendingTasks} Tasks pending
                </p>
              </div>
              {isTasksExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </div>
            {isTasksExpanded && (
              <div className="mt-3 space-y-2">
                {dummyTasks.slice(0, pendingTasks).map((task, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Circle className="w-4 h-4 text-gray-400" fill="none" />
                    <p className="font-normal text-sm text-gray-700">{task}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer - State 3: Completed report and completed tasks */}
        {status === 'completed' && completedAt && (pendingTasks === 0 || pendingTasks === undefined) && (
          <div className="pt-2 border-t border-gray-100 -mx-3 -mb-3 px-3 pb-3 rounded-b-lg">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsCompletedTasksExpanded(!isCompletedTasksExpanded)}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <p className="font-medium text-sm text-gray-700">
                  Tasks Completed
                </p>
              </div>
              {isCompletedTasksExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </div>
            {isCompletedTasksExpanded && (
              <div className="mt-3 space-y-2">
                {dummyCompletedTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CircleCheck className="w-4 h-4 text-gray-400" />
                    <p className="font-normal text-sm text-gray-700">{task}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

