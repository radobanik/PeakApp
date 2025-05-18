import { useContext, useState } from 'react'
import { ReportPageContext } from './ReportPage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getReportById } from '@/services/reportService'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Separator } from '@/components/ui/separator'
import ReportResolveDialog from '@/components/backoffice/ReportResolveDialog'
import { Button } from '@/components/ui/button'

export default function ReportDetailPage() {
  const context = useContext(ReportPageContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const params = useParams()

  const reportDetailQuery = useQuery({
    queryKey: ['report_detail', params.id],
    queryFn: () => getReportById(params.id!),
    enabled: params.id !== undefined,
  })

  const update = () => {
    context?.refresh()
    reportDetailQuery.refetch()
  }

  return (
    <div className="flex flex-col w-full h-full p-2">
      {reportDetailQuery.isLoading && (
        <div className="flex flex-1 justify-center">
          <LoadingSpinner />
        </div>
      )}
      {reportDetailQuery.isError && (
        <div className="flex flex-1 justify-center items-center">
          <span>Error: {reportDetailQuery.error?.message ?? 'Unknown error'}</span>
        </div>
      )}
      {reportDetailQuery.isSuccess && (
        <>
          <div className="flex flex-col flex-1 w-full overflow-auto">
            <div>Data goes here</div>
          </div>
          <Separator />
          <div className="flex-col w-full">
            <p className="text-md font-semibold whitespace-nowrap overflow-x-hidden text-ellipsis">
              {reportDetailQuery.data.title}
            </p>
            <div className="w-full max-h-25 overflow-y-auto text-sm mb-2">
              {reportDetailQuery.data?.reason}
            </div>
            {reportDetailQuery.data?.resolvedAt === null && (
              <Button onClick={() => setIsDialogOpen(true)}>Resolve</Button>
            )}
            {reportDetailQuery.data?.resolvedAt !== null && (
              <div className="flex flex-col">
                <p className="text-md font-semibold whitespace-nowrap overflow-x-hidden text-ellipsis">
                  Resolved At
                </p>
                <div className="w-full max-h-25 overflow-y-auto text-sm mb-2">
                  {new Date(reportDetailQuery.data.resolvedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <ReportResolveDialog
        key={params.id}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        reportId={params.id!}
        onResolve={async () => {
          update()
        }}
      />
    </div>
  )
}
