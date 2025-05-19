import { User } from '../user'

type Follows = {
  follower: User
  followee: User
  createdAt: Date
}
export type { Follows }
