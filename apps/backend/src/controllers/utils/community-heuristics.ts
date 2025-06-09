import { ClimbingStructureType } from '@prisma/client'
import { ClimbHistogram } from '../community.controller'

/**
 * Calculates the Bhattacharyya Coefficient (similarity) between two histograms.
 * It ranges from 0 (no overlap) to 1 (identical distributions).
 */
export function calculateBhattacharyyaCoefficient(
  hist1: ClimbHistogram,
  hist2: ClimbHistogram
): number {
  let bCoefficient = 0.0
  for (const typeValue of Object.values(ClimbingStructureType)) {
    const typeKey = typeValue as ClimbingStructureType
    const p_i = hist1[typeKey] || 0
    const q_i = hist2[typeKey] || 0
    bCoefficient += Math.sqrt(p_i * q_i)
  }

  return bCoefficient
}

/**
 * Creates a histogram of relative frequencies for ClimbingStructureType.
 */
export function createClimbingTypeHistogram(climbedTypes: ClimbingStructureType[]): ClimbHistogram {
  const counts = {} as ClimbHistogram
  for (const typeValue of Object.values(ClimbingStructureType)) {
    counts[typeValue as ClimbingStructureType] = 0
  }

  const totalCount = climbedTypes.length

  for (const type of climbedTypes) {
    counts[type]++
  }

  const relativeFrequencies = {} as ClimbHistogram

  if (totalCount === 0) {
    for (const key of Object.values(ClimbingStructureType)) {
      relativeFrequencies[key as ClimbingStructureType] = 0
    }
    return relativeFrequencies
  }

  for (const key of Object.values(ClimbingStructureType)) {
    const typeEnumKey = key as ClimbingStructureType
    relativeFrequencies[typeEnumKey] = counts[typeEnumKey] / totalCount
  }

  return relativeFrequencies
}
