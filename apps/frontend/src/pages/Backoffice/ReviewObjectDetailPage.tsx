import { ROUTE } from '@/constants/routes'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getNewObjectById } from '@/services/backofficeService'
import { useParams } from 'react-router-dom'
import ApproveContainer from '@/components/backoffice/ApproveContainter'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import { useEffect, useState } from 'react'

export default function ReviewObjectDetailPage() {
  const params = useParams()
  const { approvedMap, setApprovedMap } = useApprovalContext()
  const [approveState, setApproveState] = useState<boolean | null>(
    approvedMap.get(params.id!) ?? null
  )

  useEffect(() => {
    if (params.id) {
      setApproveState(approvedMap.get(params.id) ?? null)
    }
  }, [params.id, approvedMap])

  const query = useQuery({
    queryKey: ['new_object', params.id],
    queryFn: async () => getNewObjectById(params.id || ''),
    enabled: params.id !== undefined,
  })

  const mutation = useMutation({
    mutationFn: async (approve: boolean | null) => {
      setApproveState(approve)
      setApprovedMap((prev) => {
        prev.delete(params.id!)
        return approve !== null ? new Map(prev.set(params.id!, approve)) : new Map(prev)
      })
    },
  })

  return (
    <ApproveContainer
      query={query}
      mutation={mutation}
      backRoute={ROUTE.NEW_CLIMBING_OBJECTS}
      approveState={approveState}
    />
  )
}
