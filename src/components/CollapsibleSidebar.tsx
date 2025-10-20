'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Home,
  Triangle,
  List,
  Search,
  Plus,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CollapsibleSidebarProps {
  className?: string;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Sidebar */}
      <div className={`bg-violet-50 border-r border-violet-200 transition-all duration-300 ease-in-out ${
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
                  <div className="font-medium text-base text-gray-900">
                    Blake
                  </div>
                  <div className="font-medium text-xs text-gray-700">
                    Sales Analyst
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-2">
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Agent Description Container */}
            <div className="border-b border-violet-200 flex flex-col gap-3 pb-4 px-4 shrink-0">
              <div className="font-normal text-sm text-gray-500 leading-5">
                <p className="mb-0">Specialized in identifying root causes of sales performance gaps and providing actionable insights.</p>
              </div>
              
              {/* Knowledge Space */}
              <div className="bg-violet-50 border border-violet-200 h-8 items-center justify-between p-2 rounded-lg flex">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-purple-600" />
                  <p className="font-medium text-xs text-gray-900">
                    Knowledge Space
                  </p>
                </div>
                <p className="font-normal text-xs text-purple-400">
                  Add Business Context
                </p>
              </div>

              {/* Stats Container */}
              <div className="flex gap-3">
                <div className="bg-violet-100 flex flex-col justify-between h-12 p-2 rounded-lg flex-1">
                  <p className="font-medium text-sm text-gray-900">100</p>
                  <p className="font-normal text-xs text-gray-500">Tasks Completed</p>
                </div>
                <div className="bg-violet-100 flex flex-col justify-between h-12 p-2 rounded-lg flex-1">
                  <p className="font-medium text-sm text-gray-900">345</p>
                  <p className="font-normal text-xs text-gray-500">Hours Saved</p>
                </div>
              </div>
            </div>

            {/* Tabs Container */}
            <div className="flex flex-col gap-4 p-4 shrink-0">
              <div className="bg-gray-50 border border-gray-200 flex gap-0.5 items-center rounded-lg">
                <button 
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center px-2 py-2 transition-all duration-200 hover:bg-gray-100 ${
                    activeTab === 'skills' ? 'bg-white border border-gray-300 shadow-sm' : ''
                  }`}
                  onClick={() => setActiveTab('skills')}
                >
                  <p className={`text-xs whitespace-nowrap ${
                    activeTab === 'skills' ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'
                  }`}>
                    Skills
                  </p>
                </button>
                <button 
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center px-2 py-2 transition-all duration-200 hover:bg-gray-100 ${
                    activeTab === 'blake' ? 'bg-white border border-gray-300 shadow-sm' : ''
                  }`}
                  onClick={() => setActiveTab('blake')}
                >
                  <p className={`text-xs whitespace-nowrap ${
                    activeTab === 'blake' ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'
                  }`}>
                    Blake&apos;s Task
                  </p>
                </button>
                <button 
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center px-2 py-2 transition-all duration-200 hover:bg-gray-100 ${
                    activeTab === 'my' ? 'bg-white border border-gray-300 shadow-sm' : ''
                  }`}
                  onClick={() => setActiveTab('my')}
                >
                  <p className={`text-xs whitespace-nowrap ${
                    activeTab === 'my' ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'
                  }`}>
                    My Tasks
                  </p>
                  <div className={`px-1.5 py-0.5 rounded-full ml-1.5 ${
                    activeTab === 'my' ? 'bg-gray-50 border border-gray-200' : 'bg-white border border-gray-200'
                  }`}>
                    <p className="font-medium text-xs text-gray-600 text-center">3</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 flex flex-col gap-4 px-4 py-0 overflow-y-auto">
              {/* Conditional content based on active tab */}
              {activeTab === 'skills' && (
                <>
                  {/* Root Cause Analysis - Active */}
                  <div className="bg-white border border-violet-200 rounded-lg">
                    <div className="flex flex-col gap-2 justify-center p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Triangle className="w-4 h-4 text-purple-600 fill-purple-600" />
                          <p className="font-semibold text-sm text-purple-600">
                            Root Cause Analysis
                          </p>
                        </div>
                        <p className="font-medium text-sm text-purple-600">→</p>
                      </div>
                      <p className="font-normal text-xs text-gray-500">
                      Uncover key drivers of performance shifts across time, products, and channels.
                      </p>
                    </div>
                  </div>

                  {/* Gap to Plan */}
                  <div className="border border-gray-200 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-600" />
                      <p className="font-medium text-sm text-gray-500">
                        Gap to Plan
                      </p>
                    </div>
                    <p className="font-normal text-xs text-gray-500">
                    Track weekly variances to targets and pinpoint performance drivers to take corrective action.
                    </p>
                  </div>

                  {/* Weekly Business Review */}
                  <div className="border border-gray-200 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <List className="w-4 h-4 text-gray-600" />
                      <p className="font-medium text-sm text-gray-500">
                        Weekly Business Review
                      </p>
                    </div>
                    <p className="font-normal text-xs text-gray-500">
                    Auto-compile KPIs, highlights, and risks with week-over-week trends.                    </p>
                  </div>

                  {/* Phantom Inventory */}
                  <div className="border border-gray-200 flex flex-col gap-2 justify-center p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <List className="w-4 h-4 text-gray-600" />
                      <p className="font-medium text-sm text-gray-500">
                        Phantom Inventory
                      </p>
                    </div>
                    <p className="font-normal text-xs text-gray-500">
                    Spot stock mismatches causing phantom inventory and sales loss.
                    </p>
                  </div>
                </>
              )}

              {activeTab === 'blake' && (
                <>
                  {/* Search and New Task */}
                  <div className="flex gap-4">
                    <div className="border border-gray-200 flex gap-2 items-center h-8 px-2 py-0 rounded-lg flex-1">
                      <Search className="w-4 h-4 text-gray-700" />
                      <p className="font-normal text-xs text-gray-500">Search for tasks...</p>
                    </div>
                    <div className="border border-purple-300 flex gap-2 items-center h-8 px-2 py-0 rounded-lg">
                      <Plus className="w-4 h-4 text-purple-600" />
                      <p className="font-medium text-xs text-purple-600">New Task</p>
                    </div>
                  </div>

                  {/* Scheduled Tasks */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5 items-center">
                      <Clock className="w-4 h-4 text-gray-700" />
                      <p className="font-semibold text-xs text-gray-500">Scheduled (2)</p>
                    </div>

                    {/* Scheduled Task 1 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex flex-col gap-3 p-3">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-sm text-gray-900">Dog Food: 01 Apr→30 Jun &#39;25</p>
                          <p className="font-normal text-xs text-gray-500">
                            I&apos;m trying to diagnose sales changes that happened in Q3. Focus on market trends and competitive factors.
                          </p>
                        </div>
                        <div className="w-fit bg-purple-50 border border-purple-200 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                          <Triangle className="w-4 h-4 text-gray-600" />
                          <p className="font-normal text-xs text-gray-700">Root Cause Analysis</p>
                        </div>
                      </div>
                    </div>

                    {/* Scheduled Task 2 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex flex-col gap-3 p-3">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-sm text-gray-900">Prime Day: 10 Jul→16 Jul &#39;25 vs 03 Jul→09 Jul &#39;25</p>
                          <p className="font-normal text-xs text-gray-500">
                            I&apos;m trying to diagnose sales changes that happened in Q3. Focus on market trends and competitive factors.
                          </p>
                        </div>
                        <div className="w-fit bg-purple-50 border border-purple-200 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                          <Triangle className="w-4 h-4 text-gray-600" />
                          <p className="font-normal text-xs text-gray-700">Root Cause Analysis</p>
                        </div>
                      </div>
                    </div>

                    {/* Scheduled Task 3 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex flex-col gap-3 p-3">
                        <p className="font-medium text-sm text-gray-900">Dog Treats – 01 Jul→31 Aug &#39;25</p>
                        <div className="w-fit bg-purple-50 border border-purple-200 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                          <Triangle className="w-4 h-4 text-gray-600" />
                          <p className="font-normal text-xs text-gray-700">Root Cause Analysis</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completed Tasks */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5 items-center">
                      <Check className="w-4 h-4 text-gray-700" />
                      <p className="font-semibold text-xs text-gray-500">Completed (23)</p>
                    </div>

                    {/* Completed Task 1 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <Check className="w-4 h-4 text-gray-500" />
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                        <p className="font-medium h-10 leading-5 text-sm">Bulk-Value Packs: 01 Jul→30 Sep &#39;25 vs 01 Apr→30 Jun &#39;25</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>

                    {/* Completed Task 2 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <Check className="w-4 h-4 text-gray-500" />
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                          <p className="font-medium h-10 leading-5 text-sm">Prime Day: 10 Jul→16 Jul &#39;25 vs 03 Jul→09 Jul &#39;25</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>

                    {/* Completed Task 3 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <Check className="w-4 h-4 text-gray-500" />
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                          <p className="font-medium h-10 leading-5 text-sm">Dog Treats – 01 Jul→31 Aug 2025 vs 01 Jul→31 Aug 2024</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'my' && (
                <>
                  {/* Search Bar */}
                  <div className="border border-gray-200 flex gap-2 items-center p-2 rounded-lg">
                    <Search className="w-4 h-4 text-gray-700" />
                    <p className="font-normal text-xs text-gray-500">Search for tasks...</p>
                  </div>

                  {/* To Do Tasks */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5 items-center">
                      <Clock className="w-4 h-4 text-gray-700" />
                      <p className="font-semibold text-xs text-gray-500">To do (3)</p>
                    </div>

                    {/* To Do Task 1 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex gap-2 items-start p-3">
                        <div className="flex items-center justify-center pt-0.5 w-4">
                          <div className="border border-purple-300 rounded w-3.5 h-3.5"></div>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <p className="font-medium h-10 leading-5 text-sm text-gray-900">
                            Approve Q4 Promo Calendar with Prime Day Learnings
                          </p>
                          <div className="bg-white border border-gray-100 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                            <p className="font-normal text-xs text-gray-500">Root Cause Analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* To Do Task 2 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex gap-2 items-start p-3">
                        <div className="flex items-center justify-center pt-0.5 w-4">
                          <div className="border border-purple-300 rounded w-3.5 h-3.5"></div>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <p className="font-medium h-10 leading-5 text-sm text-gray-900">
                            Share RCA Deck: SOV Loss on "Grain-Free" to Marketing Head
                          </p>
                          <div className="bg-white border border-gray-100 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                            <p className="font-normal text-xs text-gray-500">Root Cause Analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* To Do Task 3 */}
                    <div className="bg-white border border-violet-200 rounded-lg">
                      <div className="flex gap-2 items-start p-3">
                        <div className="flex items-center justify-center pt-0.5 w-4">
                          <div className="border border-purple-300 rounded w-3.5 h-3.5"></div>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <p className="font-medium h-10 leading-5 text-sm text-gray-900">
                            Forward CPC Optimization Playbook to Retail Media Mgr
                          </p>
                          <div className="bg-white border border-gray-100 flex gap-1.5 items-center h-6 px-1.5 py-0 rounded-md">
                            <p className="font-normal text-xs text-gray-500">Root Cause Analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completed Tasks */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5 items-center">
                      <Check className="w-4 h-4 text-gray-700" />
                      <p className="font-semibold text-xs text-gray-500">Completed (23)</p>
                    </div>

                    {/* Completed Task 1 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 16 16" className="w-full h-full">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 .02-.02z" fill="#697586"/>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                          <p className="font-medium h-10 leading-5 text-sm">Review Suggested Price Correction for Mid-Size Packs</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>

                    {/* Completed Task 2 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 16 16" className="w-full h-full">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 .02-.02z" fill="#697586"/>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                          <p className="font-medium h-10 leading-5 text-sm">Post Slack Update: &quot;Prime Day Conversion Drivers – Top Insights&quot;</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>

                    {/* Completed Task 3 */}
                    <div className="border border-gray-200 h-22 rounded-lg">
                      <div className="flex gap-2 h-22 items-start p-3">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 16 16" className="w-full h-full">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 .02-.02z" fill="#697586"/>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-3 h-16 text-gray-500">
                          <p className="font-medium h-10 leading-5 text-sm">Schedule Meeting: RCA on Dog Treats CVR Drop</p>
                          <p className="font-normal leading-3 text-xs">Completed on 23 Sep 2025 at 17:55pm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Collapsed State Content */}
        {!isOpen && (
          <div className="p-0 h-full">
            <div className="bg-violet-50 p-2 h-full flex flex-col items-center space-y-4 pt-4">
              {/* Profile Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
                <span className="text-white font-semibold text-sm">B</span>
              </div>
              
              {/* Navigation Icons */}
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-200 transition-colors">
                <Home className="w-4 h-4 text-purple-600" />
              </div>
              
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-200 transition-colors">
                <Triangle className="w-4 h-4 text-purple-600" />
              </div>
              
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-200 transition-colors">
                <List className="w-4 h-4 text-purple-600" />
              </div>
              
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-violet-200 transition-colors">
                <ChevronDown className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button Overlay */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-4 bg-white shadow-lg hover:shadow-xl transition-all duration-200 p-2 rounded-full border border-gray-200 hover:border-gray-300 z-10 ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-8'
        }`}
        style={{ width: '40px', height: '40px' }}
      >
        <div className={`transform transition-transform duration-300 ${
          isOpen ? 'rotate-0' : 'rotate-180'
        }`}>
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>
    </div>
  );
};

export default CollapsibleSidebar;

