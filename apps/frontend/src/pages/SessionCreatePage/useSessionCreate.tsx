import { getUnassignedActivities } from '@/services/activityService'
import { useQuery } from '@tanstack/react-query'

export const useUnassignedActivities = () => {
  return useQuery({
    queryKey: ['unassignedActivities'],
    queryFn: async () => getUnassignedActivities(),
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
    }),
  })
}
