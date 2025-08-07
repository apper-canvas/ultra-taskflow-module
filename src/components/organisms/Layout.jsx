import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"
import ApperIcon from "@/components/ApperIcon"

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [tasksUpdateTrigger, setTasksUpdateTrigger] = useState(0)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleTasksUpdate = () => {
    setTasksUpdateTrigger(prev => prev + 1)
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMobileSidebarOpen ? "block" : "hidden"}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Mobile Sidebar */}
        <div className={`
          fixed left-0 top-0 h-full bg-surface transform transition-transform duration-300 ease-out z-50
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-display">
                  TaskFlow
                </h1>
              </div>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          <div className="w-80">
            <Sidebar className="border-r-0" />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Static */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden flex items-center gap-4 p-4 border-b border-gray-200 bg-white">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
              <ApperIcon name="CheckSquare" size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 font-display">
              TaskFlow
            </h1>
          </div>
        </div>

        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onTasksUpdate={handleTasksUpdate}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet context={{ 
            searchQuery, 
            tasksUpdateTrigger 
          }} />
        </main>
      </div>
    </div>
  )
}

export default Layout