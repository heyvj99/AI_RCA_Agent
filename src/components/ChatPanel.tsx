'use client';

import React, { useState } from 'react';
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

interface ChatPanelProps {
  className?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'Can you help me analyze the performance issues?',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      type: 'assistant',
      content: 'I\'d be happy to help! I can see from the root cause analysis that there are several performance issues. The main problems appear to be insufficient server resources and inefficient database queries.',
      timestamp: '2:31 PM'
    },
    {
      id: 3,
      type: 'user',
      content: 'What would you recommend as the first step?',
      timestamp: '2:32 PM'
    },
    {
      id: 4,
      type: 'assistant',
      content: 'I recommend starting with server scaling as it\'s a quick fix with high impact. This should provide immediate relief while we work on the longer-term solutions like query optimization.',
      timestamp: '2:33 PM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        type: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };


  return (
    <div className={`w-full bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AI</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">AI Assistant</h2>
            <p className="text-sm text-gray-500">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages using ChatContainer */}
      <ChatContainerRoot className="flex-1">
        <ChatContainerContent className="p-6">
          {messages.map((message) => (
            <Message key={message.id} className={message.type === 'user' ? 'flex-row-reverse' : ''}>
              <MessageAvatar
                src=""
                alt={message.type === 'user' ? 'User' : 'AI Assistant'}
                fallback={message.type === 'user' ? 'U' : 'AI'}
              />
              <div className="flex flex-col gap-2">
                <MessageContent 
                  markdown={false}
                  className={message.type === 'user' 
                    ? 'bg-purple-50 text-gray-900' 
                    : 'bg-gray-100 text-gray-900'
                  }
                >
                  {message.content}
                </MessageContent>
                <MessageActions>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </MessageActions>
              </div>
            </Message>
          ))}
          <ChatContainerScrollAnchor />
        </ChatContainerContent>
      </ChatContainerRoot>

      {/* Input Area using PromptInput */}
      <div className="p-2">
        <PromptInput
          value={newMessage}
          onValueChange={setNewMessage}
          onSubmit={handleSendMessage}
          className="w-full"
        >
          <PromptInputTextarea className="text-sm" />
          <PromptInputActions />
        </PromptInput>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
};

export default ChatPanel;
