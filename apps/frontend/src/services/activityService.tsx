import { API } from '@/constants/api'
import { api } from './index'
import { Activity } from '@/types/activityTypes'
import { PaginatedResponse } from '@/types'

export async function getActivities(): Promise<PaginatedResponse<Activity>> {
  const response = await api.get(API.ACTIVITY.LIST)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function getActivityById(id: string): Promise<Activity> {
  const response = await api.get(`${API.ACTIVITY.LIST}${id}`)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function deleteActivity(id: string): Promise<void> {
  try {
    const response = await api.delete(`${API.ACTIVITY.LIST}${id}`)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to delete Activity.'
    throw new Error(message)
  }
}
