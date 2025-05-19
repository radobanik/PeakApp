import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { getRoutes } from '@/services/routeService'
import { ClimbingStructureType, RouteSummary } from '@/types/routeTypes'
import { cn, getTextColorForBackground } from '@/lib/utils'
import { TableList } from '../../components/backoffice/TableList'
import { Outlet, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { CLIMBING_STRUCTURE_STYLES } from '@/constants/routeConstants'

const columns: ColumnDef<RouteSummary>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'description', header: 'Description' },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => {
      const grade = row.original.grade
      return (
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: grade.color,
            color: getTextColorForBackground(grade.color),
          }}
        >
          {grade.name}
        </span>
      )
    },
  },
  {
    accessorKey: 'climbingStructureType',
    header: 'Type',
    cell: ({ row }) => {
      const structureType = row.original.climbingStructureType
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            CLIMBING_STRUCTURE_STYLES[structureType] ||
              CLIMBING_STRUCTURE_STYLES[ClimbingStructureType.WALL]
          )}
        >
          {structureType}
        </span>
      )
    },
  },
  {
    id: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const longitude = row.original.longitude.toFixed(2)
      const latitude = row.original.latitude.toFixed(2)
      return (
        <span>
          {longitude}, {latitude}
        </span>
      )
    },
  },
]

export default function AllRouteList() {
  const isDetail = useMatch(ROUTE.ALL_ROUTES_DETAIL)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })
  const routesQuery = useQuery({
    queryKey: ['all_routes', pagination.pageIndex, pagination.pageSize],
    queryFn: () => getRoutes(pagination.pageIndex + 1, pagination.pageSize),
  })
  return (
    <div className="flex justify-center space-x-4 h-full w-full">
      <div className={cn('flex-1 h-full', isDetail ? 'hidden sm:flex' : '')}>
        <TableList
          data={routesQuery.data}
          isLoading={routesQuery.isLoading}
          isError={routesQuery.isError}
          error={routesQuery.error}
          isSuccess={routesQuery.isSuccess}
          pagination={pagination}
          setPagination={setPagination}
          columnDefiniton={columns}
          parentRoute={ROUTE.ALL_ROUTES}
          noResult={<div className="text-center">No routes found</div>}
        />
      </div>
      {isDetail && (
        <div className="rounded-md border flex-1 max-w-[500px] mt-4">
          <Outlet />
        </div>
      )}
    </div>
  )
}
