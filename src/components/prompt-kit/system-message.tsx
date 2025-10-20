"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React from "react"

export type SystemMessageProps = {
  children: React.ReactNode
  variant?: "default" | "action" | "warning" | "error"
  fill?: boolean
  icon?: React.ReactNode
  cta?: {
    label: string
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
    onClick?: () => void
  }
  onClose?: () => void
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function SystemMessage({
  children,
  variant = "default",
  fill = false,
  icon,
  cta,
  onClose,
  className,
  ...props
}: SystemMessageProps) {
  const baseClasses = "flex flex-col gap-2.5 p-3 rounded-xl text-sm font-medium"
  
  const variantClasses = {
    default: "bg-[#fbfaff] text-[#364152] border border-violet-200",
    action: "bg-[#fbfaff] text-[#364152] border border-violet-200",
    warning: "bg-yellow-50 text-yellow-900 border border-yellow-200",
    error: "bg-red-50 text-red-900 border border-red-200"
  }

  const fillClasses = fill ? "w-full" : "max-w-fit"

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        fillClasses,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm leading-5 font-medium text-[#364152]">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 mt-0.5 p-1 hover:bg-black/5 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {cta && (
        <div className="flex justify-start">
          <button
            onClick={cta.onClick}
            className="bg-[#ece9fe] border border-[#c3b5fd] rounded-lg px-2 py-2 text-sm font-normal text-[#364152] hover:bg-[#ddd6fe] transition-colors"
          >
            {cta.label}
          </button>
        </div>
      )}
    </div>
  )
}
