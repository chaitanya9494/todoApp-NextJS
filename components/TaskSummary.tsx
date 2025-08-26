import { Task } from '@/types'

interface TaskSummaryProps {
  tasks: Task[]
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="flex items-center justify-center mb-8 px-4">
      <div className="flex items-center justify-between" style={{ width: '736px' }}>
        <div className="flex items-center space-x-2">
          <h2 
            style={{ 
              color: '#4EA8DE',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            Tasks
          </h2>
          <div 
            className="bg-gray-800 text-white px-3 py-1 rounded-full"
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {totalCount}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <h2 
            style={{ 
              color: '#8284FA',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            Completed
          </h2>
          <div 
            className="bg-gray-800 text-white px-3 py-1 rounded-full"
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {totalCount === 0 ? '0' : `${completedCount} de ${totalCount}`}
          </div>
        </div>
      </div>
    </div>
  )
}
