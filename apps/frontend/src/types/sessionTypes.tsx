import { UseQueryResult } from '@tanstack/react-query'
import { Activity } from './activityTypes'
import { ClimbingStructureType } from './routeTypes'
import { perceivedDifficulty } from './utilsTypes'
import { RefObject } from 'backend/src/model/common/refObject'

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
  photos: RefObject[]
  assignedActivities: Activity[]
}

export interface SessionUpdate {
  name: string
  note: string
  photos: RefObject[]
}

export interface SessionCreate {
  name: string
  note: string
  photos: RefObject[]
  assignedActivities: {
    id: string
  }[]
}

export type SessionQueryType = UseQueryResult<
  {
    id: string
    createdAt: Date
    name: string
    note: string
    assignedActivities: {
      id: string
      climbedAt: Date
      routeName: string
      routeGrade: string
      routeType: ClimbingStructureType
      perceivedDifficulty: perceivedDifficulty
      numOfAttempts: number
      topped: boolean
      notes: string
    }[]
    createdBy: User
    photos: RefObject[]
  },
  Error
>
