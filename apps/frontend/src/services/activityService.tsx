import { API } from '@/constants/api'
import { api } from './index'
import { Activity, ActivityCreate, ActivityUpdate } from '@/types/activityTypes'
import { PaginatedResponse } from '@/types'

export async function getUnassignedActivities(): Promise<PaginatedResponse<Activity>> {
  const response = await api.get(API.ACTIVITY.LIST_UNASSIGNED)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function getSessionActivities(id: string): Promise<Activity[]> {
  const response = await api.get(API.SESSION.LIST_ACTIVITIES(id))
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}
export async function getActivityById(id: string): Promise<Activity> {
  const response = await api.get(`${API.ACTIVITY.BY_ID}${id}`)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function createActivity(activity: ActivityCreate): Promise<Activity> {
  const response = await api.post(API.ACTIVITY.CREATE, activity)
  if (response.status != 201) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function updateActivity(id: string, activity: ActivityUpdate): Promise<Activity> {
  const response = await api.put(`${API.ACTIVITY.UPDATE}${id}`, activity)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function deleteActivity(id: string): Promise<void> {
  try {
    const response = await api.delete(`${API.ACTIVITY.DELETE}${id}`)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to delete Activity.'
    throw new Error(message)
  }
}

export async function assignActivitiesToSession(
  sessionId: string,
  activityIds: string[]
): Promise<void> {
  const body = { activityIds, sessionId }
  const response = await api.post(API.ACTIVITY.ASSIGN, body)
  if (response.status != 204) {
    const error = new Error('Error')
    throw error
  }
}
export async function unassignActivitiesFromSession(activityIds: string[]): Promise<void> {
  const body = { activityIds }
  const response = await api.post(API.ACTIVITY.UNASSIGN, body)
  if (response.status != 204) {
    const error = new Error('Error')
    throw error
  }
}
