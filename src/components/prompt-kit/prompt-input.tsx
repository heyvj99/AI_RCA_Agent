"use client"

import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type PromptInputContextType = {
  isLoading: boolean
  value: string
  setValue: (value: string) => void
  maxHeight: number | string
  onSubmit?: () => void
  disabled?: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

const PromptInputContext = createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
  textareaRef: React.createRef<HTMLTextAreaElement>(),
})

function usePromptInput() {
  const context = useContext(PromptInputContext)
  if (!context) {
    throw new Error("usePromptInput must be used within a PromptInput")
  }
  return context
}

type PromptInputProps = {
  isLoading?: boolean
  value?: string
  onValueChange?: (value: string) => void
  maxHeight?: number | string
  onSubmit?: () => void
  children: React.ReactNode
  className?: string
}

function PromptInput({
  className,
  isLoading = false,
  maxHeight = 240,
  value,
  onValueChange,
  onSubmit,
  children,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState(value || "")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <TooltipProvider>
      <PromptInputContext.Provider
        value={{
          isLoading,
          value: value ?? internalValue,
          setValue: onValueChange ?? handleChange,
          maxHeight,
          onSubmit,
          textareaRef,
        }}
      >
        <div
          className={cn(
            "bg-[#ece9fe] cursor-text rounded-xl p-2",
            className
          )}
          onClick={() => textareaRef.current?.focus()}
        >
          <div className="bg-white border border-[#a48afb] rounded-xl p-3">
            {children}
          </div>
        </div>
      </PromptInputContext.Provider>
    </TooltipProvider>
  )
}

export type PromptInputTextareaProps = {
  disableAutosize?: boolean
} & React.ComponentProps<typeof Textarea>

function PromptInputTextarea({
  className,
  onKeyDown,
  disableAutosize = false,
  ...props
}: PromptInputTextareaProps) {
  const { value, setValue, maxHeight, onSubmit, disabled, textareaRef } =
    usePromptInput()

  useEffect(() => {
    if (disableAutosize) return

    if (!textareaRef.current) return

    if (textareaRef.current.scrollTop === 0) {
      textareaRef.current.style.height = "auto"
    }

    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`
  }, [value, maxHeight, disableAutosize, textareaRef])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit?.()
    }
    onKeyDown?.(e)
  }

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ask Blake anything about Root Cause Analysis..."
      className={cn(
        "text-slate-900 placeholder:text-[#697586] min-h-[44px] w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        className
      )}
      rows={1}
      disabled={disabled}
      {...props}
    />
  )
}

type PromptInputActionsProps = React.HTMLAttributes<HTMLDivElement>

function PromptInputActions({
  children,
  className,
  ...props
}: PromptInputActionsProps) {
  const { onSubmit, disabled } = usePromptInput()
  
  return (
    <div className={cn("flex items-center justify-between w-full", className)} {...props}>
      {/* <button
        type="button"
        className="bg-white border border-violet-200 rounded-full px-3 py-1.5 flex items-center gap-2 h-8 hover:bg-slate-50 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          // Handle new task action
        }}
      >
        <Plus className="w-4 h-4 text-[#6927da]" />
        <span className="text-[#6927da] text-xs font-semibold">New Task</span>
      </button> */}
      
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {children}
        </div>
        <button
          type="button"
          className="bg-[#7800f2] border-[#5720b7] border-[1.5px] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#6a00d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.stopPropagation()
            onSubmit?.()
          }}
          disabled={disabled}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

type PromptInputActionProps = {
  className?: string
  tooltip: React.ReactNode
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
} & React.ComponentProps<typeof Tooltip>

function PromptInputAction({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}: PromptInputActionProps) {
  const { disabled } = usePromptInput()

  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled} onClick={event => event.stopPropagation()}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

export {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
}
