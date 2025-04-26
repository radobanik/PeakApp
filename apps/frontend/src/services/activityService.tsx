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
  try {
    const response = await fetch(`${API.ACTIVITY.LIST}${id}`)
    return response.json()
  } catch (error) {
    console.error('Error fetching activity by ID:', error)
    throw error
  }
}
