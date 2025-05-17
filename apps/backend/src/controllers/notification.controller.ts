import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import NotificationRepository from '../repositories/notification.repository'
import { provideUserRefFromToken } from '../auth/authUtils'
import requestValidator from '../model/common/validator'
import {
  NotificationCreate,
  NotificationUpdate,
  validateNotificationCreate,
  validateNotificationUpdate,
} from '../model/notification'
import {
  IncommingListParams,
  NonNullListParams,
  toNotNullListParams,
} from '../model/common/listParams'
import config from '../core/config'

const listByLoggedInUser = async (req: Request, res: Response): Promise<void> => {
  const user = provideUserRefFromToken(req)
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const notifications = await NotificationRepository.listByUser(user.id)
  res.status(HTTP_STATUS.OK_200).json(notifications)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const notification = await NotificationRepository.getById(id)

  if (!notification) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Notification not found' })
    return
  }

  res.status(HTTP_STATUS.OK_200).json(notification)
}

const create = async (req: Request<{}, {}, NotificationCreate>, res: Response): Promise<void> => {
  const validated = requestValidator(() => validateNotificationCreate(req.body), res)
  if (!validated) return

  const notification = await NotificationRepository.create(validated)
  res.status(HTTP_STATUS.CREATED_201).json(notification)
}

const update = async (
  req: Request<{ id: string }, {}, NotificationUpdate>,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const validated = requestValidator(() => validateNotificationUpdate(req.body), res)
  if (!validated) return

  const exists = await NotificationRepository.getById(id)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Notification not found' })
    return
  }

  const notification = await NotificationRepository.update(id, validated)
  res.status(HTTP_STATUS.OK_200).json(notification)
}

const markAsRead = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params
  const exists = await NotificationRepository.getById(id)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Notification not found' })
    return
  }

  const notification = await NotificationRepository.markAsRead(id)
  res.status(HTTP_STATUS.OK_200).json(notification)
}

const deleteById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params
  const exists = await NotificationRepository.getById(id)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Notification not found' })
    return
  }

  await NotificationRepository.deleteById(id)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

const listAndMarkAllAsRead = async (req: Request, res: Response): Promise<void> => {
  const params = req.query as unknown as IncommingListParams
  const normalizedParams: NonNullListParams = toNotNullListParams(params, config.LIST_LIMIT.DEFAULT)

  const user = provideUserRefFromToken(req)
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const notifications = await NotificationRepository.listAndMarkAllAsRead(
    user.id,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(notifications)
}

const countUnread = async (req: Request, res: Response): Promise<void> => {
  const user = provideUserRefFromToken(req)
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const count = await NotificationRepository.countUnreadByUser(user.id)
  res.status(HTTP_STATUS.OK_200).json({ unreadCount: count })
}

export default {
  listByLoggedInUser,
  getById,
  create,
  update,
  markAsRead,
  deleteById,
  listAndMarkAllAsRead,
  countUnread,
}
