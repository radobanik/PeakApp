import prisma from '../core/prisma/client'
import { FeatureFlagsObject, FeatureFlagKey, FEATURE_FLAGS } from '../model/featureFlags'

const featureFlagClient = prisma.featureFlag

const getFeatureFlags = async (): Promise<FeatureFlagsObject> => {
  const flags = await featureFlagClient.findMany()
  const defaultFlags: FeatureFlagsObject = {
    [FEATURE_FLAGS.COMMENTS_ENABLED]: false,
    [FEATURE_FLAGS.SHOW_APPROVED_ONLY]: true,
  }

  return flags.reduce(
    (acc, flag) => ({
      ...acc,
      [flag.name]: flag.enabled,
    }),
    defaultFlags
  )
}

const updateFeatureFlag = async (name: FeatureFlagKey, enabled: boolean) => {
  return await featureFlagClient.update({
    where: { name },
    data: {
      enabled,
      updatedAt: new Date(),
    },
  })
}

export default {
  getFeatureFlags,
  updateFeatureFlag,
}
