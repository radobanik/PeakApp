import { Route } from '../route'
import { User } from '../user'

type Review = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string

  route: Route
  createdBy: User
}

export type { Review }
