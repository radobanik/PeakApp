import { API } from '@/constants/api'
import { api } from './index'
import { ClimbingObjectDetail, ClimbingObjectNoRoutes } from '@/types/climbingObjectTypes'
import { RouteDetail, RouteSummary } from '@/types/routeTypes'
import { PaginatedResponse } from '@/types'

export async function getNewObjects(): Promise<ClimbingObjectNoRoutes[]> {
  const response = await api.get(API.CLIMBING_OBJECT.LIST, {
    params: {
      approvalStates: 'PENDING',
    },
  })
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}

export async function getNewObjectById(id: string): Promise<ClimbingObjectDetail> {
  const response = await api.get(`${API.CLIMBING_OBJECT.BY_ID}${id}`)
  if (response.status != 200) {
    const error = new Error(response.data.error || 'Error')
    throw error
  }
  return response.data
}

export async function getNewRoutes(page: number): Promise<PaginatedResponse<RouteSummary>> {
  const response = await api.get(API.ROUTE.LIST, {
    params: {
      page,
      pageSize: 15,
      approvalStates: 'PENDING',
    },
  })
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}

export async function getNewRouteById(id: string): Promise<RouteDetail> {
  const response = await api.get(`${API.ROUTE.BY_ID}${id}`)
  if (response.status != 200) {
    const error = new Error(response.data.error || 'Error')
    throw error
  }
  return response.data
}
