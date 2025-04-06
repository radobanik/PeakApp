import { perceivedDifficulty } from "./utilsTypes"

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
  perceivedDifficulty: perceivedDifficulty
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
