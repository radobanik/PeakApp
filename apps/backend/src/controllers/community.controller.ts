import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { defaultCommunityListParams, IncommingCommunityListParams } from '../model/community'
import { CommunityRepository, SessionRepository } from '../repositories'

export enum CommunityVariant {
  RECENT = 'recent',
  FRIENDS = 'friends',
}

const list = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (!userRef) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const params = defaultCommunityListParams(req.query as unknown as IncommingCommunityListParams)

  const validatedCursos =
    params.cursorId == null ? true : await SessionRepository.existsId(params.cursorId)
  if (!validatedCursos) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Invalid cursor' })
    return
  }

  const sessions = await CommunityRepository.listCommunity(
    userRef,
    params.cursorId,
    params.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(sessions)
}

const getById = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (!userRef) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const validatedSession = SessionRepository.existsId(req.params.id)
  if (!validatedSession) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const session = await CommunityRepository.getSession(userRef, req.params.id)
  res.status(HTTP_STATUS.OK_200).json(session)
}

export default { list, getById }
