import client from '../core/prisma/client'

const daysRegistered = async (userId: string): Promise<number> => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: {
      createdAt: true,
    },
  })

  if (!user) return 0

  const now = new Date()
  const timeDiff = now.getTime() - user.createdAt.getTime()

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  return Math.max(0, days)
}

const commentsCount = async (userId: string): Promise<number> => {
  const count = await client.comment.count({
    where: {
      userId: userId,
      deleted: false,
    },
  })
  return count
}

const sessionsCount = async (userId: string): Promise<number> => {
  const count = await client.session.count({
    where: {
      createdById: userId,
      deleted: false,
    },
  })
  return count
}

const maxActivityPerSession = async (userId: string): Promise<number> => {
  const activitiesGroupedBySession = await client.activity.groupBy({
    by: ['sessionid'],
    where: {
      session: {
        createdById: userId,
        deleted: false,
      },
    },
    _count: {
      id: true,
    },
  })

  const maxCount = activitiesGroupedBySession.reduce((max, group) => {
    return Math.max(max, group._count.id)
  }, 0)

  return maxCount
}

const maxLikeOnSession = async (userId: string): Promise<number> => {
  const likesGroupedBySession = await client.like.groupBy({
    by: ['sessionId'],
    where: {
      session: {
        createdById: userId,
        deleted: false,
      },
    },
    _count: {
      id: true,
    },
  })

  const maxCount = likesGroupedBySession.reduce((max, group) => {
    return Math.max(max, group._count.id)
  }, 0)

  return maxCount
}

const routeToppedCount = async (userId: string): Promise<number> => {
  const count = await client.activity.count({
    where: {
      createdById: userId,
      topped: true,
    },
  })
  return count
}

const routeReviewCount = async (userId: string): Promise<number> => {
  const count = await client.review.count({
    where: {
      createdById: userId,
    },
  })
  return count
}

export default {
  daysRegistered,
  commentsCount,
  sessionsCount,
  maxActivityPerSession,
  maxLikeOnSession,
  routeToppedCount,
  routeReviewCount,
}
