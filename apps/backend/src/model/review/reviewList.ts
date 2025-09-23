import { GradeList, gradeListSelector } from '../grade'
import { UserList, userListSelector } from '../user'

type ReviewList = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string
  gradeRating: GradeList

  /* Route omitted, already present as url param*/
  createdBy: UserList
}

const selector = {
  createdAt: true,
  updatedAt: true,

  stars: true,
  text: true,
  gradeRating: {
    select: gradeListSelector,
  },

  createdBy: {
    select: userListSelector,
  },
}

export type { ReviewList }
export { selector }
