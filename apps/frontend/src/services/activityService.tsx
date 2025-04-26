import { API } from '@/constants/api'
import { api } from './index'
import { Activity } from '@/types/activityTypes'
import { PaginatedResponse } from '@/types'

interface getActivitiesParams {
  pageIndex: number
  pageSize: number
}

export async function getActivities({
  pageIndex,
  pageSize,
}: getActivitiesParams): Promise<PaginatedResponse<Activity>> {
  const response = await api.get(API.ACTIVITY.LIST + `?page=${pageIndex + 1}&pageSize=${pageSize}`)
  console.log('response', response)
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
