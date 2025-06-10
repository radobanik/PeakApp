import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'

const COMMENTS_ENABLED = process.env.COMMENTS_ENABLED === 'true'
const SHOW_APPROVED_ONLY = process.env.SHOW_APPROVED_ONLY === 'true'

const getFeatureFlags = async (req: Request, res: Response) => {
  const flags = {
    commentsEnabled: COMMENTS_ENABLED,
    showApprovedOnly: SHOW_APPROVED_ONLY,
  }
  res.status(HTTP_STATUS.OK_200).json(flags)
}

export default {
  getFeatureFlags,
}
