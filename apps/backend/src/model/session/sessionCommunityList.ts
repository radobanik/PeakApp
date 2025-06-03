import { CommunityVariant } from '../../controllers/community.controller'
import {
  defaultListCursorParams,
  IncommingListCursorParams,
  NonNullListCursorParams,
} from '../common/listCursorResponse'
import { SessionList } from './sessionList'
import { sessionListSelector } from '.'
import { PeakFile } from '../peakFile'

type SessionCommunityList = SessionList & {
  likes: number
  hasLiked: boolean
  comments: number
}

const selector = sessionListSelector

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

const getOnlyProfilePhoto = (media: PeakFile[]) => {
  const photo = media.find((m) => m.contentType.includes('image'))
  return photo != undefined ? { id: photo.id } : null
}

export type { SessionCommunityList, IncommingCommunityListParams, NonNullCommunityListParams }
export { selector, defaultCommunityListParams, getOnlyProfilePhoto }
