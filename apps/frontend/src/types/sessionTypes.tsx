export interface User {
  id: string
  userName: string
  firstName: string
  lastName: string
}

export interface Activity {
  id: string
  createdAt: Date
  updatedAt: string | null
  createdById: string
  climbedAt: string
  reviewStars: number
  reviewText: string
  numOfAttempts: number
  perceivedDifficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD' | 'ULTRA_HARD' | string
  notes: string
  topped: boolean
  sessionid: string
  routeId: string
}

export interface Session {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: User
  note: string
  assignedActivities: Activity[]
}
