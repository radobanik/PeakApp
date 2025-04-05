import { PrismaClient } from '@prisma/client'
import {
  activityDetailSelector,
  ActivityList,
  activityListSelector,
  ActivityCreate,
  ActivityUpdate,
  ActivityDetail,
} from '../model/activity'
import { createListResponse, ListResponse } from '../model/common/listResponse'
import { toConnector } from './utils/connector'
import { RefObject } from '../model/common/refObject'

const activityClient = new PrismaClient().activity

const getById = async (author: RefObject, id: string): Promise<ActivityDetail | null> => {
  return activityClient.findUnique({
    where: {
      id: id,
      createdBy: author,
    },
    select: activityDetailSelector,
  })
}

// Lists all unassigned activities
const list = async (
  author: RefObject,
  pageNum: number,
  pageSize: number
): Promise<ListResponse<ActivityList>> => {
  const activities: ActivityList[] = await activityClient.findMany({
    where: {
      createdBy: author,
      session: null,
    },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: activityListSelector,
  })

  const totalActivities = await activityClient.count({
    where: {
      createdBy: author,
      session: null,
    },
  })

  return createListResponse(activities, totalActivities, pageNum, pageSize)
}

const create = async (
  activityData: ActivityCreate,
  userRef: RefObject
): Promise<ActivityDetail> => {
  return await activityClient.create({
    data: {
      ...activityData,
      createdBy: toConnector(userRef),
      route: toConnector(activityData.route),
    },
    select: activityDetailSelector,
  })
}

const update = async (
  author: RefObject,
  id: string,
  activityData: ActivityUpdate
): Promise<ActivityDetail> => {
  return await activityClient.update({
    where: {
      id: id,
      createdBy: author,
    },
    data: {
      ...activityData,
      updatedAt: new Date(),
    },
    select: activityDetailSelector,
  })
}

const exists = async (author: RefObject, id: string): Promise<boolean> => {
  const count = await activityClient.count({
    where: {
      id: id,
      createdBy: author,
    },
  })
  return count > 0
}

const deleteById = async (id: string) => {
  await activityClient.delete({
    where: { id },
  })
}

const unassign = async (id: string) => {
  await activityClient.update({
    where: {
      id: id,
    },
    data: {
      session: {
        disconnect: true,
      },
    },
  })
}

export default {
  getById,
  list,
  create,
  update,
  exists,
  deleteById,
  unassign,
}
