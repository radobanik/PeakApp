import { RouteDetail, routeDetailSelector } from '../route'
import { UserDetail, userDetailSelector } from '../user'

type ReviewDetail = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string
  gradeRating: number

  route: RouteDetail
  createdBy: UserDetail
}

const selector = {
  createdAt: true,
  updatedAt: true,

  stars: true,
  text: true,
  gradeRating: true,

  route: {
    select: routeDetailSelector,
  },
  createdBy: {
    select: userDetailSelector,
  },
}

export type { ReviewDetail }
export { selector }
