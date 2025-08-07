import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "Nothing to see here",
  description = "Get started by adding your first item",
  actionText = "Add Item",
  onAction,
  icon = "Plus",
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
      {...props}
    >
      <div className="relative mb-8">
        {/* Decorative background circles */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-success/20 to-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Main icon */}
        <div className="relative w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <ApperIcon name={icon} size={16} />
          {actionText}
        </Button>
      )}
      
      {/* Motivational footer */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
        <div className="flex items-center justify-center gap-2 text-primary font-medium">
          <ApperIcon name="Sparkles" size={16} />
          <span>Ready to boost your productivity?</span>
          <ApperIcon name="Zap" size={16} />
        </div>
      </div>
    </div>
  )
}

export default Empty