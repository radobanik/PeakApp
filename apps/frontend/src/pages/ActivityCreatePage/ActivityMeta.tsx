import { capitalize } from '@/lib/utils'
import { useContext, useEffect, useState } from 'react'

import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { ActivityCreateContext } from '@/App'
import { useRouteQuery } from '@/services/queryHooks'
import { PeakFile } from '@/types/fileTypes'
import { getFile } from '@/services/fileService'
import { toast } from 'sonner'

export default function ActivityMeta() {
  const { routeId } = useContext(ActivityCreateContext)
  const [image, setImage] = useState<PeakFile | null>(null)
  if (!routeId) return null

  const RouteData = useRouteQuery(routeId)

  useEffect(() => {
    if (image === null && RouteData.data?.image?.id) {
      getFile(RouteData.data.image.id)
        .then((image) => setImage(image))
        .catch(() => toast.error('Failed to load current image'))
    }
  }, [RouteData.data?.image?.id])

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="relative mx-auto w-fit">
        <img
          src={image === null ? noBoulderPhoto : image.url}
          className="block rounded-md max-h-[30vh] max-w-[100vw] object-contain"
          alt="Route"
        />
        <div className="absolute bottom-1 left-1 text-2xl bg-white/60 rounded-2xl px-4">
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
