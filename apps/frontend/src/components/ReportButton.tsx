import { FC, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import ReportIcon from '@/assets/ReportIcon.svg'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useQuery } from '@tanstack/react-query'
import { createReport, getUserPendingReport } from '@/services/reportService'
import LoadingSpinner from './LoadingSpinner'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  title: string
  reason: string
}

export type ReportButtonProps = {
  name: string
  climbingObjectId?: string
  routeId?: string
} & React.HTMLAttributes<HTMLButtonElement>

const ReportButton: FC<ReportButtonProps> = ({
  name,
  climbingObjectId,
  routeId,
  ...buttonProps
}: ReportButtonProps) => {
  const [isClimbingObject] = useState(climbingObjectId !== undefined)
  const pendingReportQuery = useQuery({
    queryKey: ['pending_report', climbingObjectId, routeId],
    queryFn: () => getUserPendingReport(climbingObjectId, routeId),
  })
  const [wasReported, setWasReported] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    createReport(climbingObjectId, routeId, data.title, data.reason)
      .then(() => setWasReported(true))
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" {...buttonProps}>
          <img src={ReportIcon} alt="Report" className="mr-2 w-4" />
          <span className="text-sm font-medium">Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {name}</DialogTitle>
        </DialogHeader>
        {pendingReportQuery.isLoading && (
          <div className="flex flex-1 justify-center">
            <LoadingSpinner />
          </div>
        )}
        {pendingReportQuery.isError && (
          <div className="flex flex-1 justify-center items-center">
            <span>Error: {pendingReportQuery.error?.message ?? 'Unknown error'}</span>
          </div>
        )}
        {pendingReportQuery.isSuccess && !pendingReportQuery.data && !wasReported && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5">
              <div>
                <Label htmlFor="title" className="text-right mb-2">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  className=""
                  maxLength={50}
                  {...register('title', { required: true, maxLength: 50 })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {`'Title'`} is required. Can not be more than 50 characters long
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="reason" className="text-right mb-2">
                  <p>
                    Reason <span className="text-red-500">*</span>
                  </p>
                </Label>
                <Textarea
                  id="reason"
                  className="h-30"
                  maxLength={500}
                  {...register('reason', { required: true, maxLength: 500 })}
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">
                    {`'Reason'`} in required. Can not be more than 500 characters long
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Report</Button>
              </DialogFooter>
            </div>
          </form>
        )}
        {pendingReportQuery.isSuccess && pendingReportQuery.data && !wasReported && (
          <div className="flex flex-1 flex-col">
            <p>
              You already have a pending report for this{' '}
              {isClimbingObject ? 'climbing object' : 'route'}.
              <br />
              <br />
              We will review it as soon as possible.
            </p>
          </div>
        )}
        {wasReported && (
          <div className="flex flex-1 flex-col">
            <p className="text-green-500">Report was submitted successfully.</p>
            <p className="text-sm">
              <br />
              Thank you for helping us keep <span className="font-semibold">PeakApp</span> safe and
              accurate. We will give you feedback as soon as possible.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReportButton
