import { UserList, userListSelector } from '../user'

type ReviewList = {
  createdAt: Date
  updatedAt: Date | null

  stars: number
  text: string

  /* Route omitted, already present as url param*/
  createdBy: UserList
}

const selector = {
  createdAt: true,
  updatedAt: true,

  stars: true,
  text: true,

  createdBy: {
    select: userListSelector,
  },
}

export type { ReviewList }
export { selector }
