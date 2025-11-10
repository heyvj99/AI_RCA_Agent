'use client';

import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import {
  ChevronDown,
  List,
  Search,
  Check,
  ChevronLeft,
  ListTodo,
  Zap,
  Map,
  ScanText,
  Goal,
  Calendar,
  Package,
  MapIcon,
} from 'lucide-react';
import TaskCard, { TaskCardProps } from './TaskCard';

interface Task extends Omit<TaskCardProps, 'className'> {
  id: string;
}

export interface CollapsibleSidebarRef {
  addNewTask: (task: Omit<Task, 'id' | 'status'>) => string;
  moveTaskToCompleted: (taskId: string, pendingTasks?: number) => void;
  completeTaskItems: (taskId: string) => void;
}

interface CollapsibleSidebarProps {
  className?: string;
  onTaskAdded?: (taskId: string) => void;
}

const CollapsibleSidebar = forwardRef<CollapsibleSidebarRef, CollapsibleSidebarProps>(
  ({ className = '', onTaskAdded }, ref) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');
  const [isInProgressOpen, setIsInProgressOpen] = useState(true);
  const [isCompletedOpen, setIsCompletedOpen] = useState(true);
  
  // Task management state
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    // Existing completed tasks
    {
      id: 'task-1',
      tag: 'Root Cause Analysis',
      mainText: "Shark Ninja: 10 Jul→16 Jul '25 vs 03 Jul→09 Jul '25",
      question: "Which SKUs or categories show the highest price volatility right now?",
      status: 'completed',
      completedAt: '13 Apr 2025 at 12:34pm',
      pendingTasks: 2,
      highlighted: true,
    },
    {
      id: 'task-2',
      tag: 'Root Cause Analysis',
      mainText: "Kellog's: 01 Jul→31 Aug 2025 vs 01 Jul→31 Aug 2024",
      question: "Which SKUs or categories show the highest price volatility right now?",
      status: 'completed',
      completedAt: '13 Apr 2025 at 12:34pm',
      pendingTasks: 0,
    },
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Add a new task to in-progress section
  const addNewTask = useCallback((task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'in-progress',
    };
    setInProgressTasks(prev => [newTask, ...prev]);
    onTaskAdded?.(newTask.id);
    return newTask.id;
  }, [onTaskAdded]);

  // Move task from in-progress to completed (when report is generated)
  const moveTaskToCompleted = useCallback((taskId: string, pendingTasks: number = 2) => {
    // Find the task first
    setInProgressTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      if (!task) return prev;
      
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('en-GB', { month: 'short' });
      const year = now.getFullYear();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
      
      const completedTask: Task = {
        ...task,
        status: 'completed',
        completedAt: `${day} ${month} ${year} at ${displayHours}:${minutes}${ampm}`,
        pendingTasks,
        highlighted: true,
      };
      
      // Update completed tasks - check for duplicates before adding
      setCompletedTasks(completedPrev => {
        // Check if task already exists in completed tasks
        const alreadyExists = completedPrev.some(t => t.id === taskId);
        if (alreadyExists) {
          // If it exists, update it instead of adding a duplicate
          return completedPrev.map(t => t.id === taskId ? completedTask : t);
        }
        // Otherwise, add it to the beginning
        return [completedTask, ...completedPrev];
      });
      
      // Remove from in-progress
      return prev.filter(t => t.id !== taskId);
    });
  }, []);

  // Update task to mark all tasks as completed
  const completeTaskItems = useCallback((taskId: string) => {
    setCompletedTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, pendingTasks: 0, highlighted: false }
          : task
      )
    );
  }, []);

  // Expose functions to parent component via ref
  useImperativeHandle(ref, () => ({
    addNewTask,
    moveTaskToCompleted,
    completeTaskItems,
  }));

  return (
    <div className={`relative ${className}`}>
      {/* Sidebar */}
      <div className={`bg-purple-50 border-r border-purple-200 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-96' : 'w-16'
      } overflow-hidden h-full`}>
        
        {/* Open State Content */}
        {isOpen && (
          <div className="h-full flex flex-col">
            {/* Header - Agent Profile */}
            <div className="flex h-16 items-center justify-between p-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative rounded-full w-10 h-10 shrink-0">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">B</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="font-medium text-base text-slate-900">
                    Blake
                  </div>
                  <div className="font-medium text-xs text-slate-700">
                    Sales Analyst
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-2">
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Agent Description Container */}
            <div className="border-b border-purple-200 flex flex-col gap-3 pb-4 px-4 shrink-0">
              <div className="font-normal text-sm text-slate-500 leading-5">
                <p className="mb-0">Specialized in identifying root causes of sales performance gaps and providing actionable insights.</p>
              </div>
              
              {/* Knowledge Space */}
              <div className="bg-purple-50 border border-purple-200 h-8 items-center justify-between p-2 rounded-lg flex">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-purple-600" />
                  <p className="font-medium text-xs text-slate-900">
                    Knowledge Space
                  </p>
                </div>
                <p className="font-normal text-xs text-purple-400">
                  Add Business Context
                </p>
              </div>

              {/* Stats Container */}
              <div className="flex gap-3">
                <div className="bg-purple-100 flex flex-col justify-between h-12 p-2 rounded-lg flex-1">
                  <p className="font-medium text-sm text-slate-900">100</p>
                  <p className="font-normal text-xs text-slate-500">Tasks Completed</p>
                </div>
                <div className="bg-purple-100 flex flex-col justify-between h-12 p-2 rounded-lg flex-1">
                  <p className="font-medium text-sm text-slate-900">345</p>
                  <p className="font-normal text-xs text-slate-500">Hours Saved</p>
                </div>
              </div>
            </div>

            {/* Tabs Container */}
            <div className="flex flex-col gap-4 p-4 shrink-0">
              <div className="bg-slate-50 p-1 border border-slate-200 flex gap-0.5 items-center rounded-lg">
                <button 
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center px-2 py-2 transition-all duration-200 
                    ${ activeTab === 'skills' ? '' : ' hover:bg-slate-100' }
                    ${ activeTab === 'skills' ? 'bg-white border border-slate-200 shadow-sm' : ''
                  }`}
                  onClick={() => setActiveTab('skills')}
                >
                  <p className={`text-xs whitespace-nowrap ${
                    activeTab === 'skills' ? 'font-semibold text-slate-900' : 'font-medium text-slate-500'
                  }`}>
                    Skills
                  </p>
                </button>
                <button 
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center px-2 py-2 transition-all duration-200 
                    ${ activeTab === 'my' ? '' : 'hover:bg-slate-100 ' }
                    ${activeTab === 'my' ? 'bg-white shadow-sm border border-slate-200' : ''
                  }`}
                  onClick={() => setActiveTab('my')}
                >
                  <p className={`text-xs whitespace-nowrap ${
                    activeTab === 'my' ? 'font-semibold text-slate-900' : 'font-medium text-slate-500'
                  }`}>
                    Tasks
                  </p>
                  <div className={`px-1.5 py-0.5 rounded-full ml-1.5 ${
                    activeTab === 'my' ? 'bg-purple-200 border border-purple-300' : 'bg-white border border-slate-200'
                  }`}>
                    <p className="font-medium text-xs text-slate-900 text-center">{inProgressTasks.length + completedTasks.length}</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 flex flex-col gap-4 px-4 py-0 pb-16 overflow-y-auto">
              {/* Conditional content based on active tab */}
              {activeTab === 'skills' && (
                <>
                  {/* Root Cause Analysis - Active */}
                  <div className="bg-white border border-purple-200 rounded-lg">
                    <div className="flex flex-col gap-2 justify-center p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ScanText className="w-4 h-4 text-purple-600 fill-purple-600" />
                          <p className="font-semibold text-sm text-purple-600">
                            Root Cause Analysis
                          </p>
                        </div>
                        <p className="font-medium text-sm text-purple-600">→</p>
                      </div>
                      <p className="font-normal text-xs text-slate-500">
                      Uncover key drivers of performance shifts across time, products, and channels.
                      </p>
                    </div>
                  </div>

                  {/* Gap to Plan */}
                  <div className="border border-slate-300 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      < Goal className="w-4 h-4 text-slate-700" />
                      <p className="font-medium text-sm text-slate-500">
                        Gap to Plan
                      </p>
                    </div>
                    <p className="font-normal text-xs text-slate-500">
                    Track weekly variances to targets and pinpoint performance drivers to take corrective action.
                    </p>
                  </div>

                  {/* Weekly Business Review */}
                  <div className="border border-slate-300 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-700" />
                      <p className="font-medium text-sm text-slate-500">
                        Weekly Business Review
                      </p>
                    </div>
                    <p className="font-normal text-xs text-slate-500">
                    Auto-compile KPIs, highlights, and risks with week-over-week trends.                    </p>
                  </div>

                  {/* Phantom Inventory */}
                  <div className="border border-slate-300 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-700" />
                      <p className="font-medium text-sm text-slate-500">
                        Phantom Inventory
                      </p>
                    </div>
                    <p className="font-normal text-xs text-slate-500">
                    Spot stock mismatches causing phantom inventory and sales loss.
                    </p>
                  </div>
                </>
              )}

              {activeTab === 'my' && (
                <>
                  {/* Search Bar */}
                  <div className="border border-slate-300 flex gap-2 items-center p-2 rounded-lg">
                    <Search className="w-4 h-4 text-slate-700" />
                    <input
                      type="text"
                      placeholder="Search for tasks"
                      className="flex-1 bg-transparent border-none outline-none font-normal text-xs text-slate-500 placeholder:text-slate-500"
                    />
                  </div>

                  {/* In Progress Section */}
                  {inProgressTasks.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setIsInProgressOpen(!isInProgressOpen)}
                        className="flex items-center justify-between"
                      >
                        <div className="flex gap-1.5 items-center">
                          <List className="w-4 h-4 text-slate-700" />
                          <p className="font-semibold text-xs text-slate-700">In Progress ({inProgressTasks.length})</p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            isInProgressOpen ? '' : '-rotate-90'
                          }`}
                        />
                      </button>

                      {isInProgressOpen && (
                        <>
                          {inProgressTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              tag={task.tag}
                              mainText={task.mainText}
                              question={task.question}
                              status={task.status}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  )}

                  {/* Completed Section */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setIsCompletedOpen(!isCompletedOpen)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-1.5 items-center">
                        <Check className="w-4 h-4 text-slate-700" />
                        <p className="font-semibold text-xs text-slate-700">Completed ({completedTasks.length})</p>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                          isCompletedOpen ? '' : '-rotate-90'
                        }`}
                      />
                    </button>

                    {isCompletedOpen && (
                      <div className="flex flex-col gap-3">
                        {completedTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            tag={task.tag}
                            mainText={task.mainText}
                            question={task.question}
                            status={task.status}
                            completedAt={task.completedAt}
                            pendingTasks={task.pendingTasks}
                            highlighted={task.highlighted}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Collapsed State Content */}
        {!isOpen && (
          <div className="p-0 h-full">
            <div className="bg-purple-50 p-2 h-full flex flex-col items-center space-y-4 pt-4">
              {/* Profile Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
                <span className="text-white font-semibold text-sm">B</span>
              </div>
              
              {/* Navigation Icons */}
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                <Map className="w-4 h-4 text-purple-600" />
              </div>
              
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                <ListTodo className="w-4 h-4 text-purple-600" />
              </div>
              
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button Overlay */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-4 bg-white shadow-lg hover:shadow-xl transition-all duration-200 p-2 rounded-full border border-slate-200 hover:border-slate-300 z-10 ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-8'
        }`}
        style={{ width: '40px', height: '40px' }}
      >
        <ChevronLeft className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
          isOpen ? 'rotate-0' : 'rotate-180'
        }`} />
      </button>
    </div>
  );
});

CollapsibleSidebar.displayName = 'CollapsibleSidebar';

export default CollapsibleSidebar;

