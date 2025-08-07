import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ 
  message = "Something went wrong",
  onRetry,
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
      <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name="AlertTriangle" size={24} className="text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
        
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Refresh Page
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm text-red-700">
          If this problem persists, please check your internet connection or try again later.
        </p>
      </div>
    </div>
  )
}

export default Error