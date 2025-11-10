"use client"

import { cn } from "@/lib/utils"

export type LoaderProps = {
  variant?: 
    | "circular"
    | "classic"
    | "pulse"
    | "pulse-dot"
    | "dots"
    | "typing"
    | "wave"
    | "bars"
    | "terminal"
    | "text-blink"
    | "text-shimmer"
    | "loading-dots"
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Loader({ 
  variant = "dots", 
  className,
  size = "md"
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }

  const renderLoader = () => {
    switch (variant) {
      case "circular":
        return (
          <div className={cn("animate-spin rounded-full border-2 border-slate-300 border-t-slate-600", sizeClasses[size], className)} />
        )
      
      case "classic":
        return (
          <div className={cn("flex space-x-1", className)}>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )
      
      case "pulse":
        return (
          <div className={cn("animate-pulse bg-slate-300 rounded", sizeClasses[size], className)} />
        )
      
      case "pulse-dot":
        return (
          <div className={cn("flex items-center space-x-1", className)}>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
          </div>
        )
      
      case "dots":
        return (
          <div className={cn("flex space-x-1", className)}>
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
          </div>
        )
      
      case "typing":
        return (
          <div className={cn("flex space-x-1", className)}>
            <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )
      
      case "wave":
        return (
          <div className={cn("flex space-x-1", className)}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-slate-500 rounded-full animate-pulse"
                style={{
                  height: `${8 + i * 2}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "1s"
                }}
              />
            ))}
          </div>
        )
      
      case "bars":
        return (
          <div className={cn("flex space-x-1", className)}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-slate-500 rounded-full animate-pulse"
                style={{
                  height: "12px",
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "1.2s"
                }}
              />
            ))}
          </div>
        )
      
      case "terminal":
        return (
          <div className={cn("flex items-center space-x-1", className)}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={cn("text-green-500 font-mono", textSizeClasses[size])}>_</span>
          </div>
        )
      
      case "text-blink":
        return (
          <span className={cn("animate-pulse text-slate-500", textSizeClasses[size], className)}>
            Processing...
          </span>
        )
      
      case "text-shimmer":
        return (
          <span className={cn("animate-pulse bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent", textSizeClasses[size], className)}>
            Processing...
          </span>
        )
      
      case "loading-dots":
        return (
          <div className={cn("flex items-center space-x-1", className)}>
            <span className={cn("text-slate-500", textSizeClasses[size])}>Loading</span>
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )
      
      default:
        return (
          <div className={cn("animate-spin rounded-full border-2 border-slate-300 border-t-slate-600", sizeClasses[size], className)} />
        )
    }
  }

  return renderLoader()
}
