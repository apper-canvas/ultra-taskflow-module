import React from "react"
import { cn } from "@/utils/cn"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import TaskForm from "@/components/organisms/TaskForm"

const TaskModal = ({ 
  isOpen,
  onClose,
  task = null,
  onSubmit,
  isSubmitting = false,
  className,
  ...props 
}) => {
  if (!isOpen) return null

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative w-full max-w-2xl bg-white rounded-xl shadow-2xl",
              "max-h-[90vh] overflow-hidden",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-display">
                  {task ? "Edit Task" : "Create New Task"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {task ? "Update task details below" : "Fill in the details to create a new task"}
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <TaskForm
                task={task}
                onSubmit={onSubmit}
                onCancel={onClose}
                isSubmitting={isSubmitting}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default TaskModal