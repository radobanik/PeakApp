import { Activity } from './activityTypes'

export interface User {
  id: string
  userName: string
  firstName: string
  lastName: string
}

export interface Session {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: User
  name: string
  note: string
  assignedActivities: Activity[]
}

export interface SessionUpdate {
  name: string
  note: string
  photos: any[]
}
