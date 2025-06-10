import RouteDetailBase from './RouteDetailBase'
import { PeakFile } from '@/types/fileTypes'
import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { Button } from './ui/button'
import { RouteDetail } from '@/types/routeTypes'
import RouteReviews from './review/RouteReviews'
import { useContext, useEffect, useState } from 'react'
import { ActivityCreateContext } from '@/App'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import ReportButton from './ReportButton'
import { getFile } from '@/services/fileService'

type RouteDetailWithCommentsProps = {
  routeData: RouteDetail
}

export const RouteDetailWithComments = ({ routeData }: RouteDetailWithCommentsProps) => {
  const [image, setImage] = useState<PeakFile | null>(null)
  const { setRouteId } = useContext(ActivityCreateContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchImage = async () => {
      if (routeData.image?.id) {
        try {
          const imageFile = await getFile(routeData.image.id)
          setImage(imageFile)
        } catch (error) {
          console.error('Failed to fetch image:', error)
        }
      }
    }
    fetchImage()
  }, [routeData.image?.id])

  const imageUrl = image?.url ?? NoBoulderPhoto

  const handleAddToDiaryClick = () => {
    setRouteId(routeData.id)
    navigate(ROUTE.ACTIVITIES_NEW)
  }

  return (
    <div className="flex flex-col w-full h-full px-4">
      {/* Image */}
      <img src={imageUrl} alt="route photo" className="w-full h-full object-fill"></img>

      <div className="mx-2 my-2 space-y-2">
        {/* Route details */}
        <RouteDetailBase route={routeData} />

        {/* Buttons */}
        <div className="flex justify-between">
          {/* <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 128 128"
              stroke="currentColor"
              strokeWidth={5}
            >
              <path d="M23.67,114.59c1.74,0.78,3.57,1.17,5.37,1.17c3.1,0,6.14-1.13,8.59-3.31l21.71-19.3c2.65-2.36,6.65-2.36,9.3,0l21.71,19.3 c3.88,3.45,9.23,4.27,13.96,2.14c4.73-2.13,7.67-6.67,7.67-11.86V24c0-7.17-5.83-13-13-13H29c-7.17,0-13,5.83-13,13v78.73 C16,107.92,18.94,112.47,23.67,114.59z M22,24c0-3.86,3.14-7,7-7h70c3.86,0,7,3.14,7,7v78.73c0,2.84-1.54,5.22-4.13,6.39 c-2.59,1.16-5.4,0.73-7.52-1.15l-21.71-19.3c-2.46-2.19-5.55-3.28-8.64-3.28s-6.17,1.09-8.64,3.28l-21.71,19.3 c-2.12,1.88-4.93,2.32-7.52,1.15c-2.59-1.16-4.13-3.55-4.13-6.39V24z"></path>
            </svg>
            Save
          </Button>
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={5}
            >
              <path d="M 84 11 C 82.3 11 81 12.3 81 14 C 81 15.7 82.3 17 84 17 L 106.80078 17 L 60.400391 63.400391 C 59.200391 64.600391 59.200391 66.499609 60.400391 67.599609 C 61.000391 68.199609 61.8 68.5 62.5 68.5 C 63.2 68.5 63.999609 68.199609 64.599609 67.599609 L 111 21.199219 L 111 44 C 111 45.7 112.3 47 114 47 C 115.7 47 117 45.7 117 44 L 117 14 C 117 12.3 115.7 11 114 11 L 84 11 z M 24 31 C 16.8 31 11 36.8 11 44 L 11 104 C 11 111.2 16.8 117 24 117 L 84 117 C 91.2 117 97 111.2 97 104 L 97 59 C 97 57.3 95.7 56 94 56 C 92.3 56 91 57.3 91 59 L 91 104 C 91 107.9 87.9 111 84 111 L 24 111 C 20.1 111 17 107.9 17 104 L 17 44 C 17 40.1 20.1 37 24 37 L 69 37 C 70.7 37 72 35.7 72 34 C 72 32.3 70.7 31 69 31 L 24 31 z"></path>
            </svg>
            Open on map
          </Button> */}
          <Button variant="default" onClick={handleAddToDiaryClick} test-id="add-to-diary">
            Add to diary
          </Button>
        </div>

        {/* Reviews */}
        <RouteReviews routeId={routeData.id} showCurrentUserReview={true} />
        <ReportButton name={routeData.name} routeId={routeData.id} />
      </div>
    </div>
  )
}
