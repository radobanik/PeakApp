import { createContext, useContext, useState } from 'react'
import { ActivityCreateContext } from '@/App'
import ActivityCreate from './ActivityCreatePage/ActivityCreate'

export type NewActivityContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const NewActivityContext = createContext<NewActivityContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

export default function ActivityCreatePage() {
  const { routeId } = useContext(ActivityCreateContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!routeId) {
    throw new Error('Activity ID is required')
  }

  return (
    <NewActivityContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      <ActivityCreate />
    </NewActivityContext.Provider>
  )
}
