import { getSessionActivities, getUnassignedActivities } from '@/services/activityService'
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

export const useAssignedActivities = (sessionId: string) => {
  return useQuery({
    queryKey: ['assignedActivities', sessionId],
    queryFn: async () => getSessionActivities(sessionId),
    enabled: !!sessionId,
    select: (data) => ({
      items: data.map((activity) => ({
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
