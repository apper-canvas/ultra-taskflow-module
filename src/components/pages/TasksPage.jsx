import React, { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import TaskList from "@/components/organisms/TaskList"

const TasksPage = ({ filter }) => {
  const { searchQuery, tasksUpdateTrigger } = useOutletContext()

  // Key prop to force re-render when tasks are updated
  const key = `${filter}-${tasksUpdateTrigger}`

  return (
    <div className="max-w-4xl mx-auto">
      <TaskList
        key={key}
        filter={filter}
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default TasksPage