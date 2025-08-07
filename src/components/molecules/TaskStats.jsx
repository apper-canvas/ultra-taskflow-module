import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const TaskStats = ({ 
  totalTasks,
  completedTasks,
  todayTasks,
  className,
  ...props 
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "CheckSquare",
      gradient: "from-primary to-secondary"
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      gradient: "from-success to-emerald-600"
    },
    {
      label: "Today",
      value: todayTasks,
      icon: "Calendar",
      gradient: "from-info to-blue-600"
    }
  ]

  return (
    <div 
      className={cn(
        "space-y-4",
        className
      )}
      {...props}
    >
      {/* Progress Ring */}
      <div className="flex items-center justify-center p-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${completionRate * 2.51} 251.2`}
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">
              {completionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg bg-gradient-to-r",
                stat.gradient
              )}>
                <ApperIcon name={stat.icon} size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {stat.label}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskStats