import { API } from '@/constants/api'
import { ClimbingObjectList } from '@/types/climbingObjectTypes'
import { api } from '.'
import { PaginatedResponse } from '@/types'

export async function getClimbingObjects(): Promise<PaginatedResponse<ClimbingObjectList>> {
  const response = await api.get(API.CLIMBING_OBJECT.LIST)
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}
