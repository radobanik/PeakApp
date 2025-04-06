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
