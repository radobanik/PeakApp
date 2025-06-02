import { createListCursorResponse, ListCursorResponse } from '../model/common/listCursorResponse'
import {
  getOnlyProfilePhoto,
  SessionCommunityDetail,
  SessionCommunityList,
  sessionCommunityListSelector,
  sessionDetailSelector,
} from '../model/session'
import { RefObject } from '../model/common/refObject'
import { activityDetailSelector } from '../model/activity'
import { routeListSelector } from '../model/route'
import prisma from '../core/prisma/client'

const sessionClient = prisma.session
const likeClient = prisma.like

const listCommunity = async (
  userRef: RefObject,
  cursor: string | null,
  pageSize: number
): Promise<ListCursorResponse<SessionCommunityList>> => {
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

  return createListCursorResponse(sessionsWithLikeInfo, cursor, pageSize)
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

export default { listCommunity, getSession }
