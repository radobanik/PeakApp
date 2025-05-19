import { UserList, userListSelector } from '../user'

type FollowsDetail = {
  follower: UserList
  followee: UserList
  createdAt: Date
}

const selector = {
  follower: { select: userListSelector },
  followee: { select: userListSelector },
  createdAt: true,
}

export type { FollowsDetail }
export { selector as followsDetailSelector }
