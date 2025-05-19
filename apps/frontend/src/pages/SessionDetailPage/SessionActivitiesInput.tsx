import ScrollTable from '@/components/ScrollTable'
import SessionActivityTableEntry from '@/components/SessionActivityTableEntry'
import { useContext, useEffect, useState } from 'react'
import { SessionDetailContext } from '../SessionDetailPage'
import { ActivityEntry } from '../DiaryPage'
import { SessionActivitiesContext } from './SessionDetail'
import { useAssignedActivities, useUnassignedActivities } from './useSessionDetail'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  assignActivitiesToSession,
  unassignActivitiesFromSession,
} from '@/services/activityService'
import { toast } from 'sonner'
import { ROUTE } from '@/constants/routes'

export default function SessionActivitiesInput() {
  const { sessionId, setCurrentView } = useContext(SessionDetailContext)
  const { selectedEntriesIds, setSelectedEntriesIds, checkedEntriesIds, addCheckedEntriesIds } =
    useContext(SessionActivitiesContext)
  const [initializedChecked, setInitializedChecked] = useState(false)
  const [allActivities, setAllActivities] = useState<ActivityEntry[]>([])

  const assignedActivities = useAssignedActivities(sessionId)
  const unassignedActivities = useUnassignedActivities()

  const queryClient = useQueryClient()

  const assignMutation = useMutation({
    mutationFn: async ({
      sessionId,
      activityIds,
    }: {
      sessionId: string
      activityIds: string[]
    }) => {
      return assignActivitiesToSession(sessionId, activityIds)
    },
    onSuccess: () => {},
    onError: () => {
      toast.error('Error assigning activities')
    },
  })

  const unassignMutation = useMutation({
    mutationFn: async (activityIds: string[]) => {
      return unassignActivitiesFromSession(activityIds)
    },
    onSuccess: () => {},
    onError: () => {
      toast.error('Error unassigning activities')
    },
  })

  const handleCheckedEntries = async (
    checkedEntriedsIds: string[],
    selectedEntriesIds: string[]
  ) => {
    if (checkedEntriedsIds.length === 0) {
      toast.error('Session must contain at least one Activity')
      return
    }

    const checkedEntriesIdsSet = new Set(checkedEntriedsIds)
    const selectedEntriesIdsSet = new Set(selectedEntriesIds)

    const addedEntries = checkedEntriedsIds.filter((id) => !selectedEntriesIdsSet.has(id))
    const removedEntries = selectedEntriesIds.filter((id) => !checkedEntriesIdsSet.has(id))

    for (const ID of addedEntries) {
      await assignMutation.mutateAsync({ sessionId: sessionId, activityIds: [ID] })
    }
    for (const ID of removedEntries) {
      await unassignMutation.mutateAsync([ID])
    }
    toast.success('Changes saved successfully')
    queryClient.invalidateQueries({ queryKey: [sessionId] })
    queryClient.refetchQueries({ queryKey: [sessionId], type: 'all' })

    queryClient.invalidateQueries({ queryKey: ['assignedActivities', sessionId] })
    queryClient.invalidateQueries({ queryKey: ['unassignedActivities'] })
    setCurrentView('session')
  }

  useEffect(() => {
    if (assignedActivities.isSuccess && unassignedActivities.isSuccess) {
      const allActivities = [...assignedActivities.data.items, ...unassignedActivities.data.items]
      allActivities.sort((a, b) => {
        const dateDiff = new Date(b.climbedAt).getTime() - new Date(a.climbedAt).getTime()
        if (dateDiff !== 0) return dateDiff

        // if dates are equal, compare names (case-insensitive)
        return a.routeName.localeCompare(b.routeName)
      })
      setAllActivities(allActivities)
      setSelectedEntriesIds(assignedActivities.data.items.map((activity) => activity.id))

      if (!initializedChecked) {
        setInitializedChecked(true)
        const checkedIds = assignedActivities.data.items.map((activity) => activity.id)
        checkedIds.forEach((id) => {
          if (!checkedEntriesIds.includes(id)) {
            addCheckedEntriesIds(id)
          }
        })
      }
    }
  }, [unassignedActivities.isSuccess, assignedActivities.isSuccess])

  return (
    <div className="flex flex-col gap-4 items-end">
      <Button
        className="w-[30%] m-2 "
        onClick={() => handleCheckedEntries(checkedEntriesIds, selectedEntriesIds)}
      >
        Save Changes
      </Button>
      <ScrollTable
        entries={allActivities}
        Component={SessionActivityTableEntry}
        backRoute={`${ROUTE.SESSIONS}/${sessionId}`}
      />
    </div>
  )
}
