import { GradeDetail } from 'backend/src/model/grade'
import { RouteDetail } from './routeTypes'
import { UserLabeled } from './userTypes'

export interface ReviewCreate {
  stars: number
  text: string
}

export interface ReviewDetail {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string
  gradeRating: GradeDetail

  route: RouteDetail
  createdBy: UserLabeled
}

export interface ReviewList {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string

  /* Route omitted, already present as url param*/
  createdBy: UserLabeled
}

export interface ReviewUpdate {
  stars: number
  text: string
}
