import { getActivities } from '@/services/activityService'
import { useQuery } from '@tanstack/react-query'

import ActivityTableEntry from '@/components/ActivityTableEntry'
import ScrollTable from '@/components/ScrollTable'
import { Skeleton } from '@/components/ui/skeleton'
import { ROUTE } from '@/constants/routes'
import BackButon from '@/components/BackButton'
import plusIcon from '@/assets/Plus.svg'

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
    <main className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-between p-4 gap-4">
        <div className="flex flex-row items-center gap-4">
          <BackButon backRoute={ROUTE.DIARY} />
          <h1 className="text-2xl">My Activities</h1>

        </div>
          <img src={plusIcon} alt="Add Activity" className="w-6 h-6 cursor-pointer" />
      </div>
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
    </main>
  )
}
