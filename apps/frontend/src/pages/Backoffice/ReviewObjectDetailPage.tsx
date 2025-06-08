import { ROUTE } from '@/constants/routes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeClimbingObjectApprovalState, getNewObjectById } from '@/services/backofficeService'
import { useParams } from 'react-router-dom'
import ApproveContainer from '@/components/backoffice/ApproveContainter'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import { ApprovalState } from '@/types/approvalTypes'
import { RouteDetail } from '@/types/routeTypes'

export default function ReviewObjectDetailPage() {
  const params = useParams()
  const queryClient = useQueryClient()
  const { setApprovedMap } = useApprovalContext()

  const query = useQuery({
    queryKey: ['new_object', params.id],
    queryFn: async () => getNewObjectById(params.id || ''),
    enabled: params.id !== undefined,
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

  return (
    <ApproveContainer
      query={query}
      mutation={mutation}
      backRoute={ROUTE.NEW_CLIMBING_OBJECTS}
      approveState={query.data?.approvalState ?? ApprovalState.PENDING}
    />
  )
}
