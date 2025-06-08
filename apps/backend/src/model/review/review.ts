import { Grade } from '../grade'
import { Route } from '../route'
import { User } from '../user'

type Review = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string
  gradeRating: Grade

  route: Route
  createdBy: User
}

export type { Review }
