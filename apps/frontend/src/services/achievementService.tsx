import { API } from '@/constants/api'
import { api } from '.'
import {
  AchievementCreate,
  AchievementDetail,
  AchievementDetailWithIconMetadata,
  AchievementUpdate,
} from '@/types/achievementTypes'
import { getFile } from './fileService'
import { PeakFile } from '@/types/fileTypes'

export const getUserAchievements = async (
  userId: string
): Promise<AchievementDetailWithIconMetadata[]> => {
  const response = await api.get(API.ACHIEVEMENT.BY_USER(userId))
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  const achievements: AchievementDetail[] = response.data

  const achievementsWithIcons = await Promise.all(
    achievements.map(async (achievement) => {
      const icon = achievement.icon
      const iconWithMetadata: PeakFile | null = icon == null ? null : await getFile(icon.id)
      return {
        ...achievement,
        icon: iconWithMetadata,
      }
    })
  )

  return achievementsWithIcons
}

export const getAllAchievements = async (): Promise<AchievementDetail[]> => {
  const response = await api.get(API.ACHIEVEMENT.ALL())
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const getAllAchievementsWithIconMetadata = async (): Promise<
  AchievementDetailWithIconMetadata[]
> => {
  const achievements: AchievementDetail[] = await getAllAchievements()

  const achievementsWithIcons = await Promise.all(
    achievements.map(async (achievement) => {
      const icon = achievement.icon
      const iconWithMetadata: PeakFile | null = icon == null ? null : await getFile(icon.id)
      return {
        ...achievement,
        icon: iconWithMetadata,
      }
    })
  )

  return achievementsWithIcons
}

export const createAchievement = async (
  achievement: AchievementCreate
): Promise<AchievementDetail> => {
  const response = await api.post(API.ACHIEVEMENT.CREATE(), achievement)
  if (response.status != 201) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const updateAchievement = async (
  id: string,
  achievement: AchievementUpdate
): Promise<AchievementDetail> => {
  const response = await api.put(API.ACHIEVEMENT.UPDATE(id), achievement)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const deleteAchievement = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(API.ACHIEVEMENT.DELETE(id))
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to delete Achievement.'
    throw new Error(message)
  }
}
