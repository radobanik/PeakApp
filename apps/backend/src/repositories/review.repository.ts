import { PrismaClient } from '@prisma/client'
import { RefObject } from '../model/common/refObject'
import { ReviewCreate, reviewDetailSelector, reviewListSelector } from '../model/review'
import { toConnector } from './utils/connector'

const reviewClient = new PrismaClient().review

const getUsersByRouteId = async (routeId: string, userRef: RefObject) => {
  return reviewClient.findFirst({
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

const create = async (reviewData: ReviewCreate, route: RefObject, userRef: RefObject) => {
  return await reviewClient.create({
    data: {
      ...reviewData,
      createdBy: toConnector(userRef),
      route: toConnector(route),
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

const deleteByRouteId = async (routeId: string, author: RefObject) => {
  await reviewClient.delete({
    where: {
      routeId_createdById: {
        routeId: routeId,
        createdById: author.id,
      },
    },
  })
}

const exists = async (routeId: string, author: RefObject): Promise<boolean> => {
  const count = await reviewClient.count({
    where: {
      routeId: routeId,
      createdById: author.id,
    },
  })
  return count > 0
}

export default {
  getUsersByRouteId,
  listByRouteId,
  create,
  update,
  deleteByRouteId,
  exists,
}
