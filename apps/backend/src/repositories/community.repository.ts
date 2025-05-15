import { PrismaClient } from '@prisma/client'
import { CommunitySessionDetail, CommunitySessionList } from '../model/community'
import { createListCursorResponse, ListCursorResponse } from '../model/common/listCursorResponse'
import { sessionDetailSelector, sessionListSelector } from '../model/session'
import { RefObject } from '../model/common/refObject'
import { activityDetailSelector } from '../model/activity'
import { routeListSelector } from '../model/route'

const sessionClient = new PrismaClient().session
const likeClient = new PrismaClient().like

const listCommunity = async (
  userRef: RefObject,
  cursor: string | null,
  pageSize: number
): Promise<ListCursorResponse<CommunitySessionList>> => {
  const sessions = await sessionClient.findMany({
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    take: pageSize,
    select: {
      ...sessionListSelector,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
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

  const sessionsWithLikeInfo = sessions.map(({ _count, ...session }) => ({
    id: session.id,
    session,
    likes: _count.likes,
    comments: _count.comments,
    hasLiked: likedSessionIds.has(session.id),
  }))

  return createListCursorResponse(sessionsWithLikeInfo, cursor, pageSize)
}

const getSession = async (
  userRef: RefObject,
  sessionId: string
): Promise<CommunitySessionDetail> => {
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
  console.log('session', session)
  const likesCount = await likeClient.count({
    where: {
      user: userRef,
      sessionId: sessionId,
    },
  })

  const { _count, ...sessionDetail } = session!
  const sessionsWithLikeInfo = {
    id: sessionDetail.id,
    session: {
      ...sessionDetail,
      photos: sessionDetail.photos.map((photo: { peakFile: { id: string } }) => ({
        id: photo.peakFile.id,
      })),
    },
    likes: _count.likes,
    comments: _count.comments,
    hasLiked: likesCount > 0,
  }

  return sessionsWithLikeInfo
}

export default { listCommunity, getSession }
