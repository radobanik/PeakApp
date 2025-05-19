import { UserList, userListSelector } from '../user'

type FollowerList = {
  follower: UserList
}

const selector = {
  follower: { select: userListSelector },
}

export type { FollowerList }
export { selector as followerListSelector }
