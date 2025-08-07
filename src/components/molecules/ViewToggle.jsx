import React from "react"
import { cn } from "@/utils/cn"
import { useNavigate, useLocation } from "react-router-dom"

const ViewToggle = ({ className, ...props }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const views = [
    { path: "/today", label: "Today", key: "today" },
    { path: "/upcoming", label: "Upcoming", key: "upcoming" },
    { path: "/all", label: "All Tasks", key: "all" },
    { path: "/archive", label: "Archive", key: "archive" }
  ]

  const currentPath = location.pathname

  return (
    <div 
      className={cn(
        "flex bg-surface rounded-lg p-1 border border-gray-200",
        className
      )}
      {...props}
    >
      {views.map((view) => (
        <button
          key={view.key}
          onClick={() => navigate(view.path)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            currentPath === view.path
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-white"
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  )
}

export default ViewToggle