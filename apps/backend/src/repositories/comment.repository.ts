import { PrismaClient } from '@prisma/client'
import { CommentList } from '../model/comment/commentList'
import { CommentCreate, commentListSelector, CommentUpdate } from '../model/comment'
import { RefObject } from '../model/common/refObject'
import { toConnector } from './utils/connector'
import { ListCursorResponse } from '../model/common/listCursorResponse'

const commentClient = new PrismaClient().comment

const getById = async (id: string): Promise<CommentList | null> => {
  return await commentClient.findUnique({
    where: {
      id: id,
    },
    select: commentListSelector,
  })
}

const listBySession = async (
  sessionId: string,
  cursorId: string | null,
  pageSize: number
): Promise<ListCursorResponse<CommentList>> => {
  const comments: CommentList[] = await commentClient.findMany({
    where: {
      sessionId: sessionId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: pageSize + 1,
    select: commentListSelector,
    cursor: cursorId !== null ? { id: cursorId } : undefined,
    skip: cursorId !== null ? 1 : 0,
  })

  const isNextPage = comments.length > pageSize
  return {
    items: comments.slice(0, pageSize),
    cursorId: isNextPage ? comments[pageSize - 1].id : null,
    hasNextPage: isNextPage,
  }
}

const create = async (data: CommentCreate, user: RefObject): Promise<CommentList> => {
  return await commentClient.create({
    data: {
      ...data,
      user: toConnector(user),
      session: toConnector(data.session),
    },
    select: commentListSelector,
  })
}

const update = async (data: CommentUpdate, id: string): Promise<CommentList> => {
  return await commentClient.update({
    where: {
      id: id,
    },
    data: {
      ...data,
      updatedAt: new Date(),
    },
    select: commentListSelector,
  })
}

const deleteById = async (id: string) => {
  await commentClient.delete({
    where: {
      id: id,
    },
  })
}

const exists = async (id: string): Promise<boolean> => {
  const count = await commentClient.count({
    where: {
      id: id,
    },
  })
  return count > 0
}

export default {
  getById,
  listBySession,
  create,
  update,
  deleteById,
  exists,
}
