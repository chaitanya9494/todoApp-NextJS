import axios from 'axios'
import { Task, ApiResponse, CreateTaskData, UpdateTaskData } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>('/tasks')
    return response.data.data || []
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>('/tasks', taskData)
    if (!response.data.data) {
      throw new Error('Failed to create task')
    }
    return response.data.data
  },

  getTask: async (id: string): Promise<Task> => {
    try {
      const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`)
      if (!response.data.data) {
        throw new Error('Task not found')
      }
      return response.data.data
    } catch (error: any) {
      if (error.response?.status === 404) {
        const allTasks = await taskApi.getTasks()
        const task = allTasks.find(t => t.id === id)
        if (!task) {
          throw new Error('Task not found')
        }
        return task
      }
      throw error
    }
  },

  updateTask: async (id: string, updateData: UpdateTaskData): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, updateData)
    if (!response.data.data) {
      throw new Error('Failed to update task')
    }
    return response.data.data
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },

  toggleTask: async (id: string, completed: boolean): Promise<Task> => {
    return taskApi.updateTask(id, { completed })
  },
}
