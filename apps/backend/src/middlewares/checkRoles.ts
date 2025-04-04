import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '../controllers/utils/httpStatusCodes'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

const checkRoles = (requiredRoles: Role[]) => {
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
        roles: Role[]
      }

      if (!decodedToken.roles || !decodedToken.roles.some((role) => requiredRoles.includes(role))) {
        res.status(HTTP_STATUS.FORBIDDEN_403).json({
          error: 'You do not have permission to access this resource',
        })
        return
      }

      next()
    } catch (err) {
      res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
        error: 'Invalid or expired token',
      })
    }
  }
}

export default checkRoles
