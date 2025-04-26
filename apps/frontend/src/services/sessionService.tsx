import { API } from '@/constants/api'
import { api } from './index'
import { Session } from '@/types/sessionTypes'
import { PaginatedResponse } from '@/types'

export async function getSessions(): Promise<PaginatedResponse<Session>> {
  const response = await api.get(API.SESSION.LIST)
  return response.data
}
export async function getSessionById(id: string): Promise<Session> {
  const response = await api.get(`${API.SESSION.LIST}${id}`)
  return response.data
}
