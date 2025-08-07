import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = React.forwardRef(({ 
  className,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-success to-emerald-600 border-success shadow-md" 
            : "border-gray-300 hover:border-gray-400 bg-white",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-fadeIn" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox