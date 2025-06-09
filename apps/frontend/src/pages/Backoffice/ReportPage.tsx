import { createContext, useCallback, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ReportList } from '@/../backend/src/model/report'
import { ReportStatus } from '@/types/reportTypes'
import { cn } from '@/lib/utils'
import { TableList } from '../../components/backoffice/TableList'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { Badge } from '@/components/ui/badge'
import { getReports } from '@/services/reportService'
import TableListColumnFilter from '@/components/TableListColumnFilter'

export type ReportListContextType = {
  refresh: () => void
}
export const ReportPageContext = createContext<ReportListContextType | null>(null)

export default function ReportPage() {
  const isReportDetail = useMatch(ROUTE.REPORTS_DETAIL)
  const isReportClimbingObject = useMatch(ROUTE.REPORTS_DETAIL_CLIMBING_OBJECT)
  const isReportRoute = useMatch(ROUTE.REPORTS_DETAIL_ROUTE)
  const isDetail = isReportDetail || isReportClimbingObject || isReportRoute

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })
  const [reportStatuses, setReportStatuses] = useState<ReportStatus[]>([ReportStatus.PENDING])
  const columns: ColumnDef<ReportList>[] = useMemo(
    () => [
      { accessorKey: 'title', header: 'Title' },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt)
          return (
            <span>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          )
        },
      },
      {
        id: 'reportStatus',
        header: () => (
          <TableListColumnFilter
            columnName="Status"
            options={[
              { label: 'Pending', value: ReportStatus.PENDING },
              { label: 'Resolved', value: ReportStatus.RESOLVED },
            ]}
            setFilterValues={setReportStatuses}
            filterValues={reportStatuses}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.reportStatus
          return (
            <Badge
              variant="outline"
              className={cn(
                'w-15',
                status === ReportStatus.RESOLVED ? 'bg-green-300' : 'bg-yellow-300'
              )}
            >
              {status === ReportStatus.RESOLVED ? 'Resolved' : 'Pending'}
            </Badge>
          )
        },
      },
      {
        id: 'resolvedAt',
        header: 'Resolved At',
        cell: ({ row }) => {
          const date = row.original.resolvedAt ? new Date(row.original.resolvedAt) : null
          return (
            <span>
              {date?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              }) ?? '---'}
            </span>
          )
        },
      },
    ],
    [reportStatuses]
  )
  const reportsQuery = useQuery({
    queryKey: ['all_reports', pagination.pageIndex, pagination.pageSize, reportStatuses],
    queryFn: () => getReports(pagination.pageIndex + 1, pagination.pageSize, reportStatuses),
  })

  const queryClient = useQueryClient()

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['all_reports'] })
    reportsQuery.refetch()
  }, [queryClient, reportsQuery])

  return (
    <ReportPageContext.Provider value={{ refresh }}>
      <div className="flex justify-center space-x-4 h-full w-full min-h-[400px] overflow-auto">
        <div className={cn('flex-1 h-full', isDetail ? 'hidden sm:flex' : '')}>
          <TableList
            data={reportsQuery.data}
            isLoading={reportsQuery.isLoading}
            isError={reportsQuery.isError}
            error={reportsQuery.error}
            isSuccess={reportsQuery.isSuccess}
            pagination={pagination}
            setPagination={setPagination}
            columnDefiniton={columns}
            parentRoute={ROUTE.REPORTS}
            noResult={<div className="text-center">No reports found</div>}
          />
        </div>
        {isDetail && (
          <div className="rounded-md border flex-1 max-w-[500px] min-w-[300px] mt-4">
            <Outlet />
          </div>
        )}
      </div>
    </ReportPageContext.Provider>
  )
}
