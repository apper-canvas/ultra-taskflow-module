import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ 
  value,
  onChange,
  placeholder = "Search tasks...",
  className,
  ...props 
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={16} className="text-gray-400" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-4"
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar