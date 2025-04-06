import { API } from '@/constants/api'
import { api } from './index'

export async function getActivities() {
  try {
    const response = await api.get(API.ACTIVITY.LIST)
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', error)
    throw error
  }
}

export async function getActivityById(id: string) {
  try {
    const response = await api.get(`${API.ACTIVITY.LIST}${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching activity by ID:', error)
    throw error
  }
}
