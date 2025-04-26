import HeaderBar from '@/components/HeaderBar'
import { useQuery } from '@tanstack/react-query'

import ScrollTable from '@/components/ScrollTable'
import { getSessions } from '@/services/sessionService'
import SessionTableEntry from '@/components/SessionTableEntry'

export type activityEntry = {
  id: string
  climbedAt: Date
  routeName: string
  routeGrade: string
  routeType: string
  numOfAttempts: number
  topped: boolean
}

export type SessionEntry = {
  id: string
  createdAt: Date
  note: string
  numberOfActivities: number
}

export default function ActivitiesPage() {
  const sessionsQuery = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => getSessions(),
    select: (data) => ({
      items: data.items.map((session) => ({
        id: session.id,
        createdAt: session.createdAt,
        note: session.note,
        numberOfActivities: session.assignedActivities.length,
      })),
      totalCount: data.total,
    }),
  })

  return (
    <main className="flex flex-col h-screen">
      <HeaderBar />
      <div className="flex flex-1 overflow-hidden">
        {sessionsQuery.isLoading && <div>Loading...</div>}
        {sessionsQuery.isError && <div>Error: {sessionsQuery.error.message}</div>}
        {sessionsQuery.isSuccess && (
          <div className="flex-1 overflow-auto">
            <ScrollTable entries={sessionsQuery.data.items} Component={SessionTableEntry} />
          </div>
        )}
      </div>
    </main>
  )
}
