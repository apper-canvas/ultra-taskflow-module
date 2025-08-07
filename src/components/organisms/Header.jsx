import React, { useState } from "react"
import { cn } from "@/utils/cn"
import { useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import ViewToggle from "@/components/molecules/ViewToggle"
import TaskModal from "@/components/organisms/TaskModal"
import { taskService } from "@/services/api/taskService"
import { toast } from "react-toastify"

const Header = ({ 
  searchQuery,
  onSearchChange,
  onTasksUpdate,
  className,
  ...props 
}) => {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getPageTitle = () => {
    const titles = {
      "/today": "Today's Tasks",
      "/upcoming": "Upcoming Tasks", 
      "/all": "All Tasks",
      "/archive": "Archive"
    }
    return titles[location.pathname] || "Tasks"
  }

  const getPageDescription = () => {
    const descriptions = {
      "/today": "Focus on what needs to be done today",
      "/upcoming": "Plan ahead with upcoming deadlines",
      "/all": "Complete overview of all your tasks", 
      "/archive": "Review your completed work"
    }
    return descriptions[location.pathname] || "Manage your tasks efficiently"
  }

  const handleCreateTask = async (formData) => {
    try {
      setIsSubmitting(true)
      await taskService.create(formData)
      toast.success("Task created successfully! 🎉")
      setIsModalOpen(false)
      if (onTasksUpdate) {
        onTasksUpdate()
      }
    } catch (err) {
      toast.error("Failed to create task")
      console.error("Create task error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <header 
      className={cn(
        "bg-white border-b border-gray-200 px-6 py-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Title Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 font-display gradient-text">
              {getPageTitle()}
            </h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="flex items-center gap-2 lg:hidden"
            >
              <ApperIcon name="Plus" size={16} />
              Add Task
            </Button>
          </div>
          <p className="text-gray-600 text-sm">
            {getPageDescription()}
          </p>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:flex-shrink-0">
          {/* Search Bar */}
          <div className="w-full sm:w-80">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search tasks..."
            />
          </div>

          {/* View Toggle */}
          <div className="w-full sm:w-auto">
            <ViewToggle />
          </div>

          {/* Create Task Button - Desktop */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="hidden lg:flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            New Task
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <span>Active Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-success to-emerald-600 rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-warning to-orange-600 rounded-full"></div>
            <span>Due Today</span>
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        isSubmitting={isSubmitting}
      />
    </header>
  )
}

export default Header