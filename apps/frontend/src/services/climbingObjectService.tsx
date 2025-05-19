import { API } from '@/constants/api'
import { ClimbingObjectDetail, ClimbingObjectList } from '@/types/climbingObjectTypes'
import { api } from '.'
import { PaginatedResponse } from '@/types'

export async function getClimbingObjects(): Promise<PaginatedResponse<ClimbingObjectList>> {
  const response = await api.get(API.CLIMBING_OBJECT.LIST)
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}

export async function getClimbingObjectById(id: string): Promise<ClimbingObjectDetail> {
  const response = await api.get(`${API.CLIMBING_OBJECT.BY_ID}${id}`)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}
