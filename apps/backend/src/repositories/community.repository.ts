import {
  getOnlyProfilePhoto,
  SessionCommunityDetail,
  SessionCommunityList,
  sessionCommunityListSelector,
  sessionDetailSelector,
} from '../model/session'
import { RefObject } from '../model/common/refObject'
import { activityDetailSelector, activityListSelector } from '../model/activity'
import { routeListSelector } from '../model/route'
import prisma from '../core/prisma/client'
import { UserList, UserLabeled, userListSelector } from '../model/user'

const sessionClient = prisma.session
const likeClient = prisma.like

type SessionCommunityExtUserList = SessionCommunityList & {
  createdBy: UserLabeled & {
    city: {
      country: {
        name: string
      }
    } | null
  }
}

const listForRecommended = async (userRef: RefObject): Promise<SessionCommunityExtUserList[]> => {
  const sessions = await sessionClient.findMany({
    select: {
      ...sessionCommunityListSelector,
      // location of author
      createdBy: {
        select: {
          ...userListSelector,
          city: {
            select: {
              country: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      // for deeply nested selectors prisma somehow does not work, it just trolls at this point...
      assignedActivities: {
        select: activityListSelector,
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      createdBy: {
        NOT: userRef,
      },
    },
  })

  const likedSessions = await likeClient.findMany({
    where: {
      user: userRef,
      sessionId: { in: sessions.map((s) => s.id) },
    },
    select: {
      sessionId: true,
    },
  })

  const likedSessionIds = new Set(likedSessions.map((like) => like.sessionId))

  const sessionsWithLikeInfo: SessionCommunityExtUserList[] = sessions.map(
    ({ _count, ...session }) => ({
      ...session,
      photos: undefined,
      photo: getOnlyProfilePhoto(session.photos.map((p) => p.peakFile)),
      likes: _count.likes,
      comments: _count.comments,
      hasLiked: likedSessionIds.has(session.id),
    })
  )

  return sessionsWithLikeInfo
}

const listFriends = async (
  userRef: RefObject,
  friends: UserList[],
  cursor: string | null,
  pageSize: number
): Promise<SessionCommunityList[]> => {
  const sessions = await sessionClient.findMany({
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    take: pageSize,
    select: {
      ...sessionCommunityListSelector,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    where: {
      createdById: {
        in: friends.map((friend) => friend.id),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const likedSessions = await likeClient.findMany({
    where: {
      user: userRef,
      sessionId: { in: sessions.map((s) => s.id) },
    },
    select: {
      sessionId: true,
    },
  })

  const likedSessionIds = new Set(likedSessions.map((like) => like.sessionId))

  const sessionsWithLikeInfo: SessionCommunityList[] = sessions.map(({ _count, ...session }) => ({
    ...session,
    photos: undefined,
    photo: getOnlyProfilePhoto(session.photos.map((p) => p.peakFile)),
    likes: _count.likes,
    comments: _count.comments,
    hasLiked: likedSessionIds.has(session.id),
  }))

  return sessionsWithLikeInfo
}

const getSession = async (
  userRef: RefObject,
  sessionId: string
): Promise<SessionCommunityDetail> => {
  const session = await sessionClient.findFirst({
    where: {
      id: sessionId,
    },
    select: {
      ...sessionDetailSelector,
      assignedActivities: {
        select: {
          ...activityDetailSelector,
          route: {
            select: {
              ...routeListSelector,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  })
  const likesCount = await likeClient.count({
    where: {
      user: userRef,
      sessionId: sessionId,
    },
  })

  const { _count, ...sessionDetail } = session!
  const sessionsWithLikeInfo = {
    ...sessionDetail,
    photos: sessionDetail.photos.map((photo: { peakFile: { id: string } }) => ({
      id: photo.peakFile.id,
    })),
    likes: _count.likes,
    comments: _count.comments,
    hasLiked: likesCount > 0,
  }

  return sessionsWithLikeInfo
}

export default { listForRecommended, listFriends, getSession }
export type { SessionCommunityExtUserList }
