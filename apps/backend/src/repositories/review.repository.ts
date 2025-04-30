import { PrismaClient } from '@prisma/client'
import { RefObject } from '../model/common/refObject'
import { ReviewCreate, reviewDetailSelector, reviewListSelector } from '../model/review'

const reviewClient = new PrismaClient().review

const getByRouteId = async (routeId: string, userRef: RefObject) => {
  return reviewClient.findMany({
    where: {
      routeId: routeId,
      createdBy: userRef,
    },
    select: reviewDetailSelector,
  })
}

const listByRouteId = async (routeId: string) => {
  return reviewClient.findMany({
    where: {
      routeId: routeId,
    },
    select: reviewListSelector,
  })
}

const create = async (reviewData: any, userRef: RefObject) => {
  return await reviewClient.create({
    data: {
      ...reviewData,
      user: userRef,
    },
    select: reviewDetailSelector,
  })
}

const update = async (reviewData: ReviewCreate, routeId: string, author: RefObject) => {
  return await reviewClient.update({
    where: {
      routeId_createdById: {
        routeId: routeId,
        createdById: author.id,
      },
    },
    data: {
      ...reviewData,
      updatedAt: new Date(),
    },
    select: reviewDetailSelector,
  })
}

export default {
  getByRouteId,
  listByRouteId,
  create,
  update,
}
