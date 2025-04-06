import { ClimbingStructureType } from '@/types/routeTypes'
import { FC } from 'react'
import { getTextColorForBackground } from '@/lib/utils'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export interface RouteDetailBaseProps {
  id: string
  name: string
  description: string
  grade: {
    name: string
    color: string
  }
  climbingStructureType: ClimbingStructureType
  rating: number
}

const RouteBase: FC<RouteDetailBaseProps> = (route: RouteDetailBaseProps) => {
  const gradeColor = route.grade.color

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{route.name}</h1>
        <span
          className="text-xl font-semibold px-2 py-1 rounded"
          style={{ backgroundColor: gradeColor, color: getTextColorForBackground(gradeColor) }}
        >
          {route.grade.name}
        </span>
      </div>
      <div className="flex justify-between">
        <span>
          <Rating style={{ maxWidth: 140 }} value={route.rating} readOnly />
        </span>
        <span className="text-xl font-semibold">{route.climbingStructureType}</span>
      </div>

      <div className="mt-1 text-base">{route.description}</div>
    </div>
  )
}

export default RouteBase
