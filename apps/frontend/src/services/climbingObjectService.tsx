import { API } from '@/constants/api'
import {
  ClimbingObjectDetail,
  ClimbingObjectList,
  FilterClimbingObjectListParams,
} from '@/types/climbingObjectTypes'
import { api } from '.'
import { ListResponse } from '@/types/utilsTypes'

export async function getFilteredClimbingObject(
  params: FilterClimbingObjectListParams | null
): Promise<ListResponse<ClimbingObjectList>> {
  const searchParams = new URLSearchParams()

  if (params !== null) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value))
      }
    })
  }

  const queryString = searchParams.toString()
  const response = await api.get(`${API.CLIMBING_OBJECT.LIST}?${queryString}`)

  if (response.status !== 200) {
    throw new Error('Error fetching climbing objects')
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

export async function getClimbingObjectDetail(
  pointId: string,
  filters: FilterClimbingObjectListParams | null = null
): Promise<ClimbingObjectDetail> {
  const searchParams = new URLSearchParams()

  if (filters !== null) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value))
      }
    })
  }

  const queryString = searchParams.toString()
  const url = queryString
    ? `${API.CLIMBING_OBJECT.LIST}${pointId}?${queryString}`
    : `${API.CLIMBING_OBJECT.LIST}${pointId}`

  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to load climbing object')
  }

  return data
}
