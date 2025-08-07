import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import TaskStats from "@/components/molecules/TaskStats"
import { taskService } from "@/services/api/taskService"

const Sidebar = ({ className, ...props }) => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    todayTasks: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const [allTasks, todayTasks] = await Promise.all([
        taskService.getActiveTasks(),
        taskService.getTodayTasks()
      ])
      
      const completed = allTasks.filter(task => task.completed).length
      
      setStats({
        totalTasks: allTasks.length,
        completedTasks: completed,
        todayTasks: todayTasks.length
      })
    } catch (error) {
      console.error("Failed to load stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const navigationItems = [
    {
      path: "/today",
      label: "Today",
      icon: "Calendar",
      description: "Tasks due today"
    },
    {
      path: "/upcoming", 
      label: "Upcoming",
      icon: "Clock",
      description: "Next 7 days"
    },
    {
      path: "/all",
      label: "All Tasks",
      icon: "CheckSquare",
      description: "Complete overview"
    },
    {
      path: "/archive",
      label: "Archive",
      icon: "Archive",
      description: "Completed tasks"
    }
  ]

  return (
    <aside 
      className={cn(
        "w-80 bg-surface border-r border-gray-200 flex flex-col",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <ApperIcon name="CheckSquare" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-display">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-500">
              Stay organized & productive
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 space-y-2">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Views
          </h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                )}
              >
                <ApperIcon 
                  name={item.icon} 
                  size={16} 
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </div>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Stats Section */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Your Progress
          </h2>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-200 rounded-lg">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    <div className="w-8 h-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <TaskStats
              totalTasks={stats.totalTasks}
              completedTasks={stats.completedTasks}
              todayTasks={stats.todayTasks}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Keep going! You're doing great! 🎯
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar