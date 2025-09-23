import { FC } from 'react'

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent" />
    </div>
  )
}

export default LoadingSpinner
