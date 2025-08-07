import React, { useState } from "react"
import { cn } from "@/utils/cn"
import { format, isToday, isPast } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import PriorityIndicator from "@/components/molecules/PriorityIndicator"
import Button from "@/components/atoms/Button"
import SubtaskList from "@/components/molecules/SubtaskList"

const TaskCard = ({ 
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onArchive,
onRestore,
  onSubtaskToggle,
  showArchiveActions = false,
  className,
  ...props 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    if (isCompleting) return
    
    setIsCompleting(true)
    
    if (!task.completed) {
      // Add completion animation
      setTimeout(() => {
        setIsCompleting(false)
      }, 300)
    } else {
      setIsCompleting(false)
    }
    
    await onToggleComplete(task.Id)
  }

  const dueDate = new Date(task.dueDate)
  const isOverdue = isPast(dueDate) && !task.completed
  const isDueToday = isToday(dueDate)

  const getCategoryVariant = (category) => {
    const categoryMap = {
      "Work": "work",
      "Personal": "personal", 
      "Health": "health",
      "Finance": "finance",
      "Education": "education",
      "Shopping": "shopping"
    }
    return categoryMap[category] || "default"
  }

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 task-card-hover",
        task.completed && "opacity-75",
        isCompleting && "task-completion-animation",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* Priority Indicator */}
        <div className="flex-shrink-0 mt-1">
          <PriorityIndicator priority={task.priority} />
        </div>

        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={cn(
              "text-base font-semibold text-gray-900 leading-tight",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            {!showArchiveActions && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="p-1.5"
                >
                  <ApperIcon name="Edit2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.Id)}
                  className="p-1.5 text-error hover:text-error/80"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </div>
            )}
          </div>

          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 leading-relaxed",
              task.completed && "line-through text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant={getCategoryVariant(task.category)}>
                {task.category}
              </Badge>
              
              <div className={cn(
                "flex items-center gap-1.5 text-xs",
                isOverdue && "text-error font-medium",
                isDueToday && "text-warning font-medium",
                !isOverdue && !isDueToday && "text-gray-500"
              )}>
                <ApperIcon name="Calendar" size={12} />
                <span>
                  {format(dueDate, "MMM d, yyyy")}
                  {isOverdue && " (Overdue)"}
                  {isDueToday && " (Today)"}
                </span>
              </div>
            </div>

            {showArchiveActions && (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onRestore(task.Id)}
                  className="flex items-center gap-1.5"
                >
                  <ApperIcon name="RotateCcw" size={14} />
                  Restore
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
{/* Subtasks Section */}
      <SubtaskList 
        subtasks={task.subtasks}
        parentCompleted={task.completed}
        onSubtaskToggle={onSubtaskToggle}
      />
    </div>
  )
}

export default TaskCard