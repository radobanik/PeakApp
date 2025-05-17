import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { provideUserRefFromToken } from '../auth/authUtils'
import NotificationSettingsRepository from '../repositories/notificationSettings.repository'
import requestValidator from '../model/common/validator'
import {
  NotificationSettingsUpdate,
  validateNotificationSettingsUpdate,
} from '../model/notificationSettings'

const getCurrent = async (req: Request, res: Response): Promise<void> => {
  const user = provideUserRefFromToken(req)
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const settings = await NotificationSettingsRepository.getByUserId(user.id)
  res.status(HTTP_STATUS.OK_200).json(settings)
}

const updateCurrent = async (
  req: Request<{}, {}, NotificationSettingsUpdate>,
  res: Response
): Promise<void> => {
  const user = provideUserRefFromToken(req)
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const validated = requestValidator(() => validateNotificationSettingsUpdate(req.body), res)
  if (!validated) return

  const settings = await NotificationSettingsRepository.updateByUserId(user.id, validated)
  res.status(HTTP_STATUS.OK_200).json(settings)
}

const getByUserId = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params
  const settings = await NotificationSettingsRepository.getByUserId(id)
  res.status(HTTP_STATUS.OK_200).json(settings)
}

const updateByUserId = async (
  req: Request<{ id: string }, {}, NotificationSettingsUpdate>,
  res: Response
): Promise<void> => {
  const { id } = req.params

  const validated = requestValidator(() => validateNotificationSettingsUpdate(req.body), res)
  if (!validated) return

  const settings = await NotificationSettingsRepository.updateByUserId(id, validated)
  res.status(HTTP_STATUS.OK_200).json(settings)
}

export default {
  getCurrent,
  updateCurrent,
  getByUserId,
  updateByUserId,
}
