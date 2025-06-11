import { API } from '@/constants/api'
import { api } from '.'
import { ListCursorResponse } from 'backend/src/model/common/listCursorResponse'
import { CommentList } from 'backend/src/model/comment'

export const list = async (
  sessionId: string,
  cursorId: string | null,
  pageSize: number
): Promise<ListCursorResponse<CommentList>> => {
  const response = await api.get(API.COMMENT.LIST(), {
    params: {
      sessionId,
      cursorId,
      pageSize,
    },
  })

  return response.data
}

export const create = async (sessionId: string, text: string): Promise<CommentList> => {
  const response = await api.post(API.COMMENT.CREATE(), {
    session: { id: sessionId },
    text,
  })

  return response.data
}

export const update = async (commentId: string, text: string): Promise<CommentList> => {
  const response = await api.put(API.COMMENT.UPDATE(commentId), {
    text,
  })

  return response.data
}

export const remove = async (commentId: string): Promise<void> => {
  await api.delete(API.COMMENT.DELETE(commentId))
}
