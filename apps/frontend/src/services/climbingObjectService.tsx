import { API } from '@/constants/api'
import {
  ClimbingObjectDetail,
  ClimbingObjectList,
  FilterClimbingObjectListParams,
} from '@/types/climbingObjectTypes'
import { api } from '.'
import { ListResponse } from '@/types/utilsTypes'
import { ApprovalState } from '@/types/approvalTypes'

export async function getFilteredClimbingObject(
  params: FilterClimbingObjectListParams | null
): Promise<ListResponse<ClimbingObjectList>> {
  const searchParams: Record<string, string> = {}
  if (params !== null) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams[key] = String(value)
      }
    })
  }

  const response = await api.get(`${API.CLIMBING_OBJECT.LIST}`, {
    params: {
      ...searchParams,
      approvalStates: `${ApprovalState.APPROVED},${params?.includeUnofficalClimbingObjects ? ApprovalState.PENDING : ''}`,
      routeApprovalStates: `${ApprovalState.APPROVED},${params?.includeUnofficialRoutes ? ApprovalState.PENDING : ''}`,
      excludeWithoutMatchingRoutes: params?.excludeWithoutMatchingRoutes ?? false,
    },
  })
  if (response.status !== 200) {
    throw new Error('Error fetching climbing objects')
  }

  return response.data
}

export async function getAllClimbingObjects(
  page: number,
  pageSize: number
): Promise<ListResponse<ClimbingObjectList>> {
  const response = await api.get(`${API.CLIMBING_OBJECT.LIST_BACKOFFICE}`, {
    params: {
      page: page,
      pageSize: pageSize,
    },
  })
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
  const searchParams: Record<string, string> = {}
  if (filters !== null) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams[key] = String(value)
      }
    })
  }

  const response = await api.get(`${API.CLIMBING_OBJECT.LIST}${pointId}`, {
    params: {
      ...searchParams,
      routeApprovalStates: `${ApprovalState.APPROVED},${filters?.includeUnofficialRoutes ? ApprovalState.PENDING : ''}`,
    },
  })

  if (response.status != 200) {
    throw new Error(response.data.message || 'Failed to load climbing object')
  }

  return response.data
}
