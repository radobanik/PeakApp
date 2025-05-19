import React from 'react'
import { cn } from '@/lib/utils'
import { ClimbingStructureType } from '@/types/routeTypes'

const climbingStructureStyles: Record<ClimbingStructureType, string> = {
  [ClimbingStructureType.TRAVERSE]: 'bg-green-100 text-green-800',
  [ClimbingStructureType.OVERHANG]: 'bg-blue-100 text-blue-800',
  [ClimbingStructureType.SLAB]: 'bg-purple-100 text-purple-800',
  [ClimbingStructureType.WALL]: 'bg-gray-100 text-gray-800',
}

interface RouteStructureTypeBadgeProps {
  type: ClimbingStructureType
}

export const RouteStructureTypeBadge: React.FC<RouteStructureTypeBadgeProps> = ({ type }) => {
  const badgeClass =
    climbingStructureStyles[type] ?? climbingStructureStyles[ClimbingStructureType.WALL]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeClass
      )}
    >
      {type}
    </span>
  )
}
