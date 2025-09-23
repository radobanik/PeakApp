import { GradeDetail, gradeDetailSelector } from '../grade'
import { RouteDetail, routeDetailSelector } from '../route'
import { UserDetail, userDetailSelector } from '../user'

type ReviewDetail = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string
  gradeRating: GradeDetail

  route: RouteDetail
  createdBy: UserDetail
}

const selector = {
  createdAt: true,
  updatedAt: true,

  stars: true,
  text: true,
  gradeRating: {
    select: gradeDetailSelector,
  },

  route: {
    select: routeDetailSelector,
  },
  createdBy: {
    select: userDetailSelector,
  },
}

export type { ReviewDetail }
export { selector }
