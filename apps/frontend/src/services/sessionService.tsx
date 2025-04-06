import { API } from '@/constants/api'
import { api } from './index'

export async function getSessions() {
  try {
    const response = await api.get(API.SESSION.LIST)
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', error)
    throw error
  }
}
export async function getSessionById(id: string) {
  try {
    const response = await api.get(`${API.SESSION.LIST}${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching activity by ID:', error)
    throw error
  }
}
