import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import {
  ActivityRepository,
  CommunityRepository,
  SessionRepository,
  UserRepository,
} from '../repositories'
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
import { ClimbingStructureType } from '@prisma/client'
import {
  calculateBhattacharyyaCoefficient,
  createClimbingTypeHistogram,
} from './utils/community-heuristics'
import { UserList } from '../model/user'

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

export type ClimbHistogram = Record<ClimbingStructureType, number>

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

  const following = params.selectedCategories.includes(RecommenderCategory.FOLLOWING)
    ? await followsRepository.listFollowing(userRef.id)
    : []

  let userClimbingStatistics = {} as ClimbHistogram
  if (params.selectedCategories.includes(RecommenderCategory.MY_PROFILE)) {
    const userLastClimbingTypes = await ActivityRepository.getUserLastClimbsTypes(userRef, 30)
    userClimbingStatistics = createClimbingTypeHistogram(userLastClimbingTypes)
  }

  let userState = params.selectedCategories.includes(RecommenderCategory.MY_STATE)
    ? await UserRepository.getUserState(userRef.id)
    : null

  const evaluatedSessions = allSessions.map((session) => ({
    session: session,
    value: evaluateSession(
      session,
      params.selectedCategories,
      following,
      userClimbingStatistics,
      userState
    ),
  }))

  evaluatedSessions.sort((e1, e2) => {
    const diff = e2.value - e1.value // DESC
    if (diff != 0) return diff

    // sort secondary by created date DESC
    return e2.session.createdAt.getTime() - e1.session.createdAt.getTime()
  })

  // // Demo logs for evaluations (to showcase it is actually calculating something)
  // console.log(evaluatedSessions)
  // console.log('==========')
  const finalSessions = evaluatedSessions.map((e) => e.session)

  const startIdx =
    params.cursorId != null
      ? finalSessions.findIndex((session) => session.id === params.cursorId) + 1
      : 0
  const endIdx = startIdx + params.pageSize

  return finalSessions.slice(startIdx, endIdx)
}

const evaluateSession = (
  session: SessionCommunityExtUserList,
  categories: RecommenderCategory[],
  following: UserList[],
  userClimbingHistogram: ClimbHistogram,
  userStateName: string | null
): number => {
  let evaluation = 0

  if (categories.includes(RecommenderCategory.FOLLOWING)) {
    const user = following.find((user) => user.id === session.createdBy.id)
    if (user !== undefined) evaluation += 5
  }

  if (categories.includes(RecommenderCategory.MY_PROFILE)) {
    const sessionClimbingTypes = session.assignedActivities.map(
      (activity) => activity.route.climbingStructureType
    )
    const sessionHistogram: ClimbHistogram = createClimbingTypeHistogram(sessionClimbingTypes)
    const similarity = calculateBhattacharyyaCoefficient(userClimbingHistogram, sessionHistogram)
    evaluation += similarity * 10
  }

  if (categories.includes(RecommenderCategory.TRENDING)) {
    evaluation += Math.log2(session.likes + 1) // log 0 very bad
  }

  if (categories.includes(RecommenderCategory.MY_STATE)) {
    if (userStateName !== null && session.createdBy?.city?.country?.name === userStateName) {
      evaluation += 5
    }
  }

  return evaluation
}

export default { list, getById }
