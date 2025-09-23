import { useNavigate, useParams } from 'react-router-dom'
import { useClimbingObjectQuery } from '@/services/queryHooks'
import { memo, useEffect, useState } from 'react'
import RouteListTable from '@/components/RouteListTable'
import { RouteSummary } from '@/types/routeTypes'
import { ROUTE } from '@/constants/routes'
import ReportButton from '@/components/ReportButton'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { getFile } from '@/services/fileService'
import { toast } from 'sonner'

const ClimbingObjectDetailPage = () => {
  const { climbingObjectId } = useParams<{ climbingObjectId: string }>()
  const [imageUrl, setImageUrl] = useState<string>(NoBoulderPhoto)

  const navigate = useNavigate()

  if (!climbingObjectId) {
    // TODO: Add proper error handling (even though this should never happen)
    return <div>Clmbing object not found</div>
  }

  const climbingObjectDetail = useClimbingObjectQuery(climbingObjectId)

  const data = climbingObjectDetail.data

  const handleRowClick = ({ id }: RouteSummary) => {
    navigate(`${ROUTE.ROUTE}/${id}`)
  }

  useEffect(() => {
    const img = data?.image
    if (img !== null && img !== undefined) {
      getFile(img?.id)
        .then((image) => setImageUrl(image.url))
        .catch(() => toast.error('Failed to load current image'))
    }
  }, [data?.image])

  if (climbingObjectDetail.isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    )

  if (climbingObjectDetail.isError || !data)
    // TODO: Add  proper error handling - THIS CAN HAPPEN  in case of network error
    return <div className="text-center">Page couldn&apos;t be loaded, RIP BOZO L+RATIO</div>

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="w-full">
        <div className="flex items-start flex-col justify-between gap-5">
          <h1 className="text-4xl font-bold mt-10">{data.name}</h1>
          <img src={imageUrl} alt="climbing object photo" className="w-full h-full object-fill" />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl my-3">Routes available</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate(`${ROUTE.ROUTE}/new?climbingObjectId=${data.id}`)}
              className="flex items-center gap-2"
            >
              <PlusIcon size={20} />
              Add Route
            </Button>
            <ReportButton name={data.name} climbingObjectId={data.id} />
          </div>
        </div>
        <RouteListTable data={data.routes} isLoading={false} onRowClick={handleRowClick} />
      </div>
    </div>
  )
}

export default memo(ClimbingObjectDetailPage)
