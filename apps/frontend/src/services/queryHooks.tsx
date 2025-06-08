import { useQuery } from '@tanstack/react-query'
import { getRouteById } from '@/services/routeService'
import {
  getActivityById,
  getSessionActivities,
  getUnassignedActivities,
} from '@/services/activityService'
import { getSessionById, getSessions } from './sessionService'
import { getReviews, getUserReview } from './reviewService'
import { getFile } from './fileService'
import { getClimbingObjectById } from './climbingObjectService'

export const useRouteQuery = (id: string) => {
  return useQuery({
    queryKey: ['route', id],
    queryFn: async () => getRouteById(id),
  })
}

export const useClimbingObjectQuery = (id: string) => {
  return useQuery({
    queryKey: ['climbingObject', id],
    queryFn: async () => getClimbingObjectById(id),
  })
}

export const useActivityQuery = (id: string) => {
  return useQuery({
    queryKey: ['activity', id],
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
      imageId: data.route.image?.id || null,
    }),
  })
}

export const useAssignedActivitiesQuery = (sessionId: string) => {
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

export const useUnassignedActivitiesQuery = () => {
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
        imageId: activity.route.image?.id || null,
      })),
      totalCount: data.total,
    }),
  })
}

export const useSessionQuery = (id: string) => {
  return useQuery({
    queryKey: ['session', id],
    queryFn: async () => getSessionById(id),
    select: (data) => ({
      id: data.id,
      createdAt: data.createdAt,
      name: data.name,
      note: data.note,
      photos: data.photos,
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

export const useSessionsQuery = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => getSessions(),
    select: (data) => ({
      items: data.items.map((session) => ({
        id: session.id,
        createdAt: session.createdAt,
        name: session.name,
        note: session.note,
        numberOfActivities: session.assignedActivities.length,
        photo: session.photo,
      })),
      totalCount: data.total,
    }),
  })
}

export const useReviewsQuery = (routeId: string) => {
  return useQuery({
    queryKey: ['reviews', routeId],
    queryFn: async () => getReviews(routeId),
    select: (data) => ({
      items: data.map((review) => ({
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        stars: review.stars,
        text: review.text,
        route: review.route,
        createdBy: review.createdBy,
      })),
    }),
  })
}

export const useUserReviewQuery = (routeId: string) => {
  return useQuery({
    queryKey: ['userReview', routeId],
    queryFn: async () => getUserReview(routeId),
    select: (data) => ({
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      stars: data.stars,
      text: data.text,
      route: data.route,
      createdBy: data.createdBy,
    }),
  })
}

// TODO: Pfps must  be redone  so that user ALWAYS has a pfpId
export const useFileQuery = (fileId: string) => {
  return useQuery({
    queryKey: ['file', fileId],
    queryFn: async () => getFile(fileId),
    select: (data) => ({
      id: data.id,
      createdAt: data.createdAt,
      name: data.name,
      contentType: data.contentType,
      url: data.url,
      createdBy: data.createdBy,
    }),
  })
}
