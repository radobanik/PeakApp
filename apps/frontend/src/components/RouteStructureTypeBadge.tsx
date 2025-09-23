import React from 'react'
import { cn } from '@/lib/utils'
import { ClimbingStructureType } from '@/types/routeTypes'
import { CLIMBING_STRUCTURE_STYLES } from '@/constants/routeConstants'

interface RouteStructureTypeBadgeProps {
  type: ClimbingStructureType
}

export const RouteStructureTypeBadge: React.FC<RouteStructureTypeBadgeProps> = ({ type }) => {
  const badgeClass =
    CLIMBING_STRUCTURE_STYLES[type] ?? CLIMBING_STRUCTURE_STYLES[ClimbingStructureType.WALL]

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
