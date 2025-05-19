import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { createContext, useContext, useState } from 'react'
import EntityDetailHeader from '@/components/EntityDetailHeader'
import { SessionDetailContext } from '../SessionDetailPage'
import { SessionInputs } from './SessionInputs'
import SessionActivitiesAssignment from './SessionActivitiesAssignment'
import { ROUTE } from '@/constants/routes'

export type SessionActivitiesContextType = {
  selectedEntriesIds: string[]
  setSelectedEntriesIds: (ids: string[]) => void
  checkedEntriesIds: string[]
  addCheckedEntriesIds: (id: string) => void
  removeCheckedEntriesIds: (id: string) => void
}

export const SessionActivitiesContext = createContext<SessionActivitiesContextType>({
  selectedEntriesIds: [],
  setSelectedEntriesIds: () => {},
  checkedEntriesIds: [],
  addCheckedEntriesIds: () => {},
  removeCheckedEntriesIds: () => {},
})

export default function ActivityDetail() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, setIsDelete, currentView } =
    useContext(SessionDetailContext)

  const [selectedEntriesIds, setSelectedEntriesIds] = useState<string[]>([])
  const [checkedEntriesIds, setCheckedEntriesIds] = useState<string[]>([])

  const addCheckedEntriesIds = (id: string) => {
    setCheckedEntriesIds((prev) => [...prev, id])
  }

  const removeCheckedEntriesIds = (id: string) => {
    setCheckedEntriesIds((prev) => prev.filter((entryId) => entryId !== id))
  }

  return (
    <div className="flex flex-col gap-4">
      <SessionActivitiesContext.Provider
        value={{
          selectedEntriesIds,
          setSelectedEntriesIds,
          checkedEntriesIds,
          addCheckedEntriesIds,
          removeCheckedEntriesIds,
        }}
      >
        <AlertDialogDelete
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          setDelete={setIsDelete}
        />
        {currentView == 'session' && (
          <>
            <EntityDetailHeader backRoute={ROUTE.SESSIONS} />
            <SessionInputs />
          </>
        )}
        {currentView == 'activities' && <SessionActivitiesAssignment />}
      </SessionActivitiesContext.Provider>
    </div>
  )
}
