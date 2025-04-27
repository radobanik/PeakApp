import { API } from '@/constants/api'
import { api } from './index'
import { ClimbingObjectList, FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'

export async function getFilteredClimbingObject(
  params: FilterClimbingObjectListParams
): Promise<ClimbingObjectList[]> {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  const response = await api.get(`${API.CLIMBING_OBJECT}?${queryString}`)

  if (response.status !== 200) {
    throw new Error('Error fetching climbing objects')
  }

  return response.data
}
