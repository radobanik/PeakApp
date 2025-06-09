import { ROUTE } from '@/constants/routes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeRouteApprovalState, getNewRouteById } from '@/services/backofficeService'
import { useParams } from 'react-router-dom'
import ApproveContainer from '@/components/backoffice/ApproveContainter'
import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'

import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import { ApprovalState } from '@/types/approvalTypes'
import { RouteDetail } from 'backend/src/model/route'
import { Button } from '@/components/ui/button'
import { getFile } from '@/services/fileService'
import { getTextColorForBackground } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useState } from 'react'
import { BLUE_POI_ICON, RED_POI_ICON } from '@/components/MapObjectsLayer'

export default function ReviewObjectDetailPage() {
  const params = useParams()
  const queryClient = useQueryClient()
  const { setApprovedMap } = useApprovalContext()

  const query = useQuery({
    queryKey: ['new_route', params.id],
    queryFn: async () => getNewRouteById(params.id!),
    enabled: params.id !== undefined,
  })

  const mutation = useMutation({
    mutationFn: async (approve: boolean) => {
      changeRouteApprovalState(
        params.id!,
        approve === true ? ApprovalState.APPROVED : ApprovalState.REJECTED
      )
      setApprovedMap((prev) => {
        prev.delete(params.id!)
        return approve !== null ? new Map(prev.set(params.id!, approve)) : new Map(prev)
      })
    },
    onSuccess: (_, approve) => {
      queryClient.setQueryData(['new_route', params.id], (old: RouteDetail) => {
        if (!old) return old
        return {
          ...old,
          approvalState: approve ? ApprovalState.APPROVED : ApprovalState.REJECTED,
        }
      })
    },
  })

  const imageQuery = useQuery({
    queryKey: ['route_image', query.data?.image?.id],
    queryFn: async () => await getFile(query.data!.image!.id),
    enabled: query.data !== undefined,
  })

  const [openLocation, setOpenLocation] = useState(false)
  const detail = query.isSuccess && (
    <div className="flex flex-col w-full h-full space-y-2 px-4">
      {/* Image */}
      {imageQuery.isSuccess && imageQuery.data ? (
        <div className="flex justify-center">
          <img
            src={imageQuery.data.url}
            alt="route photo"
            className="max-w-[300px] max-h-[200px] object-fill"
          ></img>
        </div>
      ) : (
        <img src={NoBoulderPhoto} alt="route photo" className="w-full h-full object-fill"></img>
      )}
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
      <div className="flex">
        <span className="font-semibold">Type & difficulty:</span>
        <span></span>
        <div className="flex space-x-2 items-center ml-1">
          <span>{query.data.climbingStructureType}</span>
          <Badge
            style={{
              backgroundColor: query.data.grade.color,
              color: getTextColorForBackground(query.data.grade.color),
            }}
          >
            {query.data.grade.name}
          </Badge>
        </div>
      </div>
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
                  <Marker
                    position={[
                      query.data!.climbingObject.latitude,
                      query.data!.climbingObject.longitude,
                    ]}
                    icon={BLUE_POI_ICON}
                  />
                  <Marker
                    position={[query.data!.latitude, query.data!.longitude]}
                    icon={RED_POI_ICON}
                  />
                </MapContainer>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <p className="font-semibold">Description: </p>
        <p>{query.data.description}</p>
      </div>
    </div>
  )

  return (
    <ApproveContainer
      query={query}
      mutation={mutation}
      backRoute={ROUTE.NEW_ROUTES}
      detail={detail}
      isBlocked={(query.data?.climbingObject.approvalState ?? undefined) !== ApprovalState.APPROVED}
      climbingObjectId={query.data?.climbingObject.id ?? ''}
      approveState={query.data?.approvalState ?? ApprovalState.PENDING}
    />
  )
}
