'use client';

import React from 'react';
import { Command, Sparkles, MessageCircle, Settings, Bell, User } from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'agentspace', onTabChange }) => {
  const tabs = [
    { id: 'command-center', label: 'My Command Center', icon: <Command className="w-5 h-5" /> },
    { id: 'agentspace', label: 'Agentspace', icon: <Sparkles className="w-5 h-5" /> },
  ];

  const rightIcons = [
    { id: 'messages', icon: <MessageCircle className="w-5 h-5" />, label: 'Messages' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { id: 'notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Left side - Logo and Navigation */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-slate-900 font-bold text-lg">
            Q
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-800 border border-white'
                  : 'hover:bg-slate-800'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Right side - Action Icons */}
      <div className="flex items-center space-x-4">
        {rightIcons.map((icon) => (
          <button
            key={icon.id}
            className="w-10 h-10 flex items-center justify-center hover:bg-slate-800 rounded-md transition-colors"
            title={icon.label}
          >
            <span className="text-lg">{icon.icon}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
