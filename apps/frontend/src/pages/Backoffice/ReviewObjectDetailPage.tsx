import { ROUTE } from '@/constants/routes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeClimbingObjectApprovalState, getNewObjectById } from '@/services/backofficeService'
import { Link, useParams } from 'react-router-dom'
import ApproveContainer from '@/components/backoffice/ApproveContainter'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import { ApprovalState } from '@/types/approvalTypes'
import { RouteDetail } from '@/types/routeTypes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { INITIAL_FILTERS } from '@/components/filter/MapFilterDialog'
import { getFilteredClimbingObject } from '@/services/climbingObjectService'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

export default function ReviewObjectDetailPage() {
  const params = useParams()
  const queryClient = useQueryClient()
  const { setApprovedMap } = useApprovalContext()

  const query = useQuery({
    queryKey: ['new_object', params.id],
    queryFn: async () => getNewObjectById(params.id || ''),
    enabled: params.id !== undefined,
  })

  const queryNearbyApproved = useQuery({
    queryKey: ['new_object_nearby', params.id],
    queryFn: async () => {
      const filter = INITIAL_FILTERS
      const locationFilter = {
        latitudeFrom: query.data!.latitude - 0.0009, // ~100m latitude
        latitudeTo: query.data!.latitude + 0.0009,
        longitudeFrom: query.data!.longitude - 0.0013, // ~100m longitude
        longitudeTo: query.data!.longitude + 0.0013,
      }
      const data = await getFilteredClimbingObject({
        ...filter,
        ...locationFilter,
      } as FilterClimbingObjectListParams)
      return data
    },
    enabled: params.id !== undefined && query.data !== undefined,
  })

  const mutation = useMutation({
    mutationFn: async (approve: boolean) => {
      changeClimbingObjectApprovalState(
        params.id!,
        approve === true ? ApprovalState.APPROVED : ApprovalState.REJECTED
      )
      setApprovedMap((prev) => {
        prev.delete(params.id!)
        return approve !== null ? new Map(prev.set(params.id!, approve)) : new Map(prev)
      })
    },
    onSuccess: (_, approve) => {
      queryClient.setQueryData(['new_object', params.id], (old: RouteDetail) => {
        if (!old) return old
        return {
          ...old,
          approvalState: approve ? ApprovalState.APPROVED : ApprovalState.REJECTED,
        }
      })
    },
  })

  const [openLocation, setOpenLocation] = useState(false)
  const detail = query.data ? (
    <div className="w-full h-full flex flex-col space-y-2">
      <p>
        <span className="font-semibold">Created by: </span>
        <span>
          {query.data?.createdBy.firstName} {query.data?.createdBy.lastName}
        </span>
      </p>
      <p>
        <span className="font-semibold">Created at: </span>
        <span>{query.data ? new Date(query.data.createdAt).toLocaleDateString() : '-'}</span>
      </p>
      <div>
        <span className="font-semibold">Location: </span>
        <div className="px-5 flex flex-col space-y-2">
          <Dialog open={openLocation} onOpenChange={(isOpen) => setOpenLocation(isOpen)}>
            <DialogTrigger asChild>
              <Button variant="outline">Verify on PeakApp map</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[300px] p-5">
              <DialogHeader>
                <DialogTitle>Climbing object location</DialogTitle>
              </DialogHeader>
              <div>
                <MapContainer
                  center={[query.data!.latitude, query.data!.longitude]}
                  zoom={15}
                  className="w-full h-100"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[query.data!.latitude, query.data!.longitude]} />
                </MapContainer>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <a
              href={`https://www.google.com/maps/place/${query.data?.latitude},${query.data?.longitude}`}
            >
              Verify on Google maps
            </a>
          </Button>
        </div>
      </div>
      <div>
        <p className="font-semibold">Nearby approved objects:</p>
        {queryNearbyApproved.isSuccess && queryNearbyApproved.data.total == 0 && (
          <p className="text-sm text-gray-500 text-center px-5">
            No nearby approved climbing objects found
          </p>
        )}
        {queryNearbyApproved.isSuccess &&
          queryNearbyApproved.data.total > 0 &&
          queryNearbyApproved.data.items.map((item) => (
            <div key={item.id} className="mx-2 my-1 bg-gray-100 rounded-md p-2">
              <Link to={`${ROUTE.CLIMBING_OBJECT}/${item.id}`}>
                <div className="">{item.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <></>
  )
  return (
    <ApproveContainer
      query={query}
      mutation={mutation}
      detail={detail}
      backRoute={ROUTE.NEW_CLIMBING_OBJECTS}
      isBlocked={false}
      climbingObjectId=""
      approveState={query.data?.approvalState ?? ApprovalState.PENDING}
    />
  )
}
