import { ApprovalState } from './approvalTypes'
import { ClimbingStructureType, RouteSummary } from './routeTypes'
import { UserLabeled } from './userTypes'

export type ClimbingObjectList = {
  id: string
  name: string
  longitude: number
  latitude: number
  routeCount: number
  approvalState: ApprovalState
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

  approvalState: ApprovalState
}

export interface ClimbingObjectNoRoutes {
  id: string
  name: string
  longitude: number
  latitude: number
  approvalState: ApprovalState
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
  climbingStructureTypes: ClimbingStructureType[]
  includeUnofficalClimbingObjects: boolean
  includeUnofficialRoutes: boolean
  excludeWithoutMatchingRoutes: boolean
}
