import React from "react"
import { useOutletContext } from "react-router-dom"
import TaskList from "@/components/organisms/TaskList"

const ArchivePage = () => {
  const { searchQuery, tasksUpdateTrigger } = useOutletContext()

  const key = `archive-${tasksUpdateTrigger}`

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 p-6 bg-gradient-to-r from-success/10 to-emerald-50 rounded-xl border border-success/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-success to-emerald-600 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 font-display">
            Completed Tasks Archive
          </h2>
        </div>
        <p className="text-gray-600">
          Great work! Here are all the tasks you've completed. You can restore any task back to your active list if needed.
        </p>
      </div>

      <TaskList
        key={key}
        filter="archive"
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default ArchivePage