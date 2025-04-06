import { ClimbingStructureType } from './routeTypes'
import { perceivedDifficulty } from './utilsTypes'

export interface Pagination {
  page: number
  pageSize: number
  total: number
}

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
}

export interface Activity {
  id: string
  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: perceivedDifficulty
  notes: string
  topped: boolean
  route: Route
}

export interface ActivityResponse {
  pagination: Pagination
  items: Activity[]
}
