import { UserList, userListSelector } from '../user'

type FollowsList = {
  follower: UserList
  followee: UserList
}

const selector = {
  follower: userListSelector,
  followee: userListSelector,
}

export type { FollowsList }
export { selector as followsListSelector }
