import { PeakFileDetail } from 'backend/src/model/peakFile'
import { RefObject } from './refObject'

type AchievementCreate = {
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

type AchievementUpdate = {
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

type AchievementDetail = {
  id: string
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

type AchievementDetailWithIconMetadata = {
  id: string
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: PeakFileDetail | null
}

enum AchievementType {
  DAYS_REGISTERED = 'DAYS_REGISTERED',
  COMMENTS_COUNT = 'COMMENTS_COUNT',
  SESSIONS_COUNT = 'SESSIONS_COUNT',
  MAX_ACTIVITY_PER_SESSION = 'MAX_ACTIVITY_PER_SESSION',
  MAX_LIKE_ON_SESSION = 'MAX_LIKE_ON_SESSION',
  ROUTE_TOPPED_COUNT = 'ROUTE_TOPPED_COUNT',
  ROUTE_REVIEW_COUNT = 'ROUTE_REVIEW_COUNT',
}

const achievementTypeValues = (achievementType: AchievementType): string => {
  switch (achievementType) {
    case AchievementType.DAYS_REGISTERED:
      return 'Days Registered'
    case AchievementType.COMMENTS_COUNT:
      return 'Comments Count'
    case AchievementType.SESSIONS_COUNT:
      return 'Sessions Count'
    case AchievementType.MAX_ACTIVITY_PER_SESSION:
      return 'Max Activity Per Session'
    case AchievementType.MAX_LIKE_ON_SESSION:
      return 'Max Like On Session'
    case AchievementType.ROUTE_TOPPED_COUNT:
      return 'Route Topped Count'
    case AchievementType.ROUTE_REVIEW_COUNT:
      return 'Route Review Count'
    default:
      return 'Unknown Type'
  }
}

export type {
  AchievementCreate,
  AchievementUpdate,
  AchievementDetail,
  AchievementDetailWithIconMetadata,
}

export { AchievementType, achievementTypeValues }
