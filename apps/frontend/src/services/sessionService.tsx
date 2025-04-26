import { API } from '@/constants/api'
import { api } from './index'
import { Session } from '@/types/sessionTypes'
import { PaginatedResponse } from '@/types'

interface getSessionsParams {
  pageIndex: number
  pageSize: number
}

export async function getSessions({
  pageIndex,
  pageSize,
}: getSessionsParams): Promise<PaginatedResponse<Session>> {
  const response = await api.get(API.SESSION.LIST + `?page=${pageIndex + 1}&pageSize=${pageSize}`)
  return response.data
}
export async function getSessionById(id: string) {
  const response = await api.get(`${API.SESSION.LIST}${id}`)
  return response.data
}
