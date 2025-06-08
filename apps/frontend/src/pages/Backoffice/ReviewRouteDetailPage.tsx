import { ROUTE } from '@/constants/routes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeRouteApprovalState, getNewRouteById } from '@/services/backofficeService'
import { useParams } from 'react-router-dom'
import ApproveContainer from '@/components/backoffice/ApproveContainter'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import { ApprovalState } from '@/types/approvalTypes'
import { RouteDetail } from 'backend/src/model/route'

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
  return (
    <ApproveContainer
      query={query}
      mutation={mutation}
      backRoute={ROUTE.NEW_ROUTES}
      isBlocked={(query.data?.climbingObject.approvalState ?? undefined) !== ApprovalState.APPROVED}
      climbingObjectId={query.data?.climbingObject.id ?? ''}
      approveState={query.data?.approvalState ?? ApprovalState.PENDING}
    />
  )
}
