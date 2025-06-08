import prisma from '../core/prisma/client'
import { ApprovalState, Prisma } from '@prisma/client'
import {
  RouteCreate,
  RouteDetail,
  routeDetailSelector,
  RouteList,
  routeListSelector,
  RouteUpdate,
} from '../model/route'
import {
  toConnector,
  toConnectorDisconnector,
  toConnectorNullable,
  xToManyCreator,
  xToManyUpdater,
} from './utils/connector'
import { RefObject } from '../model/common/refObject'
import { createListResponse, ListResponse } from '../model/common/listResponse'
import { reviewDetailSelector } from '../model/review'

type RouteWhere = Prisma.RouteWhereInput
type RouteOrder = Prisma.RouteOrderByWithRelationInput

const routeClient = prisma.route
const peakFileConnector = (image: RefObject) => ({ peakFile: toConnector(image) })

// This is a workaround for the fact that Prisma nests additionalImages too much
type RouteDetailDeepImage = {
  additionalImages: {
    peakFile: RefObject
  }[]
} & RouteDetail

const flattenAdditionalImages = (entity: RouteDetailDeepImage): RouteDetail | null => {
  if (!entity) return null
  return {
    ...entity,
    additionalImages: entity.additionalImages.map((img) => img.peakFile),
  }
}

const list = async (
  where: RouteWhere,
  orderBy: RouteOrder[],
  pageNum: number,
  pageSize: number
): Promise<ListResponse<RouteList>> => {
  const routes: RouteList[] = await routeClient.findMany({
    where,
    orderBy,
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: routeListSelector,
  })

  const totalRoutes = await routeClient.count({ where })

  return createListResponse(routes, totalRoutes, pageNum, pageSize)
}

const getById = async (id: string): Promise<RouteDetail | null> => {
  const nestedDetail = await routeClient.findUnique({
    where: {
      id: id,
      deleted: false,
    },
    select: routeDetailSelector,
  })
  return flattenAdditionalImages(nestedDetail as unknown as RouteDetailDeepImage)
}

const create = async (route: RouteCreate, userRef: RefObject): Promise<RouteDetail | null> => {
  const nestedDetail = await routeClient.create({
    data: {
      ...route,
      grade: toConnector(route.grade),
      image: toConnectorNullable(route.image),
      additionalImages: xToManyCreator(route.additionalImages, peakFileConnector),

      createdAt: new Date(),
      createdBy: toConnector(userRef),
      climbingObject: toConnector(route.climbingObject),
    },
    select: routeDetailSelector,
  })
  return flattenAdditionalImages(nestedDetail as unknown as RouteDetailDeepImage)
}

const update = async (
  id: string,
  route: RouteUpdate,
  userRef: RefObject
): Promise<RouteDetail | null> => {
  const nestedDetail = await routeClient.update({
    where: { id },
    data: {
      ...route,
      grade: toConnector(route.grade),
      image: toConnectorDisconnector(route.image),
      additionalImages: xToManyUpdater(route.additionalImages, peakFileConnector),

      updatedAt: new Date(),
      updatedBy: toConnector(userRef),
    },
    select: routeDetailSelector,
  })
  return flattenAdditionalImages(nestedDetail as unknown as RouteDetailDeepImage)
}

const deleteById = async (id: string, userRef: RefObject): Promise<void> => {
  await routeClient.update({
    where: { id },
    data: {
      deleted: true,
      updatedAt: new Date(),
      updatedBy: toConnector(userRef),
    },
  })
}

const exists = async (id: string): Promise<boolean> => {
  const count = await routeClient.count({
    where: {
      id,
      deleted: false,
    },
  })
  return count > 0
}

const changeApprovalState = async (
  id: string,
  approvalState: ApprovalState,
  user: RefObject
): Promise<RouteDetail | null> => {
  const nestedDetail = await routeClient.update({
    where: { id },
    data: {
      approvalState: approvalState,
      updatedAt: new Date(),
      updatedBy: toConnector(user),
    },
    select: routeDetailSelector,
  })

  return flattenAdditionalImages(nestedDetail as unknown as RouteDetailDeepImage)
}

const listAllContainsTokenInName = async (token: string): Promise<RouteList[]> => {
  return routeClient.findMany({
    where: {
      name: {
        contains: token,
        mode: 'insensitive',
      },
      deleted: false,
    },
    select: routeListSelector,
  })
}

const getReviewsByRouteId = async (routeId: string) => {
  const reviewsNested = await routeClient.findMany({
    where: {
      id: routeId,
      deleted: false,
    },
    select: { reviews: { select: reviewDetailSelector } },
  })
  return reviewsNested.flatMap((route) => route.reviews)
}

const updateAverages = async (routeId: string, averageStars: number, averageDifficulty: number) => {
  const a = await routeClient.update({
    where: { id: routeId },
    data: {
      averageStar: averageStars,
      averageDifficulty: averageDifficulty,
    },
  })
}

export type { RouteWhere, RouteOrder }

export default {
  list,
  getById,
  create,
  update,
  deleteById,
  exists,
  listAllContainsTokenInName,
  changeApprovalState,
  getReviewsByRouteId,
  updateAverages,
}
