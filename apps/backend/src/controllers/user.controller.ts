import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import UserRepository, { UserOrder, UserWhere } from '../repositories/user.repository'
import { UserUpdate, userUpdateValidate, userCreateValidate } from '../model/user/index'
import { defaultUserListParams, IncommingUserListParams } from '../model/user/userList'
import { parseSortAndOrderBy } from '../model/common/listParams'
import requestValidator from '../model/common/validator'
import { provideUserRefFromToken } from '../auth/authUtils'

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id
  const user = await UserRepository.getUserById(userId)

  if (user == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'User not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(user)
  }
}

const getLoggedInUser = async (req: Request, res: Response) => {
  const userId = provideUserRefFromToken(req as unknown as Request)?.id
  if (!userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  res.status(HTTP_STATUS.OK_200).json(await UserRepository.getUserById(userId))
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

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userData = req.body

  const validationResult = userCreateValidate(userData)
  if (validationResult.error) {
    res.status(400).json({
      error: 'Invalid user data',
      details: validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    })
    return
  }

  const usernameExists = await UserRepository.findByUsername(userData.userName)
  if (usernameExists) {
    res.status(400).json({
      error: 'Username already exists',
    })
    return
  }

  const emailExists = await UserRepository.findByEmail(userData.email)
  if (emailExists) {
    res.status(400).json({
      error: 'Email already exists',
    })
    return
  }

  try {
    const user = await UserRepository.createUser(validationResult.data)
    res.status(201).json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({
      error: 'Failed to create user.',
    })
  }
}

const updateLoggedInUser = async (req: Request, res: Response) => {
  const userId = provideUserRefFromToken(req as unknown as Request)?.id
  console.log('userId', userId)
  if (!userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  console.log('req.body', req.body)
  const validatedData = requestValidator(() => userUpdateValidate(req.body), res)
  if (!validatedData) return

  const user = await UserRepository.updateUser(userId, validatedData)
  res.status(HTTP_STATUS.OK_200).json(user)
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
  userList,
  getUserById,
  getLoggedInUser,
  createUser,
  updateUser,
  updateLoggedInUser,
  deleteUser,
}
