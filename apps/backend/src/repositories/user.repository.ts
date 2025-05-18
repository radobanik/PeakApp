import prisma from '../core/prisma/client'
import { Prisma, Role } from '@prisma/client'
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

const userClient = prisma.user

const userDetailSelectorWithCity = {
  ...userDetailSelector,
  city: {
    select: {
      id: true,
      name: true,
      country: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  },
}

const getUserById = async (id: string): Promise<UserDetail | null> => {
  return userClient.findUnique({
    where: {
      id: id,
      deleted: false,
    },
    select: userDetailSelectorWithCity,
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
    select: {
      ...userListSelector,
      city: {
        select: {
          id: true,
          name: true,
          country: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  })

  const transformedUsers = users.map((user) => {
    const { city, ...rest } = user

    return {
      ...rest,
      city,
    }
  })

  const totalUsers = await userClient.count({ where })

  return createListResponse(transformedUsers, totalUsers, pageNum, pageSize)
}

const createUser = async (userData: UserCreate): Promise<UserDetail> => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const birthdayDate = userData.birthday ? new Date(userData.birthday) : null

    const { cityId, ...restUserData } = userData

    const user = await userClient.create({
      data: {
        ...restUserData,
        password: hashedPassword,
        birthday: birthdayDate,
        city: cityId ? { connect: { id: cityId } } : undefined,
        roles: { set: [Role.USER] },
      },
      select: userDetailSelectorWithCity,
    })

    const { city, ...rest } = user

    return {
      ...rest,
      city,
    } as UserDetail
  } catch {
    throw new Error('Failed to create user')
  }
}

const updateUser = async (id: string, userData: UserUpdate): Promise<UserDetail> => {
  const { cityId, profilePictureId, ...rest } = userData

  const user = await userClient.update({
    where: { id },
    data: {
      ...rest,
      updatedAt: new Date(),
      city: cityId ? { connect: { id: cityId } } : { disconnect: true },
      ...(profilePictureId !== undefined &&
        (profilePictureId !== null
          ? { profilePicture: { connect: { id: profilePictureId } } }
          : { profilePicture: { disconnect: true } })),
    },
    select: userDetailSelectorWithCity,
  })

  return user as UserDetail
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
      ...userDetailSelectorWithCity,
      password: true,
    },
  })

  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined } as UserDetail
  }

  return null
}

const findByUsername = async (username: string): Promise<UserDetail | null> => {
  return await userClient.findUnique({
    where: { userName: username },
    select: userDetailSelectorWithCity,
  })
}

const findByEmail = async (email: string): Promise<UserDetail | null> => {
  return await userClient.findUnique({
    where: { email },
    select: userDetailSelectorWithCity,
  })
}

export default {
  getUserById,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  exists,
  validateUser,
  findByUsername,
  findByEmail,
}

export { UserWhere, UserOrder }
