import React from "react"
import { cn } from "@/utils/cn"

const Loading = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        "space-y-4 animate-pulse",
        className
      )}
      {...props}
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-1 h-16 bg-gray-200 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="w-48 h-5 bg-gray-200 rounded"></div>
            <div className="w-32 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Task card skeletons */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-1 h-12 bg-gray-200 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-200 rounded mt-1"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading