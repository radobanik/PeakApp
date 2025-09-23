import { FeatureFlag } from './featureFlag'

export const FEATURE_FLAGS = {
  COMMENTS_ENABLED: 'commentsEnabled',
  SHOW_APPROVED_ONLY: 'showApprovedOnly',
} as const

type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS]

type FeatureFlagsObject = {
  [K in FeatureFlagKey]: boolean
}

export type { FeatureFlagKey, FeatureFlagsObject, FeatureFlag }
export { selector as featureFlagSelector } from './featureFlag'
