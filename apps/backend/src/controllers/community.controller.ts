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

  console.log('Listing community sessions', req.query)
  const params = defaultCommunityListParams(req.query as unknown as IncommingCommunityListParams)
  console.log('Listing community sessions', params)

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

export default { list }
