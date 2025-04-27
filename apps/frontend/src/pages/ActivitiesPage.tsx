import { getActivities } from '@/services/activityService'
import { useQuery } from '@tanstack/react-query'

import ActivityTableEntry from '@/components/ActivityTableEntry'
import ScrollTable from '@/components/ScrollTable'
import { Skeleton } from '@/components/ui/skeleton'

export default function ActivitiesPage() {
  const activitiesQuery = useQuery({
    queryKey: ['activities'],
    queryFn: async () => getActivities(),
    select: (data) => ({
      items: data.items.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
      })),
      totalCount: data.total,
    }),
  })

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {activitiesQuery.isLoading && (
          <div>
            <Skeleton className="h-100 w-full" />
            <Skeleton className="h-100 w-full" />
            <Skeleton className="h-100 w-full" />
          </div>
        )}
        {activitiesQuery.isError && <div>Error: {activitiesQuery.error.message}</div>}{' '}
        {/* TODO: Add proper Error handling*/}
        {activitiesQuery.isSuccess && (
          <div className="flex-1 overflow-auto">
            <ScrollTable entries={activitiesQuery.data.items} Component={ActivityTableEntry} />
          </div>
        )}
      </div>
    </div>
  )
}
