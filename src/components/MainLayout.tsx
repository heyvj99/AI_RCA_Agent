'use client';

import React, { useState } from 'react';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('agentspace');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content Area */}
      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
