import { getActivityById } from '@/services/activityService'
import { useQuery } from '@tanstack/react-query'

export const useActivity = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => getActivityById(id),
    select: (data) => ({
      id: data.id,
      climbedAt: data.climbedAt,
      routeName: data.route.name,
      routeGrade: data.route.grade.name,
      routeType: data.route.climbingStructureType,
      perceivedDifficulty: data.perceivedDifficulty,
      numOfAttempts: data.numOfAttempts,
      topped: data.topped,
      notes: data.notes,
    }),
  })
}
