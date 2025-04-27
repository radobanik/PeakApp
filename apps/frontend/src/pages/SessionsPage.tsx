import { useQuery } from '@tanstack/react-query'

import ScrollTable from '@/components/ScrollTable'
import { getSessions } from '@/services/sessionService'
import SessionTableEntry from '@/components/SessionTableEntry'

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
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {sessionsQuery.isLoading && <div>Loading...</div>}
        {sessionsQuery.isError && <div>Error: {sessionsQuery.error.message}</div>}
        {sessionsQuery.isSuccess && (
          <div className="flex-1 overflow-auto">
            <ScrollTable entries={sessionsQuery.data.items} Component={SessionTableEntry} />
          </div>
        )}
      </div>
    </div>
  )
}
