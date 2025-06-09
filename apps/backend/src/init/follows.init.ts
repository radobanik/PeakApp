import prisma from '../core/prisma/client'
import {
  TOP_LOGGER_USER_ID,
  USER_CHRIS_BROWN_ID,
  USER_EMILY_JOHNSON_ID,
  USER_JANE_DOE_ID,
  USER_JOHN_DOE_ID,
  USER_MICHAEL_SMITH_ID,
} from './user.init'

const followsClient = prisma.follows

const followings = [
  {
    follower: { id: USER_JANE_DOE_ID },
    followed: { id: USER_MICHAEL_SMITH_ID },
    createdAt: '2025-05-18T10:21:00Z',
  },
  {
    follower: { id: USER_MICHAEL_SMITH_ID },
    followed: { id: USER_EMILY_JOHNSON_ID },
    createdAt: '2025-05-18T10:22:00Z',
  },
  {
    follower: { id: USER_EMILY_JOHNSON_ID },
    followed: { id: USER_CHRIS_BROWN_ID },
    createdAt: '2025-05-18T10:23:00Z',
  },
  {
    follower: { id: USER_CHRIS_BROWN_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:24:00Z',
  },
  {
    follower: { id: TOP_LOGGER_USER_ID },
    followed: { id: USER_JOHN_DOE_ID },
    createdAt: '2025-05-18T10:25:00Z',
  },
  {
    follower: { id: USER_JOHN_DOE_ID },
    followed: { id: USER_EMILY_JOHNSON_ID },
    createdAt: '2025-05-18T10:26:00Z',
  },
  {
    follower: { id: USER_JANE_DOE_ID },
    followed: { id: USER_CHRIS_BROWN_ID },
    createdAt: '2025-05-18T10:27:00Z',
  },
  {
    follower: { id: USER_MICHAEL_SMITH_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:28:00Z',
  },
  {
    follower: { id: USER_EMILY_JOHNSON_ID },
    followed: { id: USER_JOHN_DOE_ID },
    createdAt: '2025-05-18T10:29:00Z',
  },
  {
    follower: { id: USER_CHRIS_BROWN_ID },
    followed: { id: USER_MICHAEL_SMITH_ID },
    createdAt: '2025-05-18T10:30:00Z',
  },
  {
    follower: { id: TOP_LOGGER_USER_ID },
    followed: { id: USER_EMILY_JOHNSON_ID },
    createdAt: '2025-05-18T10:31:00Z',
  },
  {
    follower: { id: USER_JOHN_DOE_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:32:00Z',
  },
  {
    follower: { id: USER_JANE_DOE_ID },
    followed: { id: USER_JOHN_DOE_ID },
    createdAt: '2025-05-18T10:33:00Z',
  },
  {
    follower: { id: USER_MICHAEL_SMITH_ID },
    followed: { id: USER_JOHN_DOE_ID },
    createdAt: '2025-05-18T10:34:00Z',
  },
  {
    follower: { id: USER_EMILY_JOHNSON_ID },
    followed: { id: USER_JANE_DOE_ID },
    createdAt: '2025-05-18T10:35:00Z',
  },
  {
    follower: { id: USER_CHRIS_BROWN_ID },
    followed: { id: USER_JANE_DOE_ID },
    createdAt: '2025-05-18T10:36:00Z',
  },
  {
    follower: { id: TOP_LOGGER_USER_ID },
    followed: { id: USER_JANE_DOE_ID },
    createdAt: '2025-05-18T10:37:00Z',
  },
  {
    follower: { id: USER_JANE_DOE_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:38:00Z',
  },
  {
    follower: { id: USER_MICHAEL_SMITH_ID },
    followed: { id: USER_CHRIS_BROWN_ID },
    createdAt: '2025-05-18T10:39:00Z',
  },
  {
    follower: { id: USER_EMILY_JOHNSON_ID },
    followed: { id: USER_MICHAEL_SMITH_ID },
    createdAt: '2025-05-18T10:40:00Z',
  },
  {
    follower: { id: USER_JOHN_DOE_ID },
    followed: { id: USER_CHRIS_BROWN_ID },
    createdAt: '2025-05-18T10:41:00Z',
  },
  {
    follower: { id: USER_JOHN_DOE_ID },
    followed: { id: USER_MICHAEL_SMITH_ID },
    createdAt: '2025-05-18T10:42:00Z',
  },
  {
    follower: { id: USER_CHRIS_BROWN_ID },
    followed: { id: USER_JOHN_DOE_ID },
    createdAt: '2025-05-18T10:43:00Z',
  },
  {
    follower: { id: TOP_LOGGER_USER_ID },
    followed: { id: USER_MICHAEL_SMITH_ID },
    createdAt: '2025-05-18T10:44:00Z',
  },
  {
    follower: { id: USER_JANE_DOE_ID },
    followed: { id: USER_EMILY_JOHNSON_ID },
    createdAt: '2025-05-18T10:45:00Z',
  },
  {
    follower: { id: USER_CHRIS_BROWN_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:46:00Z',
  },
  {
    follower: { id: USER_EMILY_JOHNSON_ID },
    followed: { id: TOP_LOGGER_USER_ID },
    createdAt: '2025-05-18T10:47:00Z',
  },
  {
    follower: { id: USER_JOHN_DOE_ID },
    followed: { id: USER_JANE_DOE_ID },
    createdAt: '2025-05-18T10:48:00Z',
  },
]

async function initFollows() {
  await followsClient.createMany({
    data: followings.map((follow) => ({
      followerId: follow.follower.id,
      followeeId: follow.followed.id,
      createdAt: new Date(follow.createdAt),
    })),
    skipDuplicates: true,
  })
}

export default initFollows
