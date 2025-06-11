import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { getAllRoutes } from '@/services/routeService'
import { ClimbingStructureType, RouteDetail } from '@/types/routeTypes'
import { cn, getTextColorForBackground } from '@/lib/utils'
import { TableList } from '../../components/backoffice/TableList'
import { Link, Outlet, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { CLIMBING_STRUCTURE_STYLES } from '@/constants/routeConstants'
import { X } from 'lucide-react'

const columns: ColumnDef<RouteDetail>[] = [
  { accessorKey: 'name', header: 'Name' },
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
]

export default function AllRouteList() {
  const isDetail = useMatch(ROUTE.ALL_ROUTES_DETAIL)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })
  const routesQuery = useQuery({
    queryKey: ['all_routes', pagination.pageIndex, pagination.pageSize],
    queryFn: () => getAllRoutes(pagination.pageIndex + 1, pagination.pageSize),
  })
  return (
    <div className="flex space-x-4 h-full w-full">
      <div className={cn('flex-1 min-w-0 h-full', isDetail ? 'hidden sm:flex' : '')}>
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
        <div className={cn(' flex-1 max-w-[500px] min-w-[300px] mt-4', 'sm:rounded-md sm:border')}>
          <div className="flex flex-col w-full h-full">
            <div className="flex justify-end">
              <Link to={ROUTE.ALL_ROUTES}>
                <X className="w-6 h-6 mt-2 mr-2" />
              </Link>
            </div>
            <div className="flex flex-1 w-full overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
