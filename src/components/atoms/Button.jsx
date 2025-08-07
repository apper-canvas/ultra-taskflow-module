import React from "react"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus:ring-primary/50 shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary/50 shadow-sm hover:shadow-md",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-primary/50",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white hover:from-success/90 hover:to-emerald-600/90 focus:ring-success/50 shadow-md hover:shadow-lg",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 focus:ring-error/50 shadow-md hover:shadow-lg"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md",
    default: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg"
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button