import { capitalize } from '@/lib/utils'
import { ActivityDetailContext } from '../ActivityDetailPage'
import { useContext } from 'react'

import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'

export default function ActivityMeta() {
  const { activityQuery } = useContext(ActivityDetailContext)

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="relative mx-auto w-fit">
        <img
          src={noBoulderPhoto}
          className="block rounded-md max-h-[30vh] max-w-[100vw] object-contain"
          alt="Route"
        />
        <div className="absolute bottom-1 left-1 text-2xl">
          {activityQuery.isLoading && <div>Loading...</div>}
          {activityQuery.isError && <div>Error: {activityQuery.error.message}</div>}
          <p>{activityQuery.data?.routeName}</p>
        </div>
        <div className="absolute bottom-1 right-1 flex flex-col justify-between items-center">
          <p>{activityQuery.data?.routeGrade.toUpperCase()}</p>
          <p>{capitalize(activityQuery.data?.routeType)}</p>
        </div>
      </div>
    </div>
  )
}
