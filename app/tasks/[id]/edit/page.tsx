'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { COLORS, Task } from '@/types'
import { taskApi } from '@/lib/api'

export default function EditTaskPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string

  const [task, setTask] = useState<Task | null>(null)
  const [title, setTitle] = useState('')
  const [color, setColor] = useState<string>(COLORS[0].value)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (taskId) {
      loadTask()
    }
  }, [taskId])

  const loadTask = async () => {
    try {
      setFetching(true)
      setError(null)
      const fetchedTask = await taskApi.getTask(taskId)
      setTask(fetchedTask)
      setTitle(fetchedTask.title)
      setColor(fetchedTask.color)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Task not found. It may have been deleted.')
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to the server. Please ensure the backend is running.')
      } else {
        setError('Failed to load task. Please check your connection and try again.')
      }
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await taskApi.updateTask(taskId, {
        title: title.trim(),
        color
      })
      router.push('/')
    } catch (err) {
      setError('Failed to update task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 20%, #1a1a1a 20%, #1a1a1a 100%)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error && !task) {
    return (
      <div className="min-h-screen text-white" style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 20%, #1a1a1a 20%, #1a1a1a 100%)' }}>
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-2">
            <Image 
              src="/logo.png" 
              alt="Todo App Logo" 
              width={100} 
              height={50}
            />
          </div>
        </div>
        <div className="max-w-md mx-auto px-6">
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-6 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-3 text-center">Unable to Load Task</h3>
            <p className="mb-6 text-center">{error}</p>
            <div className="space-y-3">
              <Link 
                href="/"
                className="block text-center text-white px-6 py-3 rounded-xl transition-all font-semibold transform hover:scale-105"
                style={{ backgroundColor: '#1E6F9F' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a5f8a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E6F9F'}
              >
                Go back to home
              </Link>
              <button
                onClick={loadTask}
                className="block w-full text-center border border-red-600 hover:bg-red-900/30 text-red-300 px-6 py-3 rounded-xl transition-all font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 20%, #1a1a1a 20%, #1a1a1a 100%)' }}>
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

      <div className="flex justify-center items-center px-6 flex-1">
        <div style={{ 
          width: '736px',
          height: '358px',
          transform: 'rotate(0deg)',
          opacity: 1,
          position: 'relative',
          top: '-95px',
          left: '0px'
        }}>

          <form onSubmit={handleSubmit} className="rounded p-6" style={{ gap: '48px', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'transparent' }}>
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <div className="mb-6 mt-3" style={{ marginLeft: '0px' }}>
                <Link 
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Image 
                    src="/arrow-left.png" 
                    alt="Back" 
                    width={24} 
                    height={24}
                  />
                </Link>
              </div>
              
              <label htmlFor="title" className="block text-lg font-semibold mb-3" style={{ color: '#4EA8DE' }}>
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Brush your teeth"
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-4" style={{ color: '#4EA8DE' }}>
                Color
              </label>
              <div className="flex flex-wrap gap-4 justify-start">
                {COLORS.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() => setColor(colorOption.value)}
                    className={`w-14 h-14 rounded-full transition-all transform hover:scale-110 ${
                      color === colorOption.value 
                      ? 'ring-4 ring-white ring-opacity-70 scale-110' 
                      : 'hover:scale-105'
                  }`}
                    style={{ backgroundColor: colorOption.value }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="flex items-center justify-center text-white transition-all transform hover:scale-105 w-full"
                style={{ 
                  backgroundColor: '#1E6F9F',
                  color: 'white',
                  height: '52px',
                  transform: 'rotate(0deg)',
                  opacity: 1,
                  gap: '8px',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: loading || !title.trim() ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!loading && title.trim()) {
                    e.currentTarget.style.backgroundColor = '#1a5f8a'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && title.trim()) {
                    e.currentTarget.style.backgroundColor = '#1E6F9F'
                  }
                }}
              >
                Save
                {!loading && (
                  <Image 
                    src="/vector.png" 
                    alt="Save" 
                    width={18} 
                    height={18}
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}