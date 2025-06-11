import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import featureFlagsRepository from '../repositories/featureFlags.repository'
import { FEATURE_FLAGS, FeatureFlagKey } from '../model/featureFlags'

const getFeatureFlags = async (req: Request, res: Response) => {
  const flags = await featureFlagsRepository.getFeatureFlags()
  res.status(HTTP_STATUS.OK_200).json(flags)
}

const updateFeatureFlag = async (req: Request, res: Response) => {
  const name = req.params.name
  const { enabled } = req.body

  if (
    !name ||
    typeof enabled !== 'boolean' ||
    !Object.values(FEATURE_FLAGS).includes(name as FeatureFlagKey)
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({
      error: 'Invalid input',
      validFlags: Object.values(FEATURE_FLAGS),
    })
    return
  }

  const updatedFlag = await featureFlagsRepository.updateFeatureFlag(
    name as FeatureFlagKey,
    enabled
  )
  res.status(HTTP_STATUS.OK_200).json(updatedFlag)
}

export default {
  getFeatureFlags,
  updateFeatureFlag,
}
