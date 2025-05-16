import { createContext, useState } from 'react'
import SessionCreate from './SessionCreatePage/SessionCreate'
import { ActivityEntry } from './DiaryPage'
import { SessionActivitiesContext } from './SessionDetailPage/SessionDetail'

export type NewSessionContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void

  allEntries: ActivityEntry[]
  setAllEntries: (entries: ActivityEntry[]) => void

  checkedEntriesIds: string[]
  setCheckedEntriesIds: (ids: string[]) => void

  currentView: string
  setCurrentView: (view: createView) => void
}

export const NewSessionContext = createContext<NewSessionContextType>({
  isOpen: false,
  setIsOpen: () => {},
  allEntries: [],
  setAllEntries: () => {},
  checkedEntriesIds: [],
  setCheckedEntriesIds: () => {},
  currentView: 'activites',
  setCurrentView: () => {},
})

export type createView = 'activites' | 'inputs'

export default function SessionCreatePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [allEntries, setAllEntries] = useState<ActivityEntry[]>([])
  const [checkedEntriesIds, setCheckedEntriesIds] = useState<string[]>([])
  const [currentView, setCurrentView] = useState<createView>('activites')
  const addCheckedEntryId = (id: string) => {
    setCheckedEntriesIds((prev) => [...prev, id])
  }
  const removeCheckedEntryId = (id: string) => {
    setCheckedEntriesIds((prev) => prev.filter((entryId) => entryId !== id))
  }

  return (
    <NewSessionContext.Provider
      value={{
        isOpen,
        setIsOpen,
        allEntries,
        setAllEntries,
        checkedEntriesIds,
        setCheckedEntriesIds,
        currentView,
        setCurrentView,
      }}
    >
      <SessionActivitiesContext.Provider
        value={{
          selectedEntriesIds: [],
          setSelectedEntriesIds: () => {},

          checkedEntriesIds,
          addCheckedEntriesIds: addCheckedEntryId,
          removeCheckedEntriesIds: removeCheckedEntryId,
        }}
      >
        <SessionCreate />
      </SessionActivitiesContext.Provider>
    </NewSessionContext.Provider>
  )
}
