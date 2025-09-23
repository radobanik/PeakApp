import { Request, Response } from 'express'
import { achievementCreateValidate, AchievementDetail } from '../model/achievement'
import requestValidator from '../model/common/validator'
import { AchievementMiscRepository, AchievementRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { AchievementType } from '@prisma/client'

const create = async (req: Request, res: Response) => {
  const achievementData = req.body

  const validatedData = requestValidator(() => achievementCreateValidate(achievementData), res)
  if (!validatedData) return

  if (!validatedData) return
  const achievement = await AchievementRepository.create(achievementData)

  res.status(HTTP_STATUS.CREATED_201).json(achievement)
}

const update = async (req: Request, res: Response) => {
  const achievementData = req.body
  const achievementId = req.params.id

  const validatedData = requestValidator(() => achievementCreateValidate(achievementData), res)
  if (!validatedData) return

  const exists: boolean = await AchievementRepository.exists(achievementId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Achievement not found' })
    return
  }

  const achievement = await AchievementRepository.update(achievementId, achievementData)
  res.status(HTTP_STATUS.OK_200).json(achievement)
}

const deleteById = async (req: Request, res: Response) => {
  const achievementId = req.params.id
  const exists = await AchievementRepository.exists(achievementId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Achievement not found' })
    return
  }

  await AchievementRepository.deleteById(achievementId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

const getUserAchievements = async (req: Request, res: Response) => {
  const userId = req.params.id

  const achievements: AchievementDetail[] = await AchievementRepository.getAll()
  const achievementTypes: AchievementType[] = Object.values(AchievementType)

  const userAchievements: AchievementDetail[] = []

  for (const achievementType of achievementTypes) {
    let achievementValue: number | null = null

    switch (achievementType) {
      case AchievementType.DAYS_REGISTERED:
        achievementValue = await AchievementMiscRepository.daysRegistered(userId)
        break
      case AchievementType.COMMENTS_COUNT:
        achievementValue = await AchievementMiscRepository.commentsCount(userId)
        break
      case AchievementType.SESSIONS_COUNT:
        achievementValue = await AchievementMiscRepository.sessionsCount(userId)
        break
      case AchievementType.MAX_ACTIVITY_PER_SESSION:
        achievementValue = await AchievementMiscRepository.maxActivityPerSession(userId)
        break
      case AchievementType.MAX_LIKE_ON_SESSION:
        achievementValue = await AchievementMiscRepository.maxLikeOnSession(userId)
        break
      case AchievementType.ROUTE_TOPPED_COUNT:
        achievementValue = await AchievementMiscRepository.routeToppedCount(userId)
        break
      case AchievementType.ROUTE_REVIEW_COUNT:
        achievementValue = await AchievementMiscRepository.routeReviewCount(userId)
        break
      default:
        console.error('Unknown achievement type:', achievementType)
    }

    if (achievementValue === null) {
      console.error('Unknown achievement type:', achievementType)
      continue
    }

    achievements
      .filter((achievement) => achievement.type === achievementType)
      .filter((achievement) => achievement.minimumValue <= achievementValue)
      .forEach((achievement) => userAchievements.push(achievement))
  }

  res.status(HTTP_STATUS.OK_200).json(userAchievements)
}

const getAllAchievements = async (req: Request, res: Response) => {
  const achievements: AchievementDetail[] = await AchievementRepository.getAll()
  res.status(HTTP_STATUS.OK_200).json(achievements)
}

export default {
  create,
  update,
  deleteById,
  getUserAchievements,
  getAllAchievements,
}
