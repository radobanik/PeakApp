import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/user.repository'
import { UserDetail } from '../model/user/userDetail'
import { RefObject } from '../model/common/refObject'
import { HTTP_STATUS } from '../controllers/utils/httpStatusCodes'
import { Role } from '@prisma/client'

export const returnUnauthorized = (res: Response): void => {
  res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
    error: 'Unauthorized',
  })
}

export const getTokenFromRequest = (request: Request): string | null => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  return token
}

export const provideUserRefFromToken = (request: Request): RefObject | null => {
  const token = getTokenFromRequest(request)

  if (!token) return null

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as RefObject
    if (!decodedToken || !decodedToken.id) return null
    return { id: decodedToken.id }
  } catch {
    return null
  }
}

export const checkUserRoles = (request: Request, targetRoles: Role[]): boolean => {
  const token = getTokenFromRequest(request)

  if (!token) return false

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as {
      roles: Role[]
    }

    return decodedToken.roles && decodedToken.roles.some((role) => targetRoles.includes(role))
  } catch {
    return false
  }
}

export const provideUserDetailFromToken = async (request: Request): Promise<UserDetail | null> => {
  try {
    const userRef = provideUserRefFromToken(request)
    if (userRef === null) return null
    const user = await userRepository.getUserById(userRef.id)
    return user
  } catch {
    return null
  }
}
