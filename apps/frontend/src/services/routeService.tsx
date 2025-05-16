import { Route } from '@/types/activityTypes'
import { api } from './index'
import { API } from '@/constants/api'
import { RouteDetailListResponse } from '@/types/routeTypes'

export async function getRoutes(
  page: number = 1,
  pageSize: number = 10
): Promise<RouteDetailListResponse> {
  try {
    const response = await api.get(API.ROUTE.LIST, {
      params: {
        page,
        pageSize,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getRouteById(id: string): Promise<Route> {
  const response = await api.get(`${API.ROUTE.BY_ID}${id}`)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}
