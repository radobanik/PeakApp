import { PrismaClient } from '@prisma/client'

const likeClient = new PrismaClient().like

const likesCountOnSession = async (sessionId: string) => {
  const likes = await likeClient.findMany({
    where: {
      sessionId,
    },
  })

  return likes.length
}

const exists = async (sessionId: string, userId: string) => {
  const like = await likeClient.findFirst({
    where: {
      sessionId,
      userId,
    },
  })

  return like !== null
}

const like = async (sessionId: string, userId: string) => {
  return await likeClient.create({
    data: {
      sessionId,
      userId,
    },
  })
}

const unlike = async (sessionId: string, userId: string) => {
  return await likeClient.deleteMany({
    where: {
      sessionId,
      userId,
    },
  })
}

export default {
  likesCountOnSession,
  exists,
  like,
  unlike,
}
