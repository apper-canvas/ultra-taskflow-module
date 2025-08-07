import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary", 
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    work: "bg-blue-100 text-blue-800",
    personal: "bg-purple-100 text-purple-800",
    health: "bg-emerald-100 text-emerald-800",
    finance: "bg-amber-100 text-amber-800",
    education: "bg-red-100 text-red-800",
    shopping: "bg-pink-100 text-pink-800"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge