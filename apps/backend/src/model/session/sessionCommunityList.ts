import { CommunityVariant, RecommenderCategory } from '../../controllers/community.controller'
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

type IncommingCommunityListParams = {
  variant: string | null
  selectedCategories: string
} & IncommingListCursorParams

type NonNullCommunityListParams = {
  variant: CommunityVariant
  selectedCategories: RecommenderCategory[]
} & NonNullListCursorParams

const defaultCommunityListParams = (
  params: IncommingCommunityListParams
): NonNullCommunityListParams => {
  return {
    variant: Object.values(CommunityVariant).includes(params.variant as CommunityVariant)
      ? (params.variant as CommunityVariant)
      : CommunityVariant.RECOMMENDED,

    selectedCategories: params.selectedCategories
      .split(',')
      .filter((category) =>
        Object.values(RecommenderCategory).includes(category as RecommenderCategory)
      )
      .map((category) => category as RecommenderCategory),

    ...defaultListCursorParams(params),
  }
}

const getOnlyProfilePhoto = (media: PeakFile[]) => {
  const photo = media.find((m) => m.contentType.includes('image'))
  return photo != undefined ? { id: photo.id } : null
}

export type { SessionCommunityList, IncommingCommunityListParams, NonNullCommunityListParams }
export { selector, defaultCommunityListParams, getOnlyProfilePhoto }
