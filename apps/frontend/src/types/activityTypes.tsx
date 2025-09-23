import { UseQueryResult } from '@tanstack/react-query'
import { ClimbingStructureType } from './routeTypes'
import { perceivedDifficulty } from './utilsTypes'
import { RouteList } from 'backend/src/model/route'
import { RefObject } from './refObject'

export interface Grade {
  id: string
  rating: number
  name: string
  color: string
}

export interface Route {
  id: string
  name: string
  description: string
  grade: Grade
  climbingStructureType: ClimbingStructureType
  longitude: number
  latitude: number
  image: RefObject | null
}

export interface Activity {
  id: string
  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: perceivedDifficulty
  climbingStructureType: ClimbingStructureType
  notes: string
  topped: boolean
  route: Route
}

export type ActivityCreate = {
  route: {
    id: string
  }
  reviewStars: number
  reviewText: string
  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: perceivedDifficulty
  notes: string
  topped: boolean
}

export type ActivityUpdate = {
  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: perceivedDifficulty
  notes: string
  topped: boolean
}

export type ActivityList = {
  id: string

  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: perceivedDifficulty
  notes: string
  topped: boolean

  route: RouteList
}

export type ActivityQueryType = UseQueryResult<
  {
    id: string
    climbedAt: Date
    routeName: string
    routeGrade: string
    routeType: ClimbingStructureType
    perceivedDifficulty: perceivedDifficulty
    numOfAttempts: number
    topped: boolean
    notes: string
    imageId: string | null
  },
  Error
>
