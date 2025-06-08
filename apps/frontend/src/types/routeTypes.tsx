import { UserLabeled } from './authTypes'
import { GradeDetail } from './gradeTypes'
import { ClimbingObjectNoRoutes } from './climbingObjectTypes'
import { RefObject } from './refObject'
import { Pagination } from './paginationTypes'
import { ApprovalState } from './approvalTypes'

export interface OverlayPoint {
  relX: number
  relY: number
}

export enum ClimbingStructureType {
  TRAVERSE = 'TRAVERSE',
  OVERHANG = 'OVERHANG',
  SLAB = 'SLAB',
  WALL = 'WALL',
}

export interface RouteDetail {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled
  updatedBy: UserLabeled | null

  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType
  averageStar: number
  averageDifficulty: number

  longitude: number
  latitude: number

  image: RefObject | null
  additionalImages: RefObject[]
  overlay: OverlayPoint[]

  climbingObject: ClimbingObjectNoRoutes
  approvalState: ApprovalState
}

export type RouteSummary = {
  id: string
  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType
  averageStar: number
  averageDifficulty: number
  longitude: number
  latitude: number
  image: RefObject | null
  approvalState: ApprovalState
}

export type RouteCreate = {
  name: string
  description: string
  grade: RefObject
  climbingStructureType: ClimbingStructureType

  longitude: number
  latitude: number

  image: RefObject | null
  additionalImages: RefObject[]
  overlay: OverlayPoint[]

  climbingObject: RefObject
}

export type RouteUpdate = {
  name: string
  description: string
  grade: RefObject
  climbingStructureType: ClimbingStructureType

  longitude: number
  latitude: number

  image: RefObject | null
  additionalImages: RefObject[]
  overlay: OverlayPoint[]
}

export type RouteList = {
  id: string
  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType
  starRating: number
  longitude: number
  latitude: number
  approvalState: ApprovalState
}

export interface RouteDetailListResponse extends Pagination {
  items: RouteDetail[]
}
