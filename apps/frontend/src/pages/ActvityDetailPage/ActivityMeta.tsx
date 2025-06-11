import { capitalize } from '@/lib/utils'
import { ActivityDetailContext } from '../ActivityDetailPage'
import { useContext, useEffect, useState } from 'react'

import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { PeakFile } from '@/types/fileTypes'
import { getFile } from '@/services/fileService'
import { toast } from 'sonner'

export default function ActivityMeta() {
  const { activityQuery } = useContext(ActivityDetailContext)
  const [image, setImage] = useState<PeakFile | null>(null)

  useEffect(() => {
    if (image === null && activityQuery.data?.imageId) {
      getFile(activityQuery.data.imageId)
        .then((image) => setImage(image))
        .catch(() => toast.error('Failed to load current image'))
    }
  }, [activityQuery.data?.imageId])

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="relative mx-auto w-fit">
        <img
          src={image === null ? noBoulderPhoto : image.url}
          className="block rounded-md max-h-[30vh] max-w-[90vw] object-contain"
          alt="Route"
        />
        <div className="absolute bottom-1 left-1 text-2xl bg-secondary-background/60 rounded-2xl px-4 max-w-[50%]">
          {activityQuery.isLoading && <div>Loading...</div>}
          {activityQuery.isError && <div>Error: {activityQuery.error.message}</div>}
          <p>{activityQuery.data?.routeName}</p>
        </div>
        <div className="absolute bottom-1 right-1 flex flex-col justify-between items-center bg-secondary-background/60 rounded-2xl px-4">
          <p>{activityQuery.data?.routeGrade.toUpperCase()}</p>
          <p>{capitalize(activityQuery.data?.routeType)}</p>
        </div>
      </div>
    </div>
  )
}
