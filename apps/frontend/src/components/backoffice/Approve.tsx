import { ROUTE } from '@/constants/routes'
import { ApprovalState } from '@/types/approvalTypes'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export type ApproveProps = {
  onAccept: () => void
  onReject: () => void
  isBlocked: boolean
  climbingObjectId: string
  approveState: ApprovalState
}
const Approve: FC<ApproveProps> = ({
  onAccept,
  onReject,
  isBlocked,
  climbingObjectId,
  approveState,
}: ApproveProps) => {
  console.log('Approve component rendered with state:', approveState)
  return (
    <div className="flex flex-row text-white h-10 text-xl">
      {approveState === ApprovalState.PENDING && !isBlocked && (
        <>
          <div
            className="flex justify-center items-center flex-1 h-full bg-green-400 hover:bg-green-300 hover:cursor-pointer rounded-l-md"
            onClick={onAccept}
          >
            <span>Approve</span>
          </div>
          <div
            className="flex justify-center items-center flex-1 h-full bg-red-400 hover:bg-red-300 hover:cursor-pointer rounded-r-md"
            onClick={onReject}
          >
            Reject
          </div>
        </>
      )}
      {approveState === ApprovalState.PENDING && isBlocked && (
        <div className="flex justify-center items-center flex-1 h-full bg-gray-400 rounded-md">
          <Link to={`${ROUTE.NEW_CLIMBING_OBJECTS}/${climbingObjectId}`}>
            <span>Blocked by climbing object</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Approve
