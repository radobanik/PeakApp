import { useContext, useEffect } from 'react'
import { NewSessionContext } from '../SessionCreate'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import ScrollTable from '@/components/ScrollTable'
import SessionActivityTableEntry from '@/components/SessionActivityTableEntry'
import { ROUTE } from '@/constants/routes'
import { useUnassignedActivitiesQuery } from '@/services/queryHooks'

export default function SessionCreateActivities() {
  const { allEntries, setAllEntries, checkedEntriesIds, setCurrentView } =
    useContext(NewSessionContext)
  const unassignedActivities = useUnassignedActivitiesQuery()

  const handleCheckedEntries = async (checkedEntriedsIds: string[]) => {
    if (checkedEntriedsIds.length === 0) {
      toast.error('Session must contain at least one Activity')
      return
    }
    setCurrentView('inputs')
  }

  useEffect(() => {
    if (unassignedActivities.isSuccess) {
      setAllEntries(unassignedActivities.data.items)
    }
  }, [unassignedActivities])

  return (
    <div className="flex flex-col gap-4 items-end w-full lg:w-[50%] lg:mx-auto md:w-[70%] md:mx-auto px-4">
      <Button
        className="w-[30%] m-2"
        test-id="session-create-continue"
        onClick={() => handleCheckedEntries(checkedEntriesIds)}
      >
        Continue
      </Button>
      <ScrollTable
        entries={allEntries}
        Component={SessionActivityTableEntry}
        backRoute={ROUTE.SESSIONS}
      />
    </div>
  )
}
