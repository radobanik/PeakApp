import { getSessionById } from '@/services/sessionService'
import { useQuery } from '@tanstack/react-query'

export const useSession = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => getSessionById(id),
    select: (data) => ({
      id: data.id,
      createdAt: data.createdAt,
      name: data.name,
      note: data.note,
      assignedActivities: data.assignedActivities.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        perceivedDifficulty: activity.perceivedDifficulty,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
        notes: activity.notes,
      })),
      createdBy: data.createdBy,
    }),
  })
}
