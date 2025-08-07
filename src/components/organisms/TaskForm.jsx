import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import FormField from "@/components/molecules/FormField"
import { categoryService } from "@/services/api/categoryService"

const TaskForm = ({ 
  task = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
  className,
  ...props 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal",
    priority: "Medium",
    dueDate: ""
  })
  
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "Personal",
        priority: task.priority || "Medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : ""
      })
    } else {
      // Set default due date to today at 5 PM
      const today = new Date()
      today.setHours(17, 0, 0, 0)
      setFormData(prev => ({
        ...prev,
        dueDate: format(today, "yyyy-MM-dd'T'HH:mm")
      }))
    }
  }, [task])

  const loadCategories = async () => {
    try {
      setIsLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const submitData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: new Date(formData.dueDate).toISOString()
    }

    onSubmit(submitData)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      {...props}
    >
      <div className="space-y-4">
        <FormField
          label="Task Title"
          required
          error={errors.title}
        >
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter task title..."
            error={!!errors.title}
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
        >
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Add task description (optional)..."
            rows={3}
            error={!!errors.description}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Category"
            required
            error={errors.category}
          >
            <Select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              error={!!errors.category}
            >
              {categories.map(category => (
                <option key={category.Id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Priority"
            required
            error={errors.priority}
          >
            <Select
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
              error={!!errors.priority}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormField>
        </div>

        <FormField
          label="Due Date & Time"
          required
          error={errors.dueDate}
        >
          <Input
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            error={!!errors.dueDate}
          />
        </FormField>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name={task ? "Save" : "Plus"} size={16} />
              {task ? "Update Task" : "Create Task"}
            </>
          )}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm