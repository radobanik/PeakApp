import { RouteSummary } from './routeTypes'
import { UserLabeled } from './userTypes'

export type ClimbingObjectList = {
  id: string
  name: string
  longitude: number
  latitude: number
  routeCount: number
}

export type ClimbingObjectDetail = {
  id: string

  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled
  updatedBy: UserLabeled | null

  name: string
  longitude: number
  latitude: number

  routes: RouteSummary[]
}

export interface ClimbingObjectNoRoutes {
  id: string
  name: string
  longitude: number
  latitude: number
}

export type FilterClimbingObjectListParams = {
  name: string | null
  routeName: string | null
  ratingFrom: number | null
  ratingTo: number | null
  latitudeFrom: number | null
  latitudeTo: number | null
  longitudeFrom: number | null
  longitudeTo: number | null
  climbingStructureTypes: string | null
}
