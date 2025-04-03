import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import {
  UserCreate,
  UserUpdate,
  UserList,
  userDetailSelector,
  UserDetail,
  userListSelector,
} from '../model/user/index'
import { createListResponse, ListResponse } from '../model/common/listResponse'

type UserWhere = Prisma.UserWhereInput
type UserOrder = Prisma.UserOrderByWithRelationInput

const userClient = new PrismaClient().user

const getUserById = async (id: string): Promise<UserDetail | null> => {
  return userClient.findUnique({
    where: {
      id: id,
      deleted: false,
    },
    select: userDetailSelector,
  })
}

const listUsers = async (
  where: UserWhere,
  orderBy: UserOrder[],
  pageNum: number,
  pageSize: number
): Promise<ListResponse<UserList>> => {
  const users = await userClient.findMany({
    where,
    orderBy,
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: userListSelector,
  })

  const totalUsers = await userClient.count({ where })

  return createListResponse(users, totalUsers, pageNum, pageSize)
}

const createUser = async (userData: UserCreate): Promise<UserDetail> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  return await userClient.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
    select: userDetailSelector,
  })
}

const updateUser = async (id: string, userData: UserUpdate): Promise<UserDetail> => {
  const user: UserDetail = await userClient.update({
    where: { id },
    data: {
      ...userData,
      updatedAt: new Date(),
    },
    select: userDetailSelector,
  })

  return user
}

const deleteUser = async (id: string) => {
  await userClient.update({
    where: { id },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
    select: { id: true },
  })
}

const exists = async (id: string) => {
  const count = await userClient.count({
    where: {
      id: id,
      deleted: false,
    },
  })
  return count > 0
}

const validateUser = async (email: string, password: string): Promise<UserDetail | null> => {
  const user = await userClient.findFirst({
    where: {
      email: email,
      deleted: false,
    },
    select: {
      ...userDetailSelector,
      password: true,
    },
  })

  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined } as UserDetail
  }

  return null
}

export default {
  getUserById,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  exists,
  validateUser,
}

export { UserWhere, UserOrder }
