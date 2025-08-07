import React from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'

const SubtaskList = ({ 
  subtasks = [], 
  parentCompleted = false,
  onSubtaskToggle,
  className,
  ...props 
}) => {
  if (!subtasks || subtasks.length === 0) {
    return null
  }

  const completedCount = subtasks.filter(subtask => subtask.completed).length
  const totalCount = subtasks.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleSubtaskToggle = (subtaskId) => {
    if (onSubtaskToggle) {
      onSubtaskToggle(subtaskId)
    }
  }

  return (
    <div className={cn("mt-4 border-t border-gray-100 pt-4", className)} {...props}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ApperIcon name="ListChecks" size={14} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Subtasks
          </span>
          <span className="text-xs text-gray-500">
            ({completedCount}/{totalCount})
          </span>
        </div>
        
        {/* Parent Completion Indicator */}
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
          parentCompleted 
            ? "bg-green-100 text-green-700"
            : completionPercentage === 100
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600"
        )}>
          <div className={cn(
            "w-2 h-2 rounded-full",
            parentCompleted 
              ? "bg-green-500"
              : completionPercentage === 100
              ? "bg-blue-500"
              : "bg-gray-400"
          )} />
          {parentCompleted 
            ? "Parent Complete"
            : completionPercentage === 100 
            ? "Ready to Complete"
            : `${Math.round(completionPercentage)}% Done`
          }
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              parentCompleted 
                ? "bg-green-500"
                : completionPercentage === 100
                ? "bg-blue-500"
                : "bg-gray-400"
            )}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Subtask List */}
      <div className="space-y-2">
        {subtasks.map((subtask) => (
          <div 
            key={subtask.Id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-md transition-colors",
              "hover:bg-gray-50",
              subtask.completed && "opacity-75"
            )}
          >
            <Checkbox
              checked={subtask.completed}
              onChange={() => handleSubtaskToggle(subtask.Id)}
              disabled={parentCompleted}
              className={cn(
                parentCompleted && "opacity-50 cursor-not-allowed"
              )}
            />
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm text-gray-700",
                subtask.completed && "line-through text-gray-500"
              )}>
                {subtask.title}
              </p>
              {subtask.description && (
                <p className={cn(
                  "text-xs text-gray-500 mt-0.5",
                  subtask.completed && "line-through text-gray-400"
                )}>
                  {subtask.description}
                </p>
              )}
            </div>

            {subtask.completed && (
              <div className="flex-shrink-0">
                <ApperIcon 
                  name="CheckCircle2" 
                  size={14} 
                  className="text-green-500" 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Status Message */}
      {completionPercentage === 100 && !parentCompleted && (
        <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="flex items-center gap-2">
            <ApperIcon name="CheckCircle" size={16} className="text-blue-600" />
            <p className="text-sm text-blue-700 font-medium">
              All subtasks completed! Ready to mark parent task as done.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubtaskList