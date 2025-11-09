import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TrendingDown, TrendingUp } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface ExecutiveSummaryProps {
  content: string;
}

export function ExecutiveSummary({ content }: ExecutiveSummaryProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h2 className="text-base font-semibold text-gray-900 mb-3">
        Executive Summary
      </h2>
      
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            p: ({ children }) => (
              <p className="text-sm text-gray-700 leading-snug mb-2">
                {children}
              </p>
            ),
            ul: ({ children, ...props }) => {
              const node = (props as { node?: { parent?: { type?: string } } }).node;
              const isNested = node?.parent?.type === 'listItem';
              return (
                <ul className={`space-y-1.5 ${isNested ? 'ml-4 mt-1 mb-1' : 'mb-2'} list-none`}>
                  {children}
                </ul>
              );
            },
            li: ({ children, ...props }) => {
              const node = (props as { node?: { parent?: { type?: string } } }).node;
              const isNested = node?.parent?.type === 'listItem';
              
              // Helper function to replace emoji with icons
              const replaceEmojiWithIcons = (node: React.ReactNode, key?: number): React.ReactNode => {
                if (typeof node === 'string') {
                  const parts = node.split(/(📉|📈)/);
                  return parts.map((part, partIdx) => {
                    if (part === '📉') {
                      return (
                        <TrendingDown 
                          key={`${key}-${partIdx}`}
                          className="inline-block w-4 h-4 mr-1.5 text-red-600 align-middle" 
                          aria-label="down trend"
                        />
                      );
                    } else if (part === '📈') {
                      return (
                        <TrendingUp 
                          key={`${key}-${partIdx}`}
                          className="inline-block w-4 h-4 mr-1.5 text-green-600 align-middle" 
                          aria-label="up trend"
                        />
                      );
                    }
                    return <React.Fragment key={`${key}-${partIdx}`}>{part}</React.Fragment>;
                  });
                }
                
                if (React.isValidElement(node)) {
                  const element = node as React.ReactElement<{ children?: React.ReactNode }>;
                  return React.cloneElement(element, {
                    ...element.props,
                    children: React.Children.map(element.props.children, (child, idx) => 
                      replaceEmojiWithIcons(child, idx)
                    ),
                  });
                }
                
                return node;
              };
              
              if (isNested) {
                return (
                  <li className="flex items-start gap-1.5 text-sm text-gray-600 leading-snug mb-1">
                    <span className="text-gray-300 mt-1 flex-shrink-0 text-xs">•</span>
                    <span className="flex-1">
                      {React.Children.map(children, (child, idx) => 
                        replaceEmojiWithIcons(child, idx)
                      )}
                    </span>
                  </li>
                );
              }
              
              return (
                <li className="text-sm text-gray-700 leading-snug">
                  {React.Children.map(children, (child, idx) => 
                    replaceEmojiWithIcons(child, idx)
                  )}
                </li>
              );
            },
            strong: ({ children }) => (
              <strong className="font-medium text-gray-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-gray-600 font-medium not-italic">{children}</em>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

