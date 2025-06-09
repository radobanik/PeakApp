import { CreateClimbingObjectDialog } from '@/components/dialog/CreateClimbingObjectDialog'
import LMap from '@/components/LMap'
import RouteListTable from '@/components/RouteListTable'
import { ROUTE } from '@/constants/routes'
import { getClimbingObjectDetail } from '@/services/climbingObjectService'
import { ClimbingObjectDetail, FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { RouteSummary } from '@/types/routeTypes'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const TABLE_ENTRIES_LIMIT = 5

export default function HomePage() {
  const [climbingObjectId, setClimbingObjectId] = useState<string | null>(null)
  const [climbingObjectDetail, setClimbingObjectDetail] = useState<ClimbingObjectDetail | null>(
    null
  )
  const [filters, setFilters] = useState<FilterClimbingObjectListParams | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPoiCreationOpen, setIsPoiCreationOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const tableData = (climbingObjectDetail?.routes ?? []).slice(0, TABLE_ENTRIES_LIMIT)

  const handleRowClick = ({ id }: RouteSummary) => {
    setClimbingObjectId(null)
    setClimbingObjectDetail(null)
    navigate(`${ROUTE.ROUTE}/${id}`)
  }

  const handleBottomSheetExpansion = () => {
    setClimbingObjectDetail(null)
    const id = climbingObjectId
    setClimbingObjectId(null)
    navigate(`${ROUTE.CLIMBING_OBJECT}/${id}`)
  }

  useEffect(() => {
    setClimbingObjectId(null)
    window.scrollTo(0, 0)
  }, [isPoiCreationOpen])

  useEffect(() => {
    if (climbingObjectId === null) {
      return
    }

    const fetchDetail = async () => {
      setIsLoading(true)
      try {
        const detail = await getClimbingObjectDetail(climbingObjectId, filters)

        setClimbingObjectDetail(detail)
      } catch (error) {
        let message = 'Could not load the climbing object'
        if (error instanceof Error) {
          message = error.message || message
        }

        toast.error(message, { id: `load-${climbingObjectId}-e` })
        setClimbingObjectDetail(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [climbingObjectId])

  return (
    <div className="h-full w-full" test-id="homepage">
      <CreateClimbingObjectDialog isOpen={isPoiCreationOpen} setIsOpen={setIsPoiCreationOpen} />
      <LMap
        setClimbingObjectId={setClimbingObjectId}
        routes={climbingObjectDetail?.routes ?? null}
        filters={filters}
        setFilters={setFilters}
        setIsPoiCreationOpen={setIsPoiCreationOpen}
      />
      <div
        className={clsx(
          'absolute z-2000 w-full h-90 flex flex-col items-center rounded-t-4xl overflow-hidden bottom-0 bg-background',
          'transition-transform duration-400 ease-in-out',
          climbingObjectId ? 'translate-y-0' : 'translate-y-[100%]'
        )}
      >
        <div className="flex flex-col h-full w-full items-center">
          <div
            className="w-full h-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
            onClick={handleBottomSheetExpansion}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="w-[90%]">
            <h3 className="font-bold text-2xl my-3">{climbingObjectDetail?.name}</h3>
            <RouteListTable data={tableData} isLoading={isLoading} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
