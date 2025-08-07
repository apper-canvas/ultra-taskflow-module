import React from "react"
import { cn } from "@/utils/cn"

const Textarea = React.forwardRef(({ 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-3 text-sm border rounded-lg transition-all duration-200 resize-none",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        error 
          ? "border-error focus:border-error focus:ring-error/20" 
          : "border-gray-300 hover:border-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea