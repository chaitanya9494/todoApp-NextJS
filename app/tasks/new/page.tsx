'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { COLORS } from '@/types'
import { taskApi } from '@/lib/api'

export default function CreateTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [color, setColor] = useState<string>(COLORS[0].value)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await taskApi.createTask({
        title: title.trim(),
        color
      })
      router.push('/')
    } catch (err) {
      setError('Failed to create task. Please try again.')
    } finally {
      setLoading(false)
    }
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

          <form onSubmit={handleSubmit} className="rounded p-6" style={{ gap: '32px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 0px)', backgroundColor: 'transparent' }}>
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <div className="mb-6">
                <Link 
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 w-fit"
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
                Add Task
                {!loading && (
                  <Image 
                    src="/plus.png" 
                    alt="Add" 
                    width={18} 
                    height={18}
                  />
                )}
                {loading && <span>Adding Task...</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
