import { useQuery } from '@tanstack/react-query'

import ScrollTable from '@/components/ScrollTable'
import { getSessions } from '@/services/sessionService'
import SessionTableEntry from '@/components/SessionTableEntry'
import { ROUTE } from '@/constants/routes'

import BackButton from '@/components/BackButton'
import plusIcon from '@/assets/Plus.svg'

export default function ActivitiesPage() {
  const sessionsQuery = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => getSessions(),
    select: (data) => ({
      items: data.items.map((session) => ({
        id: session.id,
        createdAt: session.createdAt,
        name: session.name,
        note: session.note,
        numberOfActivities: session.assignedActivities.length,
      })),
      totalCount: data.total,
    }),
  })

  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-between p-4 gap-4">
        <div className="flex flex-row items-center gap-4">
          <BackButton backRoute={ROUTE.DIARY} />
          <h1 className="text-2xl">My Sessions</h1>
        </div>
        <img src={plusIcon} alt="Add Activity" className="w-6 h-6 cursor-pointer" />
      </div>
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
