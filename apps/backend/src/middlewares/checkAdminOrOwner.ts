import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '../controllers/utils/httpStatusCodes'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

const checkAdminOrOwner = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
        error: 'Authorization token is missing or invalid',
      })
      return
    }

    const token = authHeader.split(' ')[1]

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as {
        id: string
        roles: Role[]
      }

      const userIdFromToken = decodedToken.id
      const userRoles = decodedToken.roles
      const userIdFromParams = req.params.id

      if (userRoles.includes(Role.ADMIN) || userIdFromToken === userIdFromParams) {
        next()
      } else {
        res.status(HTTP_STATUS.FORBIDDEN_403).json({
          error: 'You do not have permission to modify this resource',
        })
      }
    } catch {
      res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
        error: 'Invalid or expired token',
      })
    }
  }
}

export default checkAdminOrOwner
