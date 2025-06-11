import featureFlagsRepository from '../repositories/featureFlags.repository'
import { FeatureFlagsObject } from '../model/featureFlags'

let cachedFlags: FeatureFlagsObject | null = null
const CACHE_DURATION = 5000 // 5 seconds

async function getFeatureFlags(): Promise<FeatureFlagsObject> {
  if (!cachedFlags) {
    cachedFlags = await featureFlagsRepository.getFeatureFlags()
    setTimeout(() => {
      cachedFlags = null
    }, CACHE_DURATION)
  }
  return cachedFlags
}

export { getFeatureFlags }
