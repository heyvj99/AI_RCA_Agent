"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import React, { createContext, useContext, useState } from "react"
import { Markdown } from "./markdown"

type ReasoningContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isStreaming: boolean
}

const ReasoningContext = createContext<ReasoningContextType | null>(null)

export type ReasoningProps = {
  children: React.ReactNode
  className?: string
  isStreaming?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Reasoning({
  children,
  className,
  isStreaming = false,
  defaultOpen = false,
  open,
  onOpenChange,
}: ReasoningProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  
  // Use controlled state if open prop is provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  // No auto-close behavior - user controls open/close state manually

  return (
    <ReasoningContext.Provider value={{ isOpen, setIsOpen, isStreaming }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </ReasoningContext.Provider>
  )
}

export type ReasoningTriggerProps = {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function ReasoningTrigger({ children, className, ...props }: ReasoningTriggerProps) {
  const context = useContext(ReasoningContext)
  if (!context) {
    throw new Error("ReasoningTrigger must be used within a Reasoning component")
  }

  const { isOpen, setIsOpen } = context

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition-colors",
        className
      )}
      {...props}
    >
      {isOpen ? (
        <ChevronDown className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
      {children}
    </button>
  )
}

export type ReasoningContentProps = {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  markdown?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function ReasoningContent({
  children,
  className,
  contentClassName,
  markdown = false,
  ...props
}: ReasoningContentProps) {
  const context = useContext(ReasoningContext)
  if (!context) {
    throw new Error("ReasoningContent must be used within a Reasoning component")
  }

  const { isOpen } = context

  if (!isOpen) return null

  return (
    <div className={cn("mt-2", className)} {...props}>
      {markdown ? (
        <Markdown className={cn("text-xs text-slate-500 prose-sm prose-slate", contentClassName)}>{children as string}</Markdown>
      ) : (
        <div className={cn("text-xs text-slate-500", contentClassName)}>{children}</div>
      )}
    </div>
  )
}
