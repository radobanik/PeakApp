import { session } from 'passport'
import config from '../../core/config'
import { IncommingListParams, NonNullListParams, toNotNullListParams } from '../common/listParams'
import { RefObject } from '../common/refObject'
import { UserLabeled, userLabeledSelector } from '../user'
import {
  defaultListCursorParams,
  IncommingListCursorParams,
  NonNullListCursorParams,
} from '../common/listCursorResponse'

type CommentList = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  user: UserLabeled
  text: string
}

const selector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userLabeledSelector,
  },

  text: true,
}

type IncommingCommentListParams = { sessionId?: string } & IncommingListCursorParams
type NonNullCommentListParams = { sessionId: string | null } & NonNullListCursorParams

const defaultCommentListParams = (params: IncommingCommentListParams): NonNullCommentListParams => {
  const { ...listParams } = params
  return {
    sessionId: params.sessionId ?? null,
    ...defaultListCursorParams(listParams),
  }
}

export type { CommentList, IncommingCommentListParams, NonNullCommentListParams }
export { selector, defaultCommentListParams }
