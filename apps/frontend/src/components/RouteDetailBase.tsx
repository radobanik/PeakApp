import { RouteDetail } from '@/types/routeTypes'
import { getTextColorForBackground } from '@/lib/utils'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useReviewsQuery, useUserReviewQuery } from '@/services/queryHooks'
import { useEffect, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

type RouteBaseProps = {
  route: RouteDetail
}

const RouteBase = ({ route }: RouteBaseProps) => {
  const gradeColor = route.grade.color
  const userGradeColor = route.userGradeRating.color
  const [showUserReview, setShowUserReview] = useState<boolean>(false)
  const reviews = useReviewsQuery(route.id)
  const meReview = useUserReviewQuery(route.id)
  const queryClient = new QueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['review', route.id] })
    if (reviews.data) {
      const reviewCount = (meReview.data ? 1 : 0) + reviews.data.items.length
      setShowUserReview(reviewCount > 0)
    }
  }, [reviews.data, meReview.data, route])

  return (
    <div className="w-full overflow-hidden">
      <div className="grid grid-flow-col gap-2 text-lg font-semibold">
        <div className="col-start-1">
          <h1 className="text-2xl font-bold">{route.name}</h1>
          <span className="text-xl font-semibold">{route.climbingStructureType}</span>
        </div>
        <div className="col-start-1">
          <Rating style={{ maxWidth: 140 }} value={route.averageStar} readOnly />
        </div>
        <div className="col-start-2 row-span-2 flex flex-row items-center justify-end pr-5 ">
          <div className="flex flex-col items-center pr-5">
            <h1>Author</h1>
            <span
              className="text-xl font-semibold px-2 py-1 rounded "
              style={{
                backgroundColor: gradeColor,
                color: getTextColorForBackground(gradeColor),
              }}
            >
              {route.grade.name}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <h1>Users</h1>
            {showUserReview ? (
              <span
                className="text-xl font-semibold px-2 py-1 rounded"
                style={{
                  backgroundColor: userGradeColor,
                  color: getTextColorForBackground(userGradeColor),
                }}
              >
                {route.userGradeRating.name}
              </span>
            ) : (
              <span className="text-xl font-semibold px-2 py-1 rounded">-</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1 text-base">{route.description}</div>
    </div>
  )
}

export default RouteBase
