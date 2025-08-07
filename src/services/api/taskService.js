import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const maxId = Math.max(...tasks.map(t => t.Id), 0)
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      category: taskData.category,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      archived: false,
      createdAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(250)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index] = { ...tasks[index], ...updateData }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    const deletedTask = tasks.splice(index, 1)[0]
    return { ...deletedTask }
  },

  async getTodayTasks() {
    await delay(250)
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    return tasks.filter(task => 
      !task.archived && 
      (task.dueDate.startsWith(todayStr) || 
       new Date(task.dueDate) <= today)
    ).map(task => ({ ...task }))
  },

  async getUpcomingTasks() {
    await delay(250)
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)
    
    return tasks.filter(task => 
      !task.archived && 
      new Date(task.dueDate) > today &&
      new Date(task.dueDate) <= nextWeek
    ).map(task => ({ ...task }))
  },

  async getActiveTasks() {
    await delay(250)
    return tasks.filter(task => !task.archived).map(task => ({ ...task }))
  },

  async getArchivedTasks() {
    await delay(250)
    return tasks.filter(task => task.archived).map(task => ({ ...task }))
  },

  async toggleComplete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index].completed = !tasks[index].completed
    return { ...tasks[index] }
  },

  async archiveTask(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index].archived = true
    return { ...tasks[index] }
  },

  async restoreTask(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index].archived = false
    return { ...tasks[index] }
  }
}