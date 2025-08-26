import Link from 'next/link'
import { Task } from '@/types'
import Image from 'next/image'

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  return (
    <div className="rounded-lg p-4 border border-gray-300 hover:border-gray-400 transition-colors" style={{ background: '#333333' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button 
            onClick={() => onToggleComplete(task.id, !task.completed)}
            className="flex items-center cursor-pointer"
          >
            <Image
              src={task.completed ? "/completecheck.png" : "/check.png"}
              alt={task.completed ? "Completed" : "Uncompleted"}
              width={24}
              height={24}
            />
          </button>
          
          <Link 
            href={`/tasks/${task.id}/edit`}
            className="flex-1 group"
          >
            <span className={`text-base font-medium group-hover:text-blue-400 cursor-pointer transition-colors ${
              task.completed ? 'line-through text-gray-500' : 'text-white'
            }`}>
              {task.title}
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-red-900/20 transition-colors"
            title="Delete task"
          >
             <Image 
                    src="/trash.png" 
                    alt="Delete" 
                    width={24} 
                    height={24}
                  />
          </button>
        </div>
      </div>
    </div>
  )
}
