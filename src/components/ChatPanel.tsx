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
  MessageActions,
  MessageAction
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
import { Loader } from './prompt-kit/loader';
import { SystemMessage } from './prompt-kit/system-message';
import { 
  Sparkles, 
  X, 
  Menu, 
  ChevronDown, 
  Calendar, 
  Plus,
  Search,
  BarChart3,
  SearchCheck,
  Lightbulb,
  CheckCircle,
  ShieldCheck,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatPanelProps {
  className?: string;
}

interface MessageHistoryItem {
  sender: 'agent' | 'user';
  content: string;
  timestamp: string;
  isLoading?: boolean;
  liked?: boolean | null;
  copied?: boolean;
  reasoning?: {
    visibleSteps: number;
    streamingStep: number;
    streamingText: string;
    isStreaming: boolean;
    isOpen: boolean;
    systemMessageDismissed?: boolean;
    showSystemMessage?: boolean;
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

  // Message action handlers
  const handleCopy = (messageIndex: number) => {
    const message = messageHistory[messageIndex];
    navigator.clipboard.writeText(message.content);
    
    setMessageHistory(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, copied: true } : msg
    ));
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setMessageHistory(prev => prev.map((msg, idx) => 
        idx === messageIndex ? { ...msg, copied: false } : msg
      ));
    }, 2000);
  };

  const handleLike = (messageIndex: number, liked: boolean) => {
    setMessageHistory(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, liked } : msg
    ));
  };

  // Custom reasoning component with Lucide React icons and streaming effect
  const ReasoningSteps = ({ visibleSteps = 5, streamingStep = 0, streamingText = "" }: { 
    visibleSteps?: number; 
    streamingStep?: number; 
    streamingText?: string; 
  }) => {
    const steps = [
      { icon: Search, title: "Step 1: Query Analysis", description: "Analyzing your sales inquiry to identify key metrics and patterns" },
      { icon: BarChart3, title: "Step 2: Data Collection", description: "Gathering sales performance data, customer metrics, and transaction records" },
      { icon: SearchCheck, title: "Step 3: Root Cause Investigation", description: "Examining conversion rates, cart abandonment, and customer behavior patterns" },
      { icon: Lightbulb, title: "Step 4: Insight Generation", description: "Identifying performance gaps and optimization opportunities" },
      { icon: CheckCircle, title: "Analysis Complete", description: "Ready to provide actionable recommendations" }
    ];

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Analyzing your query</h3>
        {steps.slice(0, visibleSteps).map((step, index) => {
          const IconComponent = step.icon;
          const isCurrentlyStreaming = index === streamingStep - 1;
          const displayText = isCurrentlyStreaming ? streamingText : step.description;
          
          return (
            <div key={index} className="flex items-start gap-3">
              <IconComponent className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-medium text-gray-600">{step.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {displayText}
                  {isCurrentlyStreaming && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Simulated streaming function for reasoning steps with text streaming
  const simulateReasoningStream = async (messageIndex: number) => {
    const steps = [
      "Analyzing your sales inquiry to identify key metrics and patterns",
      "Gathering sales performance data, customer metrics, and transaction records", 
      "Examining conversion rates, cart abandonment, and customer behavior patterns",
      "Identifying performance gaps and optimization opportunities",
      "Ready to provide actionable recommendations"
    ];

    // Update the message with streaming state - keep closed by default
    setMessageHistory(prev => prev.map((msg, idx) => 
      idx === messageIndex ? {
        ...msg,
        reasoning: { 
          visibleSteps: 0, 
          streamingStep: 0,
          streamingText: "",
          isStreaming: true, 
          isOpen: false,
          systemMessageDismissed: false,
          showSystemMessage: false
        }
      } : msg
    ))

    // Show system message after 1 second delay
    setTimeout(() => {
      setMessageHistory(prev => prev.map((msg, idx) => 
        idx === messageIndex ? {
          ...msg,
          reasoning: msg.reasoning ? { 
            ...msg.reasoning, 
            showSystemMessage: true 
          } : undefined
        } : msg
      ))
    }, 2000)

    // Simulate step-by-step streaming with text animation
    for (let step = 1; step <= 5; step++) {
      const currentStepText = steps[step - 1];
      
      // First reveal the step
      setMessageHistory(prev => prev.map((msg, idx) => 
        idx === messageIndex ? {
          ...msg,
          reasoning: { 
            visibleSteps: step, 
            streamingStep: step,
            streamingText: "",
            isStreaming: true, 
            isOpen: msg.reasoning?.isOpen || false,
            systemMessageDismissed: msg.reasoning?.systemMessageDismissed || false,
            showSystemMessage: msg.reasoning?.showSystemMessage || false
          }
        } : msg
      ))

      // Then stream the text character by character
      for (let i = 0; i <= currentStepText.length; i++) {
        const currentText = currentStepText.slice(0, i);
        
        setMessageHistory(prev => prev.map((msg, idx) => 
          idx === messageIndex ? {
            ...msg,
            reasoning: { 
              visibleSteps: step, 
              streamingStep: step,
              streamingText: currentText,
              isStreaming: step < 5 || i < currentStepText.length, 
              isOpen: msg.reasoning?.isOpen || false,
              systemMessageDismissed: msg.reasoning?.systemMessageDismissed || false,
              showSystemMessage: msg.reasoning?.showSystemMessage || false
            }
          } : msg
        ))
        
        await new Promise((resolve) => setTimeout(resolve, 30))
      }
      
      // Small pause between steps
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
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
      
      // Add loading agent message immediately
      const loadingAgentMessage: MessageHistoryItem = {
        sender: 'agent',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLoading: true,
        reasoning: {
          visibleSteps: 0,
          streamingStep: 0,
          streamingText: "",
          isStreaming: false,
          isOpen: false,
          systemMessageDismissed: false,
          showSystemMessage: false
        }
      };
      
      setMessageHistory(prev => [...prev, loadingAgentMessage]);
      
      // Simulate agent response after a short delay
      setTimeout(() => {
        const agentResponse: MessageHistoryItem = {
          sender: 'agent',
          content: `I understand you're asking about "${currentMessage}". Let me help you analyze this and provide insights.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLoading: false,
          reasoning: {
            visibleSteps: 0,
            streamingStep: 0,
            streamingText: "",
            isStreaming: false,
            isOpen: false,
            systemMessageDismissed: false,
            showSystemMessage: false
          }
        };
        
        setMessageHistory(prev => {
          const updatedHistory = [...prev.slice(0, -1), agentResponse];
          // Trigger reasoning for the agent message
          const agentMessageIndex = updatedHistory.length - 1;
          simulateReasoningStream(agentMessageIndex);
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
              <Message key={index} className={message.sender === 'user' ? 'justify-end' : 'justify-start'}>
                {message.sender === 'agent' && (
                  <MessageAvatar src="/avatars/ai.svg" alt="AI" fallback="AI" />
                )}
                <div className="flex w-full flex-col gap-2">
                  {message.isLoading ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100">
                      <Loader variant="dots" size="sm" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  ) : (
                    <MessageContent 
                      markdown={message.sender === 'agent'} 
                      className={message.sender === 'user' ? 'bg-purple-100 text-gray-900' : 'bg-transparent p-0'}
                    >
                      {message.content}
                    </MessageContent>
                  )}
                  
                  {!message.isLoading && (
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp}
                    </div>
                  )}

                  {/* Message Actions for agent messages */}
                  {message.sender === 'agent' && !message.isLoading && (
                    <MessageActions className="self-end">
                      <MessageAction tooltip="Copy to clipboard">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleCopy(index)}
                        >
                          <Copy className={`size-4 ${message.copied ? "text-green-500" : ""}`} />
                        </Button>
                      </MessageAction>

                      <MessageAction tooltip="Helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-full ${message.liked === true ? "bg-green-100 text-green-500" : ""}`}
                          onClick={() => handleLike(index, true)}
                        >
                          <ThumbsUp className="size-4" />
                        </Button>
                      </MessageAction>

                      <MessageAction tooltip="Not helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-full ${message.liked === false ? "bg-red-100 text-red-500" : ""}`}
                          onClick={() => handleLike(index, false)}
                        >
                          <ThumbsDown className="size-4" />
                        </Button>
                      </MessageAction>
                    </MessageActions>
                  )}
                  
                  {/* Reasoning component for agent messages */}
                  {message.sender === 'agent' && message.reasoning && !message.isLoading && (
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
                          className="ml-2 border-l-2 border-l-slate-200 px-2 pb-1 dark:border-l-slate-700"
                        >
                          <ReasoningSteps 
                            visibleSteps={message.reasoning.visibleSteps}
                            streamingStep={message.reasoning.streamingStep}
                            streamingText={message.reasoning.streamingText}
                          />
                        </ReasoningContent>
                      </Reasoning>
                      
                      {/* System Message with Action - appears during streaming */}
                      {message.reasoning.isStreaming && message.reasoning.showSystemMessage && !message.reasoning.systemMessageDismissed && (
                        <div className="mt-3">
                          <SystemMessage
                            variant="action"
                            fill
                            icon={<ShieldCheck className="size-4 h-[1lh]" />}
                            cta={{
                              label: "Enable browser notifications",
                            }}
                            onClose={() => {
                              setMessageHistory(prev => prev.map((msg, idx) => 
                                idx === index ? {
                                  ...msg,
                                  reasoning: msg.reasoning ? { ...msg.reasoning, systemMessageDismissed: true } : undefined
                                } : msg
                              ))
                            }}
                          >
                            This will take about 2 minutes. Get notified when it's done—we'll also email blake@ciq.ai.
                          </SystemMessage>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Message>
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
