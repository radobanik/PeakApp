import { RouteDetail } from '@/types/routeTypes'
import { getTextColorForBackground } from '@/lib/utils'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useReviewsQuery, useUserReviewQuery } from '@/services/queryHooks'
import { useEffect, useState } from 'react'

type RouteBaseProps = {
  route: RouteDetail
}

const RouteBase = ({ route }: RouteBaseProps) => {
  const gradeColor = route.grade.color

  // TODO: rmeove later
  const [avg, setAvg] = useState(0)
  const reviews = useReviewsQuery(route.id).data?.items || []
  const userReview = useUserReviewQuery(route.id).data

  console.log(route.starRating, 'route.starRating')

  useEffect(() => {
    console.log('userReview', userReview)
    if (reviews?.length === 0 && !userReview) {
      setAvg(0)
      return
    }

    const reviewSum =
      reviews?.reduce((acc, review) => acc + review.stars, 0) + (userReview?.stars || 0)
    const userAverage = reviewSum / (reviews.length + (userReview ? 1 : 0))
    console.log('userAverage', userAverage)
    setAvg(userAverage)
  }, [userReview, reviews])

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
          <Rating style={{ maxWidth: 140 }} value={avg} readOnly />
        </span>
        <span className="text-xl font-semibold">{route.climbingStructureType}</span>
      </div>

      <div className="mt-1 text-base">{route.description}</div>
    </div>
  )
}

export default RouteBase
