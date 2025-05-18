import { cn } from '@/lib/utils'
import { FC } from 'react'

export type ApproveProps = {
  onAccept: () => void
  onReject: () => void
  onCancel: () => void
  approveState: boolean | null
}
const Approve: FC<ApproveProps> = ({
  onAccept,
  onReject,
  onCancel,
  approveState,
}: ApproveProps) => {
  return (
    <div className="flex flex-row text-white h-10 text-xl">
      {approveState === null && (
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
      {approveState !== null && (
        <>
          <div
            className={cn(
              'flex justify-center items-center flex-1 h-full hover:cursor-pointer rounded-md',
              approveState ? 'bg-green-400 hover:bg-green-300' : 'bg-red-400 hover:bg-red-300'
            )}
            onClick={onCancel}
          >
            {approveState ? <span>Cancel approval</span> : <span>Cancel rejection</span>}
          </div>
        </>
      )}
    </div>
  )
}

export default Approve
