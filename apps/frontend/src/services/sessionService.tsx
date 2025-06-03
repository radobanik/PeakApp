import { API } from '@/constants/api'
import { api } from './index'
import { Session, SessionList, SessionUpdate } from '@/types/sessionTypes'
import { PaginatedResponse } from '@/types'

export async function getSessions(): Promise<PaginatedResponse<SessionList>> {
  const response = await api.get(API.SESSION.LIST)
  return response.data
}
export async function getSessionById(id: string): Promise<Session> {
  const response = await api.get(`${API.SESSION.LIST}${id}`)
  return response.data
}

export async function updateSession(id: string, session: SessionUpdate): Promise<Session> {
  const response = await api.put(`${API.SESSION.UPDATE}${id}`, session)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export async function createSession(session: SessionUpdate): Promise<Session> {
  const response = await api.post(API.SESSION.CREATE, session)
  if (response.status != 201) {
    const error = new Error('Error')
    throw error
  }
  console.log('response: ', response.data)
  return response.data
}

export async function deleteSession(id: string): Promise<void> {
  try {
    const response = await api.delete(`${API.SESSION.LIST}${id}`)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to delete Session.'
    throw new Error(message)
  }
}
