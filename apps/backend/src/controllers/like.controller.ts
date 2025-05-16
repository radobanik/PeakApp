import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { provideUserRefFromToken } from '../auth/authUtils'
import { LikeRepository, SessionRepository } from '../repositories'

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

  await LikeRepository.like(sessionId, userRef.id)
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
