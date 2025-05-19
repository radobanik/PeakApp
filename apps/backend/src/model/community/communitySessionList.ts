import { CommunityVariant } from '../../controllers/community.controller'
import {
  defaultListCursorParams,
  IncommingListCursorParams,
  NonNullListCursorParams,
} from '../common/listCursorResponse'
import { SessionList, sessionListSelector } from '../session'

type CommunitySessionList = {
  id: string
  session: SessionList
  likes: number
  hasLiked: boolean
  comments: number
}

const selector = {
  session: {
    select: sessionListSelector,
  },
}

type IncommingCommunityListParams = { variant: string | null } & IncommingListCursorParams
type NonNullCommunityListParams = { varaint: CommunityVariant } & NonNullListCursorParams

const defaultCommunityListParams = (
  params: IncommingCommunityListParams
): NonNullCommunityListParams => {
  return {
    varaint: Object.values(CommunityVariant).includes(params.variant as CommunityVariant)
      ? (params.variant as CommunityVariant)
      : CommunityVariant.RECENT,
    ...defaultListCursorParams(params),
  }
}

export type { CommunitySessionList, IncommingCommunityListParams, NonNullCommunityListParams }
export { defaultCommunityListParams, selector }
