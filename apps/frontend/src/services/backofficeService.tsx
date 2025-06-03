import { API } from '@/constants/api'
import { api } from './index'
import { ClimbingObjectDetail, ClimbingObjectNoRoutes } from '@/types/climbingObjectTypes'
import { RouteDetail, RouteSummary } from '@/types/routeTypes'
import { ListResponse } from 'backend/src/model/common/listResponse'
import { ApprovalState } from '@/types/approvalTypes'

export async function getNewObjects(page: number): Promise<ListResponse<ClimbingObjectNoRoutes>> {
  const response = await api.get(API.CLIMBING_OBJECT.LIST, {
    params: {
      approvalStates: ApprovalState.PENDING,
      page: page,
      pageSize: 15,
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

export async function changeClimbingObjectApprovalState(
  id: string,
  approvalState: ApprovalState
): Promise<ClimbingObjectDetail> {
  const response = await api.patch(API.CLIMBING_OBJECT.APPROVAL(id), null, {
    params: {
      approvalState,
    },
  })
  if (response.status != 200) {
    const error = new Error(response.data.error || 'Error')
    throw error
  }
  return response.data
}

export async function getNewRoutes(page: number): Promise<ListResponse<RouteSummary>> {
  const response = await api.get(API.ROUTE.LIST, {
    params: {
      page,
      pageSize: 15,
      approvalStates: ApprovalState.PENDING,
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

export async function changeRouteApprovalState(
  id: string,
  approvalState: ApprovalState
): Promise<ClimbingObjectDetail> {
  const response = await api.patch(API.ROUTE.APPROVAL(id), null, {
    params: {
      approvalState,
    },
  })
  if (response.status != 200) {
    const error = new Error(response.data.error || 'Error')
    throw error
  }
  return response.data
}
