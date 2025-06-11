import prisma from '../core/prisma/client'
import { FEATURE_FLAGS } from '../model/featureFlags'

async function initFeatureFlags() {
  const featureFlags = [
    {
      name: FEATURE_FLAGS.COMMENTS_ENABLED,
      enabled: true,
    },
    {
      name: FEATURE_FLAGS.SHOW_APPROVED_ONLY,
      enabled: false,
    },
  ]

  for (const flag of featureFlags) {
    await prisma.featureFlag.upsert({
      where: { name: flag.name },
      update: {},
      create: flag,
    })
  }
}

export default initFeatureFlags
