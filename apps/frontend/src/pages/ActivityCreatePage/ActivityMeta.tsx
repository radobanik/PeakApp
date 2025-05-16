import { capitalize } from '@/lib/utils'
import { useContext } from 'react'

import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { ActivityCreateContext } from '@/App'
import { getRoute } from './useActivityCreate'

export default function ActivityMeta() {
  const { routeId } = useContext(ActivityCreateContext)
  if (!routeId) return null

  const RouteData = getRoute(routeId)

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="relative mx-auto w-fit">
        <img
          src={noBoulderPhoto}
          className="block rounded-md max-h-[30vh] max-w-[100vw] object-contain"
          alt="Route"
        />
        <div className="absolute bottom-1 left-1 text-2xl">
          {RouteData.isLoading && <div>Loading...</div>}
          {RouteData.isError && <div>Error: {RouteData.error.message}</div>}
          <p>{RouteData.data?.name}</p>
        </div>
        <div className="absolute bottom-1 right-1 flex flex-col justify-between items-center">
          <p>{RouteData.data?.grade.name.toUpperCase()}</p>
          <p>{capitalize(RouteData.data?.climbingStructureType)}</p>
        </div>
      </div>
    </div>
  )
}
