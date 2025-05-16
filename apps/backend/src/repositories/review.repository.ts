import { PrismaClient } from '@prisma/client'
import { RefObject } from '../model/common/refObject'
import { ReviewCreate, reviewDetailSelector, reviewListSelector } from '../model/review'
import { toConnector } from './utils/connector'

const reviewClient = new PrismaClient().review

const getUsersByRouteId = async (routeId: string, userRef: RefObject) => {
  return await reviewClient.findFirst({
    where: {
      routeId: routeId,
      createdBy: userRef,
    },
    select: reviewDetailSelector,
  })
}

const listByRouteId = async (
  routeId: string,
  user: RefObject,
  pageNum: number,
  pageSize: number
) => {
  const reviews = await reviewClient.findMany({
    where: {
      routeId: routeId,
      createdBy: { NOT: user },
    },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: reviewListSelector,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
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

const deleteByRouteId = async (routeId: string, authorId: string) => {
  await reviewClient.delete({
    where: {
      routeId_createdById: {
        routeId: routeId,
        createdById: authorId,
      },
    },
  })
}

const exists = async (routeId: string, authorId: string): Promise<boolean> => {
  const count = await reviewClient.count({
    where: {
      routeId: routeId,
      createdById: authorId,
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
