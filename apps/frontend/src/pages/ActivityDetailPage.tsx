import { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivityDetail from './ActvityDetailPage/ActivityDetail'
import { useActivity } from './ActvityDetailPage/useActivityDetail'
import { ActivityQueryType } from '@/types/activityTypes'

export type ActivityDetailContextType = {
  activityId: string
  activityQuery: ActivityQueryType

  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (open: boolean) => void

  isDelete: boolean
  setIsDelete: (deleteActivity: boolean) => void

  isEdit: boolean
  setIsEdit: (editActivity: boolean) => void
}

export const ActivityDetailContext = createContext<ActivityDetailContextType>({
  activityId: '',
  activityQuery: null as unknown as ActivityQueryType,
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: () => {},
  isDelete: false,
  setIsDelete: () => {},
  isEdit: false,
  setIsEdit: () => {},
})

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // TODO: Change this to happy path
  if (!id) {
    throw new Error('Activity ID is required')
  }

  const activityQuery = useActivity(id)

  return (
    <ActivityDetailContext.Provider
      value={{
        activityId: id || '',
        activityQuery,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isDelete,
        setIsDelete,
        isEdit,
        setIsEdit,
      }}
    >
      <ActivityDetail />
    </ActivityDetailContext.Provider>
  )
}
