import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import { toast } from "react-toastify"
import TaskCard from "@/components/organisms/TaskCard"
import TaskModal from "@/components/organisms/TaskModal"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { taskService } from "@/services/api/taskService"

const TaskList = ({ 
  filter = "all",
  searchQuery = "",
  className,
  ...props 
}) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [filter])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError("")
      
      let data = []
      switch (filter) {
        case "today":
          data = await taskService.getTodayTasks()
          break
        case "upcoming":
          data = await taskService.getUpcomingTasks()
          break
        case "archive":
          data = await taskService.getArchivedTasks()
          break
        default:
          data = await taskService.getActiveTasks()
      }
      
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Load tasks error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("Task completed! Great work! 🎉")
      } else {
        toast.info("Task marked as incomplete")
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Toggle complete error:", err)
    }
  }
// Handle subtask toggle
  const handleSubtaskToggle = async (taskId, subtaskId) => {
    // This would be implemented when task data structure includes subtasks
    // For now, just show a toast indicating the feature needs data structure updates
    toast.info("Subtask functionality requires enhanced task data structure")
  }
  const handleEdit = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleDelete = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Delete task error:", err)
    }
  }

  const handleArchive = async (taskId) => {
    try {
      await taskService.archiveTask(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task archived")
    } catch (err) {
      toast.error("Failed to archive task")
      console.error("Archive task error:", err)
    }
  }

  const handleRestore = async (taskId) => {
    try {
      await taskService.restoreTask(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task restored")
    } catch (err) {
      toast.error("Failed to restore task")
      console.error("Restore task error:", err)
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true)
      
      if (selectedTask) {
        const updatedTask = await taskService.update(selectedTask.Id, formData)
        setTasks(prev => prev.map(task => 
          task.Id === selectedTask.Id ? updatedTask : task
        ))
        toast.success("Task updated successfully")
      } else {
        const newTask = await taskService.create(formData)
        setTasks(prev => [newTask, ...prev])
        toast.success("Task created successfully")
      }
      
      setIsModalOpen(false)
      setSelectedTask(null)
    } catch (err) {
      toast.error("Failed to save task")
      console.error("Save task error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setSelectedTask(null)
    }
  }

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    )
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadTasks}
      />
    )
  }

  if (filteredTasks.length === 0) {
    const emptyConfig = {
      today: {
        title: "No tasks for today",
        description: "You're all caught up! Enjoy your free time or create a new task.",
        actionText: "Add Today's Task"
      },
      upcoming: {
        title: "No upcoming tasks",
        description: "Your schedule is clear. Perfect time to plan ahead!",
        actionText: "Plan Ahead"
      },
      archive: {
        title: "No archived tasks",
        description: "Complete some tasks to see them here.",
        actionText: "View Active Tasks"
      },
      search: {
        title: "No tasks found",
        description: `No tasks match "${searchQuery}". Try adjusting your search terms.`,
        actionText: "Clear Search"
      },
      default: {
        title: "No tasks yet",
        description: "Start organizing your day by creating your first task!",
        actionText: "Create First Task"
      }
    }

    const config = searchQuery 
      ? emptyConfig.search 
      : emptyConfig[filter] || emptyConfig.default

    return (
      <Empty
        title={config.title}
        description={config.description}
        actionText={config.actionText}
        onAction={() => {
          if (searchQuery) {
            // This would need to be passed from parent to clear search
            return
          }
          if (filter === "archive") {
            window.location.href = "/all"
            return
          }
          setIsModalOpen(true)
        }}
      />
    )
  }

  return (
    <div 
      className={cn("space-y-4", className)}
      {...props}
    >
      {filteredTasks.map((task) => (
        <div key={task.Id} className="group">
          <TaskCard
            task={task}
onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onRestore={handleRestore}
            onSubtaskToggle={(subtaskId) => handleSubtaskToggle(task.Id, subtaskId)}
            showArchiveActions={filter === "archive"}
          />
        </div>
      ))}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default TaskList