import { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import SessionDetail from './SessionDetailPage/SessionDetail'
import { SessionQueryType } from '@/types/sessionTypes'
import { useSessionQuery } from '@/services/queryHooks'

type detailView = 'session' | 'activities'

export type SessionDetailContextType = {
  sessionId: string
  sessionQuery: SessionQueryType

  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (open: boolean) => void

  isDelete: boolean
  setIsDelete: (deleteActivity: boolean) => void

  isEdit: boolean
  setIsEdit: (editActivity: boolean) => void

  currentView: detailView
  setCurrentView: (view: detailView) => void
}

export const SessionDetailContext = createContext<SessionDetailContextType>({
  sessionId: '',
  sessionQuery: null as unknown as SessionQueryType,
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: () => {},
  isDelete: false,
  setIsDelete: () => {},
  isEdit: false,
  setIsEdit: () => {},
  currentView: 'session',
  setCurrentView: () => {},
})

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentView, setCurrentView] = useState<detailView>('session')

  // TODO: Change this to happy path
  if (!id) {
    throw new Error('Session ID is required')
  }

  const sessionQuery = useSessionQuery(id)

  return (
    <SessionDetailContext.Provider
      value={{
        sessionId: id || '',
        sessionQuery,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isDelete,
        setIsDelete,
        isEdit,
        setIsEdit,
        currentView,
        setCurrentView,
      }}
    >
      <SessionDetail />
    </SessionDetailContext.Provider>
  )
}
