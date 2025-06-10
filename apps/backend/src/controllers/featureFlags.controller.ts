import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'

const getFeatureFlags = async (req: Request, res: Response) => {
  const flags = {
    commentsEnabled: process.env.COMMENTS_ENABLED === 'true',
  }
  res.status(HTTP_STATUS.OK_200).json(flags)
}

export default {
  getFeatureFlags,
}
