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

export type {
  AchievementCreate,
  AchievementUpdate,
  AchievementDetail,
  AchievementDetailWithIconMetadata,
}

export { AchievementType }
