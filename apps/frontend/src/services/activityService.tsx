import { API } from '@/constants/api'
import { api } from './index'
import { Activity } from '@/types/activityTypes'
import { PaginatedResponse } from '@/types'

export async function getActivities(): Promise<PaginatedResponse<Activity>> {
  const response = await api.get(API.ACTIVITY.LIST)
  console.log('response', response)
  if (response.status == 401) {
    const error = new Error('Unauthorized user')
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
