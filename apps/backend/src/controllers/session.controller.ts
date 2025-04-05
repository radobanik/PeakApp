import { Request, Response } from 'express'
import { ActivityRepository, SessionRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import requestValidator from '../model/common/validator'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'
import {
  IncommingListParams,
  NonNullListParams,
  toNotNullListParams,
} from '../model/common/listParams'
import config from '../core/config'
import {
  SessionCreate,
  sessionCreateValidate,
  SessionUpdate,
  sessionUpdateValidate,
} from '../model/session'

const list = async (req: Request, res: Response) => {
  const params = req.query as unknown as IncommingListParams
  const normalizedParams: NonNullListParams = toNotNullListParams(params, config.listLimit.default)
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  const routeListResult = await SessionRepository.list(
    requestUser,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(routeListResult)
}

const getById = async (req: Request, res: Response) => {
  const sessionId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  const session = await SessionRepository.getById(requestUser, sessionId)
  if (session == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(session)
  }
}

const create = async (req: Request<SessionCreate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const session: SessionCreate = req.body
  const validatedData = requestValidator(() => sessionCreateValidate(session), res)
  if (!validatedData) return

  const activities = await session.assignedActivities.map(
    async (ref) => await ActivityRepository.getById(userRef, ref.id)
  )
  for (let i = 0; i < activities.length; i++) {
    const activity = await activities[i]
    if (activity === null) {
      res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Activity not found' })
      return
    }
    if (activity.session != null) {
      res
        .status(HTTP_STATUS.BAD_REQUEST_400)
        .json({ error: 'Cannot assign Activity from another Session.' })
      return
    }
  }

  if (activities.length != session.assignedActivities.length) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Invalid Activity' })
    return
  }

  const createdSession = await SessionRepository.create(validatedData, userRef)
  res.status(HTTP_STATUS.CREATED_201).json(createdSession)
}

const update = async (req: Request<{ id: string }, object, SessionUpdate>, res: Response) => {
  const session = req.body
  const sessionId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const validatedData = requestValidator(() => sessionUpdateValidate(session), res)
  if (!validatedData) return

  const exists = await SessionRepository.exists(requestUser, sessionId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  const updatedActivity = await SessionRepository.update(requestUser, sessionId, validatedData)
  res.status(HTTP_STATUS.OK_200).json(updatedActivity)
}

const deleteById = async (req: Request, res: Response) => {
  const sessionId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const entity = await SessionRepository.getById(requestUser, sessionId)
  if (entity === null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Session not found' })
    return
  }

  for (let i = 0; i < entity.assignedActivities.length; i++) {
    const activityId = entity.assignedActivities[i].id

    await ActivityRepository.unassign(activityId)
  }

  await SessionRepository.deleteById(sessionId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default {
  list,
  getById,
  create,
  update,
  deleteById,
}
