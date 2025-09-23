import { describe, it, expect } from 'vitest'
import {
  calculateBhattacharyyaCoefficient,
  createClimbingTypeHistogram,
} from '../controllers/utils/community-heuristics'
import { ClimbingStructureType } from '@prisma/client'

describe('Community Heuristics Utilities', () => {
  // --- Tests for createClimbingTypeHistogram ---
  describe('createClimbingTypeHistogram', () => {
    it('should calculate correct relative frequencies with new types', () => {
      const types: ClimbingStructureType[] = ['WALL', 'WALL', 'OVERHANG', 'SLAB']
      const result = createClimbingTypeHistogram(types)
      expect(result).toEqual({
        WALL: 0.5, // 2 out of 4
        OVERHANG: 0.25, // 1 out of 4
        SLAB: 0.25, // 1 out of 4
        TRAVERSE: 0,
      })
    })
  })

  // --- Tests for calculateBhattacharyyaCoefficient ---
  describe('calculateBhattacharyyaCoefficient', () => {
    it('should return 1 for identical histograms with new types', () => {
      const hist1 = { WALL: 0.5, OVERHANG: 0.5, SLAB: 0, TRAVERSE: 0 }
      const hist2 = { WALL: 0.5, OVERHANG: 0.5, SLAB: 0, TRAVERSE: 0 }
      expect(calculateBhattacharyyaCoefficient(hist1, hist2)).toBeCloseTo(1)
    })

    it('should return 0 for completely different histograms with new types', () => {
      const hist1 = { WALL: 1, OVERHANG: 0, SLAB: 0, TRAVERSE: 0 }
      const hist2 = { WALL: 0, OVERHANG: 1, SLAB: 0, TRAVERSE: 0 }
      expect(calculateBhattacharyyaCoefficient(hist1, hist2)).toBeCloseTo(0)
    })
  })
})
