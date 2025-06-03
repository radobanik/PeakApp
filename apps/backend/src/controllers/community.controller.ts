import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { CommunityRepository, SessionRepository } from '../repositories'
import {
  defaultCommunityListParams,
  IncommingCommunityListParams,
  NonNullCommunityListParams,
  SessionCommunityList,
} from '../model/session'
import { createListCursorResponse } from '../model/common/listCursorResponse'
import followsRepository from '../repositories/follows.repository'
import { RefObject } from '../model/common/refObject'
import { SessionCommunityExtUserList } from '../repositories/community.repository'

export enum CommunityVariant {
  RECOMMENDED = 'recommended',
  FRIENDS = 'friends',
}

export enum RecommenderCategory {
  TRENDING = 'trending',
  FOLLOWING = 'following',
  MY_PROFILE = 'my-profile',
  MY_STATE = 'my-state',
}

const list = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (!userRef) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const params: NonNullCommunityListParams = defaultCommunityListParams(
    req.query as unknown as IncommingCommunityListParams
  )

  const validatedCursos =
    params.cursorId == null ? true : await SessionRepository.existsId(params.cursorId)
  if (!validatedCursos) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Invalid cursor' })
    return
  }

  let sessions: SessionCommunityList[]

  switch (params.variant) {
    case CommunityVariant.FRIENDS:
      const friends = await followsRepository.listFriends(userRef.id)
      sessions = await CommunityRepository.listFriends(
        userRef,
        friends,
        params.cursorId,
        params.pageSize
      )
      break
    case CommunityVariant.RECOMMENDED:
      sessions = await recommendedSessions(userRef, params)
      break
    default:
      throw new Error('invalid variant type')
  }

  const cursoredSessions = createListCursorResponse(sessions, params.cursorId, params.pageSize)
  res.status(HTTP_STATUS.OK_200).json(cursoredSessions)
}

const recommendedSessions = async (
  userRef: RefObject,
  params: NonNullCommunityListParams
): Promise<SessionCommunityList[]> => {
  const allSessions: SessionCommunityExtUserList[] =
    await CommunityRepository.listForRecommended(userRef)

  const evaluatedSessions = allSessions.map((session) => ({
    sesssion: session,
    value: evaluateSession(session),
  }))

  evaluatedSessions.sort((e1, e2) => {
    const diff = e2.value - e1.value // DESC
    if (diff != 0) return diff

    // sort secondary by created date DESC
    return e2.sesssion.createdAt.getTime() - e1.sesssion.createdAt.getTime()
  })

  const finalSessions = evaluatedSessions.map((e) => e.sesssion).slice()
  const startIdx =
    params.cursorId != null
      ? finalSessions.findIndex((session) => session.id === params.cursorId) + 1
      : 0
  const endIdx = startIdx + params.pageSize

  return finalSessions.slice(startIdx, endIdx)
}

const evaluateSession = (session: SessionCommunityExtUserList): number => {
  return 0
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
