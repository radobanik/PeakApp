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
import prisma from '../core/prisma/client'

const activityClient = prisma.activity

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
const list = async (author: RefObject): Promise<ListResponse<ActivityList>> => {
  const activities: ActivityList[] = await activityClient.findMany({
    where: {
      createdBy: author,
      session: null,
    },
    select: activityListSelector,
    orderBy: [
      {
        climbedAt: 'desc',
      },
      {
        route: {
          name: 'asc',
        },
      },
    ],
  })

  const totalActivities = await activityClient.count({
    where: {
      createdBy: author,
      session: null,
    },
  })

  return createListResponse(activities, totalActivities, 1, activities.length)
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

const unassign = async (author: RefObject, ids: string[]) => {
  await prisma.$transaction(
    ids.map((id) =>
      activityClient.update({
        where: {
          id: id,
          createdBy: author,
        },
        data: {
          session: {
            disconnect: true,
          },
        },
      })
    )
  )
}

const assign = async (user: RefObject, ids: string[], sessionId: string) => {
  await prisma.$transaction(async () => {
    for (const id of ids) {
      await activityClient.update({
        where: {
          id: id,
          createdBy: user,
        },
        data: {
          session: {
            connect: {
              id: sessionId,
            },
          },
        },
      })
    }
  })
}

const getUserLastClimbsTypes = async (user: RefObject, count: number) => {
  const lastClimbingStructureTypes = await activityClient.findMany({
    select: {
      route: {
        select: {
          climbingStructureType: true,
        },
      },
    },
    take: count,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return lastClimbingStructureTypes.map((type) => type.route.climbingStructureType)
}

export default {
  getById,
  list,
  create,
  update,
  exists,
  deleteById,
  unassign,
  assign,
  getUserLastClimbsTypes,
}
