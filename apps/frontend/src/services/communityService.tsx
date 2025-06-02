import { api } from '.'
import { API } from '@/constants/api'
import { ListCursorResponse } from '@/types'
import { SessionCommunityDetail, SessionCommunityList } from '@/types/sessionTypes'
import { CommunityVariant } from '@/types/utilsTypes'

export const getSession = async (sessionId: string): Promise<SessionCommunityDetail> => {
  const response = await api.get(API.COMMUNITY.BY_ID(sessionId))
  return response.data
}

export const list = async (
  cursorId: string | null,
  pageSize: number,
  variant: CommunityVariant,
  selectedCategories: string[]
): Promise<ListCursorResponse<SessionCommunityList>> => {
  const response = await api.get(API.COMMUNITY.LIST(), {
    params: {
      cursorId: cursorId,
      pageSize: pageSize,
      variant: variant,
      selectedCategories: selectedCategories,
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
