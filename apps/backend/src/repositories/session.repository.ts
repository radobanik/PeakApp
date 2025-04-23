import { PrismaClient } from '@prisma/client'
import { createListResponse, ListResponse } from '../model/common/listResponse'
import { toConnector, xToManyCreator, xToManyUpdater } from './utils/connector'
import { RefObject } from '../model/common/refObject'
import {
  SessionCreate,
  SessionDetail,
  sessionDetailSelector,
  SessionList,
  sessionListSelector,
  SessionUpdate,
} from '../model/session'

const sessionClient = new PrismaClient().session
const peakFileConnector = (image: RefObject) => ({ peakFile: toConnector(image) })

type SessionDetailDeepImage = {
  photos: {
    peakFile: RefObject
  }[]
} & SessionDetail

const flattenAdditionalImages = (entity: SessionDetailDeepImage): SessionDetail => {
  return {
    ...entity,
    photos: entity.photos.map((img) => img.peakFile),
  }
}

const getById = async (author: RefObject, id: string): Promise<SessionList | null> => {
  return await sessionClient.findUnique({
    where: {
      id: id,
      createdBy: author,
    },
    select: sessionListSelector,
  })
}

const list = async (
  author: RefObject,
  pageNum: number,
  pageSize: number
): Promise<ListResponse<SessionList>> => {
  const sessions: SessionList[] = await sessionClient.findMany({
    where: {
      createdBy: author,
    },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: sessionListSelector,
  })

  const totalSessions = await sessionClient.count({
    where: {
      createdBy: author,
    },
  })

  return createListResponse(sessions, totalSessions, pageNum, pageSize)
}

const create = async (sessionData: SessionCreate, userRef: RefObject): Promise<SessionDetail> => {
  const nestedDetail = await sessionClient.create({
    data: {
      ...sessionData,
      createdAt: new Date(),
      createdBy: toConnector(userRef),
      deleted: false,

      assignedActivities: {
        connect: sessionData.assignedActivities?.map((ref) => ({ id: ref.id })),
      },
      photos: xToManyCreator(sessionData.photos, peakFileConnector),
    },
    select: sessionDetailSelector,
  })
  return flattenAdditionalImages(nestedDetail as SessionDetailDeepImage)
}

const update = async (
  author: RefObject,
  id: string,
  sessionData: SessionUpdate
): Promise<SessionDetail> => {
  const nestedDetail = await sessionClient.update({
    where: {
      id: id,
      createdBy: author,
    },
    data: {
      ...sessionData,
      updatedAt: new Date(),

      photos: xToManyUpdater(sessionData.photos, peakFileConnector),
    },
    select: sessionDetailSelector,
  })
  return flattenAdditionalImages(nestedDetail as SessionDetailDeepImage)
}

const exists = async (author: RefObject, id: string): Promise<boolean> => {
  const count = await sessionClient.count({
    where: {
      id: id,
      createdBy: author,
    },
  })
  return count > 0
}

const deleteById = async (id: string) => {
  await sessionClient.delete({
    where: { id },
  })
}

export default {
  getById,
  list,
  create,
  update,
  exists,
  deleteById,
}
