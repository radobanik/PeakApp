import BackButton from '@/components/BackButton'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import Approve from '@/components/backoffice/Approve'
import { Badge } from '../ui/badge'

type ApproveContainerProps<E> = {
  query: UseQueryResult<E, Error>
  mutation: UseMutationResult<void, Error, boolean | null, unknown>
  backRoute: string
  approveState: boolean | null
}
const ApproveContainer = <E extends { name: string }>({
  query,
  mutation,
  backRoute,
  approveState = null,
}: ApproveContainerProps<E>) => {
  return (
    <div className="flex flex-col w-full h-full min-w-[300px]">
      <div className="flex items-center space-x-2 text-2xl mb-2">
        <BackButton backRoute={backRoute} />
        {query.isSuccess && <span>{query.data.name}</span>}
        <div className="flex-1" />
        {approveState === true && (
          <Badge className="text-sm font-bold bg-green-500">Approved</Badge>
        )}
        {approveState === false && <Badge className="text-sm font-bold bg-red-500">Rejected</Badge>}
      </div>
      {query.isLoading && (
        <div className="flex flex-1 justify-center">
          <LoadingSpinner />
        </div>
      )}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-col flex-1 mb-5 overflow-auto">Data goes here</div>
          <Approve
            onAccept={() => mutation.mutate(true)}
            onReject={() => mutation.mutate(false)}
            onCancel={() => mutation.mutate(null)}
            approveState={approveState}
          />
        </div>
      )}
    </div>
  )
}
export default ApproveContainer
