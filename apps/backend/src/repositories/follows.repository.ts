import { FollowsDetail, followsDetailSelector } from '../model/follows'
import { toConnector } from './utils/connector'
import { RefObject } from '../model/common/refObject'
import { followerListSelector } from '../model/follows/followerList'
import { followeeListSelector } from '../model/follows/followeeList'
import { UserList } from '../model/user'
import prisma from '../core/prisma/client'

const followingClient = prisma.follows

const listFollowers = async (userId: string): Promise<UserList[]> => {
  const followers = await followingClient.findMany({
    where: {
      followeeId: userId,
    },
    select: followerListSelector,
  })

  return followers.map((follower) => follower.follower)
}

const listFollowing = async (userId: string): Promise<UserList[]> => {
  const followees = await followingClient.findMany({
    where: {
      followerId: userId,
    },
    select: followeeListSelector,
  })

  return followees.map((followee) => followee.followee)
}

const listFriends = async (userId: string) => {
  const [followers, following] = await Promise.all([listFollowers(userId), listFollowing(userId)])

  const followerIds = new Set<string>(followers.map((user) => user.id))
  return following.filter((user) => followerIds.has(user.id))
}

const createFollow = async (follower: RefObject, followee: RefObject): Promise<FollowsDetail> => {
  return await followingClient.create({
    data: {
      follower: toConnector(follower),
      followee: toConnector(followee),
    },
    select: followsDetailSelector,
  })
}

const deleteFollow = async (followerId: string, followeeId: string) => {
  return await followingClient.deleteMany({
    where: {
      followerId,
      followeeId,
    },
  })
}

const exists = async (followerId: string, followeeId: string): Promise<boolean> => {
  const follow = await followingClient.findFirst({
    where: {
      followerId,
      followeeId,
    },
  })

  return !!follow
}

export default { listFollowers, listFollowing, createFollow, deleteFollow, exists, listFriends }
