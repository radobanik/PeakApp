import { PeakFile } from './fileTypes'
import { UserLabeled } from './authTypes'
import { GradeDetail } from './gradeTypes'
import { ClimbingObjectNoRoutes } from './climbingObjectTypes'

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

  longitude: number
  latitude: number

  image: PeakFile | null
  additionalImages: PeakFile[]
  overlay: OverlayPoint[]

  climbingObject: ClimbingObjectNoRoutes
}
export type RouteSummary = {
  id: string
  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType
  longitude: number
  latitude: number
}
