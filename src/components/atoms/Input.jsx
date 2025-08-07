import React from "react"
import { cn } from "@/utils/cn"

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-3 py-3 text-sm border rounded-lg transition-all duration-200",
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

Input.displayName = "Input"

export default Input