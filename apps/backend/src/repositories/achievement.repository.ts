import {
  AchievementCreate,
  AchievementDetail,
  achievementDetailSelector,
  AchievementUpdate,
} from '../model/achievement'
import { toConnectorNullable } from './utils/connector'
import prisma from '../core/prisma/client'

const achievementClient = prisma.achievement

const getAll = async (): Promise<AchievementDetail[]> => {
  return await achievementClient.findMany({
    select: achievementDetailSelector,
  })
}

const create = async (achievement: AchievementCreate): Promise<AchievementDetail> => {
  return await achievementClient.create({
    data: {
      ...achievement,
      icon: toConnectorNullable(achievement.icon),
    },
    select: achievementDetailSelector,
  })
}

const update = async (id: string, achievement: AchievementUpdate): Promise<AchievementDetail> => {
  return await achievementClient.update({
    where: { id },
    data: {
      ...achievement,
      icon: toConnectorNullable(achievement.icon),
    },
    select: achievementDetailSelector,
  })
}

const deleteById = async (id: string): Promise<void> => {
  await achievementClient.delete({
    where: { id },
  })
}

const exists = async (id: string): Promise<boolean> => {
  const count = await achievementClient.count({
    where: {
      id,
    },
  })
  return count > 0
}

export default {
  getAll,
  create,
  update,
  deleteById,
  exists,
}
