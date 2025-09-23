import { API } from '@/constants/api'
import { api } from './index'

export interface FeatureFlags {
  commentsEnabled: boolean
  showApprovedOnly: boolean
}

export const getFeatureFlags = async (): Promise<FeatureFlags> => {
  const response = await api.get(API.FEATURE_FLAGS.LIST())
  return response.data
}

export const updateFeatureFlag = async ({
  name,
  enabled,
}: {
  name: string
  enabled: boolean
}): Promise<void> => {
  await api.put(API.FEATURE_FLAGS.UPDATE(name), { enabled })
}
