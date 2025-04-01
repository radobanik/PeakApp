import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import UserRepository, { UserOrder, UserWhere } from '../repositories/user.repository'
import { UserCreate, UserUpdate, userUpdateValidate, userCreateValidate } from '../model/user/index'
import { defaultUserListParams, IncommingUserListParams } from '../model/user/userList'
import { parseSortAndOrderBy } from '../model/common/listParams'
import requestValidator from '../model/common/validator'

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id
  const user = await UserRepository.getUserById(userId)

  if (user == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'User not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(user)
  }
}

const userList = async (req: Request, res: Response) => {
  const params = req.query as unknown as IncommingUserListParams
  const normalizedParams = defaultUserListParams(params)

  const where: UserWhere = {
    AND: [
      {
        AND: [
          { firstName: { contains: normalizedParams.firstName as string, mode: 'insensitive' } },
          { lastName: { contains: normalizedParams.lastName as string, mode: 'insensitive' } },
          { email: { contains: normalizedParams.email as string, mode: 'insensitive' } },
        ],
      },
      {
        deleted: false,
      },
    ],
  }

  const orderBy: UserOrder[] = parseSortAndOrderBy(normalizedParams.sort, normalizedParams.order)
  orderBy.push({ id: 'asc' })

  const userListResult = await UserRepository.listUsers(
    where,
    orderBy,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(userListResult)
}

const createUser = async (req: Request<UserCreate>, res: Response) => {
  const userData: UserCreate = req.body

  const validatedData = requestValidator(() => userCreateValidate(userData), res)
  if (!validatedData) return

  const user = await UserRepository.createUser(validatedData)
  res.status(HTTP_STATUS.CREATED_201).json(user)
}

const updateUser = async (req: Request<{ id: string }, object, UserUpdate>, res: Response) => {
  const userData = req.body
  const userId = req.params.id

  const validatedData = requestValidator(() => userUpdateValidate(userData), res)
  if (!validatedData) return

  const exists: boolean = await UserRepository.exists(userId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'User not found' })
    return
  }

  const user = await UserRepository.updateUser(userId, validatedData)
  res.status(HTTP_STATUS.OK_200).json(user)
}

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  const exists = await UserRepository.exists(userId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'User not found' })
    return
  }

  await UserRepository.deleteUser(userId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default {
  getUserById,
  userList,
  createUser,
  updateUser,
  deleteUser,
}
