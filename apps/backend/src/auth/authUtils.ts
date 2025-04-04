import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/user.repository'
import { UserDetail } from '../model/user/userDetail'
import { RefObject } from '../model/common/refObject'
import { HTTP_STATUS } from '../controllers/utils/httpStatusCodes'

export const returnUnauthorized = (res: Response): void => {
  res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
    error: 'Unauthorized',
  })
}

export const provideUserRefFromToken = (request: Request): RefObject | null => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as RefObject
    if (!decodedToken || !decodedToken.id) return null
    return { id: decodedToken.id }
  } catch (err) {
    return null
  }
}

export const provideUserDetailFromToken = async (request: Request): Promise<UserDetail | null> => {
  try {
    const userRef = provideUserRefFromToken(request)
    if (userRef === null) return null
    const user = await userRepository.getUserById(userRef.id)
    return user
  } catch (err) {
    return null
  }
}
