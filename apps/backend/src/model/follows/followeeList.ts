import { UserList, userListSelector } from '../user'

type FolloweeList = {
  followee: UserList
}

const selector = {
  followee: { select: userListSelector },
}

export type { FolloweeList }
export { selector as followeeListSelector }
