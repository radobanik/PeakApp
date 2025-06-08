import { RouteDetail } from '@/types/routeTypes'
import { getTextColorForBackground } from '@/lib/utils'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type RouteBaseProps = {
  route: RouteDetail
}

const RouteBase = ({ route }: RouteBaseProps) => {
  const gradeColor = route.grade.color
  const userGradeColor = route.userGradeRating.color

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between text-lg font-semibold">
        <h1 className="text-2xl font-bold">{route.name}</h1>
        <div className="flex items-center gap-2">
          <h1>Official: </h1>
          <span
            className="text-xl font-semibold px-2 py-1 rounded "
            style={{ backgroundColor: gradeColor, color: getTextColorForBackground(gradeColor) }}
          >
            {route.grade.name}
          </span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <Rating style={{ maxWidth: 140 }} value={route.averageStar} readOnly />
        <div className="flex items-center gap-2">
          <h1>Users:</h1>
          <span
            className="text-xl font-semibold px-2 py-1 rounded"
            style={{
              backgroundColor: userGradeColor,
              color: getTextColorForBackground(userGradeColor),
            }}
          >
            {route.userGradeRating.name}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-end mt-2">
        <span className="text-xl font-semibold">{route.climbingStructureType}</span>
      </div>

      <div className="mt-1 text-base">{route.description}</div>
    </div>
  )
}

export default RouteBase
