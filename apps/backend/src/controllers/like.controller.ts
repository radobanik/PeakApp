import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { provideUserRefFromToken } from '../auth/authUtils'
import { LikeRepository, SessionRepository } from '../repositories'
import notificationRepository from '../repositories/notification.repository'
import { NotificationType } from '@prisma/client'
import notificationSettingsRepository from '../repositories/notificationSettings.repository'
import userRepository from '../repositories/user.repository'
import { sendLikeEmail } from '../services/emailService'

const like = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const sessionId = req.params.id
  const sessionExists = await SessionRepository.existsId(sessionId)
  if (!sessionExists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const likeExists = await LikeRepository.exists(sessionId, userRef.id)
  if (likeExists) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Already liked' })
    return
  }

  const createdLike = await LikeRepository.like(sessionId, userRef.id)
  if (createdLike) {
    const session = await SessionRepository.getByIdWithoutAuth(sessionId)
    const notifiedUser = await userRepository.getUserById(session?.createdBy.id ?? '')
    const intercatorUser = await userRepository.getUserById(userRef.id)

    const message = `User ${intercatorUser?.firstName} ${intercatorUser?.lastName} liked your session`
    await notificationRepository.create({
      userId: notifiedUser?.id ?? '',
      title: 'New like',
      message: message,
      type: NotificationType.LIKE,
    })

    const notificationSettings = await notificationSettingsRepository.getByUserId(
      notifiedUser?.id ?? ''
    )
    if (notificationSettings && notificationSettings.enableEmail) {
      sendLikeEmail(`${intercatorUser?.firstName} ${intercatorUser?.lastName}`, notifiedUser?.email)
    }
  }

  res.status(HTTP_STATUS.OK_200).json({ message: 'Liked' })
}

const unlike = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef == null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const sessionId = req.params.id
  const sessionExists = await SessionRepository.existsId(sessionId)
  if (!sessionExists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const likeExists = await LikeRepository.exists(sessionId, userRef.id)
  if (!likeExists) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Not liked yet' })
    return
  }
  await LikeRepository.unlike(sessionId, userRef.id)
  res.status(HTTP_STATUS.OK_200).json({ message: 'Unliked' })
}

export default {
  like,
  unlike,
}
