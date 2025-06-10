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
