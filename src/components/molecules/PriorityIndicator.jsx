import React from "react"
import { cn } from "@/utils/cn"

const PriorityIndicator = ({ 
  priority,
  className,
  ...props 
}) => {
  const priorityConfig = {
    High: {
      color: "bg-error",
      label: "High Priority",
      gradient: "from-error to-red-600"
    },
    Medium: {
      color: "bg-warning",
      label: "Medium Priority", 
      gradient: "from-warning to-orange-600"
    },
    Low: {
      color: "bg-info",
      label: "Low Priority",
      gradient: "from-info to-blue-600"
    }
  }

  const config = priorityConfig[priority] || priorityConfig.Low

  return (
    <div 
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      <div 
        className={cn(
          "w-1 h-6 rounded-full bg-gradient-to-b",
          config.gradient
        )}
        title={config.label}
      />
      <span className="text-xs font-medium text-gray-600">
        {priority}
      </span>
    </div>
  )
}

export default PriorityIndicator