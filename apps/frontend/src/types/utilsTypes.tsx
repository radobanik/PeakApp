export enum perceivedDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  ULTRA_HARD = 'ULTRA_HARD',
}

export enum CommunityVariant {
  RECENT = 'recent',
  FRIENDS = 'friends',
}

export interface ListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  page: number
  pageSize: number
  total: number
  items: T[]
}
