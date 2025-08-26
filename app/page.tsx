'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Task } from '@/types'
import { taskApi } from '@/lib/api'
import TaskCard from '@/components/TaskCard'
import TaskSummary from '@/components/TaskSummary'

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await taskApi.getTasks()
      setTasks(fetchedTasks)
    } catch (err: any) {
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to the server. Please ensure the backend is running.')
      } else {
        setError('Failed to load tasks. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await taskApi.toggleTask(id, completed)
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ))
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await taskApi.deleteTask(id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 20%, #1a1a1a 20%, #1a1a1a 100%)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 20%, #1a1a1a 20%, #1a1a1a 100%)' }}>
      <div className="text-center py-8">
        <div className="flex items-center justify-center mb-4" style={{ position: 'relative' }}>
          <Image 
            src="/logo.png" 
            alt="Todo App Logo" 
            width={226} 
            height={48}
            style={{
              opacity: 1,
              transform: 'rotate(0deg)'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center px-6">
        <div className="mb-8 mt-6">
          <Link 
            href="/tasks/new"
            className="flex items-center justify-center text-white text-center transition-colors shadow-lg"
            style={{ 
              backgroundColor: '#1E6F9F', 
              color: 'white',
              width: '736px',
              height: '52px',
              transform: 'rotate(0deg)',
              opacity: 1,
              gap: '8px',
              borderRadius: '8px',
              padding: '16px',
              position: 'relative',
              top: '0px',
              left: '0px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a5f8a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E6F9F'}
          >
            Create Task
            <Image 
              src="/plus.png" 
              alt="Add" 
              width={20} 
              height={20}
            />
          </Link>
        </div>

        <TaskSummary tasks={tasks} />

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6" style={{ width: '736px' }}>
            {error}
            <button 
              onClick={loadTasks} 
              className="ml-4 text-red-400 underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="space-y-3" style={{ width: '736px' }}>
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6 flex justify-center">
                <Image 
                  src="/Clipboard.png" 
                  alt="No tasks" 
                  width={56} 
                  height={56}
                  className="opacity-50"
                />
              </div>
              <div style={{ width: '688px', height: '66px', margin: '0 auto', opacity: 1 }}>
                <h2 
                  className="mb-2" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    color: '#808080'
                  }}
                >
                  You don't have any tasks registered yet.
                </h2>
                <p 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    color: '#808080'
                  }}
                >
                  Create tasks and organize your to-do items
                </p>
              </div>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
