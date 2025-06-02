import { RefObject } from '../common/refObject'
import { peakFileSelector } from '../peakFile'
import { CommunityVariant } from '../../controllers/community.controller'
import {
  defaultListCursorParams,
  IncommingListCursorParams,
  NonNullListCursorParams,
} from '../common/listCursorResponse'
import { SessionList } from './sessionList'
import { sessionListSelector } from '.'

type SessionCommunityList = SessionList & {
  photo: RefObject | null

  likes: number
  hasLiked: boolean
  comments: number
}

const selector = {
  ...sessionListSelector,
  photos: {
    select: {
      peakFile: {
        select: peakFileSelector,
      },
    },
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

export type { SessionCommunityList, IncommingCommunityListParams, NonNullCommunityListParams }
export { selector, defaultCommunityListParams }
