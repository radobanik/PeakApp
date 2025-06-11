import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { CommentRepository, SessionRepository, UserRepository } from '../repositories'
import { defaultCommentListParams, IncommingCommentListParams } from '../model/comment/commentList'
import { provideUserRefFromToken } from '../auth/authUtils'
import { CommentCreate, commentUpdateValidate, commentCreateValidate } from '../model/comment'
import requestValidator from '../model/common/validator'
import { NotificationType, Role } from '@prisma/client'
import { RefObject } from '../model/common/refObject'
import NotificationRepository from '../repositories/notification.repository'
import userRepository from '../repositories/user.repository'
import notificationSettingsRepository from '../repositories/notificationSettings.repository'
import { sendCommentEmail } from '../services/emailService'
import { getFeatureFlags } from '../utils/featureFlags'

const validateUser = async (
  userRef: RefObject,
  commentUserId: string,
  res: Response
): Promise<boolean> => {
  const user = await UserRepository.getUserById(userRef.id)

  if (commentUserId !== user!.id && !user!.roles.includes(Role.ADMIN)) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Forbidden' })
    return false
  }

  return true
}

const listBySession = async (req: Request, res: Response) => {
  const featureFlags = await getFeatureFlags()
  if (!featureFlags.commentsEnabled) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Comments are currently disabled' })
    return
  }
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }
  const user = await UserRepository.getUserById(userRef.id)

  const params = defaultCommentListParams(req.query as unknown as IncommingCommentListParams)
  const sessionId = params.sessionId

  if (sessionId === null) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Session ID is required' })
    return
  }

  const sessionExists = await SessionRepository.existsId(sessionId)
  if (!sessionExists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const comments = await CommentRepository.listBySession(
    sessionId,
    params.cursorId,
    params.pageSize,
    userRef,
    user!.roles.includes(Role.ADMIN)
  )

  res.status(HTTP_STATUS.OK_200).json(comments)
}

const create = async (req: Request, res: Response) => {
  const featureFlags = await getFeatureFlags()
  if (!featureFlags.commentsEnabled) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Comments are currently disabled' })
    return
  }

  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const data: CommentCreate = req.body
  const validatedData = requestValidator(() => commentCreateValidate(data), res)
  if (!validatedData) return

  const sessionExists = await SessionRepository.existsId(data.session.id)
  if (!sessionExists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const createdComment = await CommentRepository.create(data, userRef)
  if (createdComment) {
    const session = await SessionRepository.getByIdWithoutAuth(data.session.id)
    const notifiedUser = await userRepository.getUserById(session?.createdBy.id ?? '')
    const intercatorUser = await userRepository.getUserById(userRef.id)

    const message = `User ${intercatorUser?.firstName} ${intercatorUser?.lastName} commented your session`
    await NotificationRepository.create({
      userId: notifiedUser?.id ?? '',
      title: 'New comment',
      message: message,
      type: NotificationType.COMMENT,
    })

    const notificationSettings = await notificationSettingsRepository.getByUserId(
      notifiedUser?.id ?? ''
    )
    if (notificationSettings && notificationSettings.enableEmail) {
      sendCommentEmail(
        `${intercatorUser?.firstName} ${intercatorUser?.lastName}`,
        notifiedUser?.email
      )
      console.log('Email sent', notifiedUser?.email, message)
    }
  }
  res.status(HTTP_STATUS.CREATED_201).json(createdComment)
}

const update = async (req: Request, res: Response) => {
  const featureFlags = await getFeatureFlags()
  if (!featureFlags.commentsEnabled) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Comments are currently disabled' })
    return
  }

  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const commentId = req.params.id
  const data: CommentCreate = req.body
  const validatedData = requestValidator(() => commentUpdateValidate(data), res)
  if (!validatedData) return

  const comment = await CommentRepository.getById(commentId)
  if (!comment) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Comment not found' })
    return
  }

  if (!validateUser(userRef, comment.user.id, res)) {
    return
  }

  const updatedComment = await CommentRepository.update(data, commentId)
  res.status(HTTP_STATUS.OK_200).json(updatedComment)
}

const deleteById = async (req: Request, res: Response) => {
  const featureFlags = await getFeatureFlags()
  if (!featureFlags.commentsEnabled) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Comments are currently disabled' })
    return
  }
  const commentId = req.params.id
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const comment = await CommentRepository.getById(commentId)
  if (!comment) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Comment not found' })
    return
  }

  if (!validateUser(userRef, comment.user.id, res)) {
    return
  }

  await CommentRepository.deleteById(commentId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default {
  listBySession,
  create,
  update,
  deleteById,
}
