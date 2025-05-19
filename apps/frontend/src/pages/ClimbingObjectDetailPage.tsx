import { useNavigate, useParams } from 'react-router-dom'
import { useClimbingObjectQuery } from '@/services/queryHooks'
import { memo } from 'react'
import RouteListTable from '@/components/RouteListTable'
import { RouteSummary } from '@/types/routeTypes'
import { ROUTE } from '@/constants/routes'
import ReportButton from '@/components/ReportButton'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const ClimbingObjectDetailPage = () => {
  const { climbingObjectId } = useParams<{ climbingObjectId: string }>()

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
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-100 px-5 mt-10">{data.name}</h1>
        </div>
        <div className="flex justify-between"></div>
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
