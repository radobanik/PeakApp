import { provideUserRefFromToken } from '../auth/authUtils'
import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import followsRepository from '../repositories/follows.repository'

const listFollowers = async (req: Request, res: Response) => {
  const paramUserId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  const follows = await followsRepository.listFollowers(paramUserId)
  res.status(HTTP_STATUS.OK_200).json(follows)
}

const listFollowing = async (req: Request, res: Response) => {
  const paramUserId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  const follows = await followsRepository.listFollowing(paramUserId)
  res.status(HTTP_STATUS.OK_200).json(follows)
}

const createFollow = async (req: Request, res: Response) => {
  const paramUserId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  if (await followsRepository.exists(requestUser.id, paramUserId)) {
    res.status(HTTP_STATUS.CONFLICT_409).json({ error: 'Already following' })
    return
  }

  const follows = await followsRepository.createFollow(requestUser, { id: paramUserId })
  if (follows == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Following not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(follows)
  }
}

const deleteFollow = async (req: Request, res: Response) => {
  const paramUserId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  if (!(await followsRepository.exists(requestUser.id, paramUserId))) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Following not found' })
    return
  }

  await followsRepository.deleteFollow(requestUser.id, paramUserId)
  res.status(HTTP_STATUS.NO_CONTENT_204).end()
}

export default {
  listFollowers,
  listFollowing,
  createFollow,
  deleteFollow,
}
