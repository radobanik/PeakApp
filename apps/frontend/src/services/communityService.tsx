import { api } from '.'
import { API } from '@/constants/api'
import { ListCursorResponse } from '@/types'
import { CommunityVariant } from '@/types/utilsTypes'
import { CommunitySessionDetail, CommunitySessionList } from 'backend/src/model/community'

export const getSession = async (sessionId: string): Promise<CommunitySessionDetail> => {
  const response = await api.get(API.COMMUNITY.BY_ID(sessionId))
  return response.data
}

export const list = async (
  cursorId: string | null,
  pageSize: number,
  variant: CommunityVariant
): Promise<ListCursorResponse<CommunitySessionList>> => {
  const response = await api.get(API.COMMUNITY.LIST(), {
    params: {
      cursorId: cursorId,
      pageSize: pageSize,
      variant: variant,
    },
  })
  return response.data
}

export const like = async (sessionId: string): Promise<void> => {
  await api.post(API.LIKE.LIKE(sessionId))
}

export const unlike = async (sessionId: string): Promise<void> => {
  await api.delete(API.LIKE.UNLIKE(sessionId))
}

export const listComments = async (
  sessionId: string,
  cursorId: string | null,
  pageSize: number
) => {
  const response = await api.get(API.COMMENT.LIST(), {
    params: {
      sessionId: sessionId,
      cursorId: cursorId,
      pageSize: pageSize,
    },
  })
  return response.data
}
