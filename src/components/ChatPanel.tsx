'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChatContainerRoot, 
  ChatContainerContent,
  ChatContainerScrollAnchor 
} from './prompt-kit/chat-container';
import { 
  Message, 
  MessageAvatar, 
  MessageContent, 
  MessageActions
} from './prompt-kit/message';
import { 
  PromptInput, 
  PromptInputTextarea, 
  PromptInputActions
} from './prompt-kit/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from './prompt-kit/reasoning';
import { 
  Sparkles, 
  X, 
  Menu, 
  ChevronDown, 
  Calendar, 
  Plus 
} from 'lucide-react';

interface ChatPanelProps {
  className?: string;
}

interface MessageHistoryItem {
  sender: 'agent' | 'user';
  content: string;
  timestamp: string;
  reasoning?: {
    text: string;
    isStreaming: boolean;
    isOpen: boolean;
  };
}

const ChatPanel: React.FC<ChatPanelProps> = ({ className = '' }) => {
  const [messageHistory, setMessageHistory] = useState<MessageHistoryItem[]>([
    {
      sender: 'agent',
      content: 'Hi, I\'m Blake, your AI teammate for sales performance insights. I can help you dig into your numbers and uncover what\'s really driving your results. What would you like to explore?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Simulated streaming function with markdown content for reasoning
  const simulateReasoningStream = async (
    messageIndex: number,
    setText: (text: string) => void,
    setIsStreaming: (streaming: boolean) => void
  ) => {
    const reasoning = `# Analyzing: "${newMessage}"

## Step 1: Understanding the Query
I need to analyze your request about **${newMessage}** and provide relevant insights.

## Step 2: Data Processing
- Gathering relevant sales data 📊
- Analyzing performance metrics 📈
- Identifying key patterns 🔍

## Step 3: Insight Generation
\`\`\`
Processing your request...
Generating insights...
Preparing recommendations...
\`\`\`

> **Status:** Analysis complete! Ready to provide detailed insights.`

    setIsStreaming(true)
    setText("")

    // Update the message with streaming state - keep closed by default
    setMessageHistory(prev => prev.map((msg, idx) => 
      idx === messageIndex ? {
        ...msg,
        reasoning: { text: "", isStreaming: true, isOpen: false }
      } : msg
    ))

    // Simulate character-by-character streaming
    for (let i = 0; i <= reasoning.length; i++) {
      const currentText = reasoning.slice(0, i)
      setText(currentText)
      
      // Update the message with current reasoning text - preserve user's open/close state
      setMessageHistory(prev => prev.map((msg, idx) => 
        idx === messageIndex ? {
          ...msg,
          reasoning: { 
            text: currentText, 
            isStreaming: true, 
            isOpen: msg.reasoning?.isOpen || false 
          }
        } : msg
      ))
      
      await new Promise((resolve) => setTimeout(resolve, 20))
    }

    setIsStreaming(false)
    
    // Final update with completed reasoning - preserve user's open/close state
    setMessageHistory(prev => prev.map((msg, idx) => 
      idx === messageIndex ? {
        ...msg,
        reasoning: { 
          text: reasoning, 
          isStreaming: false, 
          isOpen: msg.reasoning?.isOpen || false 
        }
      } : msg
    ))
  };

  // Force scroll to bottom when messages change
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('[role="log"]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messageHistory]);

  const [formData, setFormData] = useState({
    category: 'Dog Food',
    dateRange: '01 Apr → 30 June 2025',
    comparisonRange: '01 Apr → 30 June 2024',
    repeatFrequency: 'Does not repeat',
    mode: 'autopilot' as 'autopilot' | 'copilot',
    emails: 'cxo@acme.com, product@acme.com',
    channel: '#cs-engg-bridge',
    description: 'I\'m trying to diagnose sales changes that happened in Q3. Focus on market trends and competitive factors'
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: MessageHistoryItem = {
        sender: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessageHistory(prev => [...prev, userMessage]);
      const currentMessage = newMessage;
      setNewMessage('');
      
      // Simulate agent response after a short delay
      setTimeout(() => {
        const agentResponse: MessageHistoryItem = {
          sender: 'agent',
          content: `I understand you're asking about "${currentMessage}". Let me help you analyze this and provide insights.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reasoning: {
            text: "",
            isStreaming: false,
            isOpen: false
          }
        };
        
        setMessageHistory(prev => {
          const updatedHistory = [...prev, agentResponse];
          // Trigger reasoning for the agent message
          const agentMessageIndex = updatedHistory.length - 1;
          simulateReasoningStream(agentMessageIndex, () => {}, () => {});
          return updatedHistory;
        });
      }, 1000);
    }
  };

  const handleNewTaskSubmit = () => {
    // Handle the new task submission
    console.log('New task submitted:', formData);
    // You can add logic here to send the task to your backend or update the UI
    setIsNewTaskModalOpen(false);
  };

  return (
    <div className={`bg-violet-50 border-l border-[#e3e8ef] h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-[#e3e8ef] h-16 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white font-semibold text-xs">B</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0d121c] leading-[14px]">Chat with Blake</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white flex items-center gap-2 p-2 rounded-lg">
            <Sparkles className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex flex-col flex-1 justify-between p-3 min-h-0">
        {/* Messages */}
        <ChatContainerRoot key={messageHistory.length} className="flex-1 p-1">
          <ChatContainerContent className="flex flex-col gap-2">
            {messageHistory.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-purple-100 text-gray-900 rounded-bl-2xl' 
                    : 'bg-[#eef2f6] border border-[#e3e8ef] text-[#0d121c] rounded-br-2xl'
                }`}>
                  <p className="text-sm leading-5">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  
                  {/* Reasoning component for agent messages */}
                  {message.sender === 'agent' && message.reasoning && (
                    <div className="mt-3">
                      <Reasoning 
                        isStreaming={message.reasoning.isStreaming} 
                        open={message.reasoning.isOpen}
                        onOpenChange={(open) => {
                          setMessageHistory(prev => prev.map((msg, idx) => 
                            idx === index ? {
                              ...msg,
                              reasoning: msg.reasoning ? { ...msg.reasoning, isOpen: open } : undefined
                            } : msg
                          ))
                        }}
                      >
                        <ReasoningTrigger>
                          {message.reasoning.isStreaming ? "Thinking..." : "Show AI reasoning"}
                        </ReasoningTrigger>
                        <ReasoningContent
                          markdown
                          className="ml-2 border-l-2 border-l-slate-200 px-2 pb-1 dark:border-l-slate-700"
                        >
                          {message.reasoning.text}
                        </ReasoningContent>
                      </Reasoning>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <ChatContainerScrollAnchor />
          </ChatContainerContent>
        </ChatContainerRoot>

        {/* New Task Form - shown when isNewTaskModalOpen is true */}
        {isNewTaskModalOpen && (
          <div className="bg-white border border-[#a48afb] rounded-xl p-3 mb-2">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#7800f2]">Assigning new task to Blake</h3>
              <button 
                onClick={() => setIsNewTaskModalOpen(false)}
                className="w-4 h-4 flex items-center justify-center hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              {/* Category Dropdown */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#6927da]" />
                  <span className="text-xs font-medium text-[#0d121c]">{formData.category}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              {/* Date Range */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6927da]" />
                  <span className="text-xs font-medium text-[#0d121c]">{formData.dateRange}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              {/* Comparison Range */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-xs text-[#697586]">vs.</span>
                  </div>
                  <span className="text-xs font-medium text-[#0d121c]">{formData.comparisonRange}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              {/* Repeat Frequency */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#6927da]" />
                  <span className="text-xs font-medium text-[#0d121c]">{formData.repeatFrequency}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              {/* Mode Selection */}
              <div className="bg-violet-200 rounded-md p-0.5 flex">
                <button
                  type="button"
                  className={`flex-1 h-7 px-3 rounded flex items-center gap-1.5 ${
                    formData.mode === 'autopilot' 
                      ? 'bg-white border border-[#cdd5df]' 
                      : 'bg-transparent'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, mode: 'autopilot' }))}
                >
                  <Sparkles className="w-4 h-4 text-[#6927da]" />
                  <span className={`text-xs font-medium ${
                    formData.mode === 'autopilot' ? 'text-[#0d121c]' : 'text-[#697586]'
                  }`}>
                    Autopilot
                  </span>
                </button>
                <button
                  type="button"
                  className={`flex-1 h-7 px-3 rounded flex items-center gap-1.5 ${
                    formData.mode === 'copilot' 
                      ? 'bg-white border border-[#cdd5df]' 
                      : 'bg-transparent'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, mode: 'copilot' }))}
                >
                  <Sparkles className="w-4 h-4 text-[#6927da]" />
                  <span className={`text-xs font-medium ${
                    formData.mode === 'copilot' ? 'text-[#0d121c]' : 'text-[#697586]'
                  }`}>
                    Copilot
                  </span>
                </button>
              </div>

              {/* Email Field */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#6927da]" />
                  <span className="text-xs font-medium text-[#0d121c]">{formData.emails}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              {/* Channel Field */}
              <div className="bg-white border border-violet-200 rounded-md h-8 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#6927da]" />
                  <span className="text-xs font-medium text-[#0d121c]">{formData.channel}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        )}

        {/* Prompt Input using prompt-kit components */}
        <PromptInput
          value={newMessage}
          onValueChange={setNewMessage}
          onSubmit={handleSendMessage}
          className="mt-4"
        >
          <div className="flex flex-col gap-2">
            <PromptInputTextarea />
            <PromptInputActions>
              <button
                type="button"
                onClick={() => setIsNewTaskModalOpen(!isNewTaskModalOpen)}
                className="bg-white border border-violet-200 rounded-full px-3 py-1.5 flex items-center gap-2 h-8 hover:bg-gray-50 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#6927da]" />
                <span className="text-[#6927da] text-xs font-semibold">New Conf</span>
              </button>
            </PromptInputActions>
          </div>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatPanel;
