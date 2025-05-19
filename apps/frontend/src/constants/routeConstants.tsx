import { GradeBadge } from '@/components/GradyBadge'
import { RouteStructureTypeBadge } from '@/components/RouteStructureTypeBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClimbingStructureType, RouteSummary } from '@/types/routeTypes'
import { ColumnDef } from '@tanstack/react-table'

export const CLIMBING_STRUCTURE_STYLES: Record<ClimbingStructureType, string> = {
  [ClimbingStructureType.TRAVERSE]: 'bg-green-100 text-green-800',
  [ClimbingStructureType.OVERHANG]: 'bg-blue-100 text-blue-800',
  [ClimbingStructureType.SLAB]: 'bg-purple-100 text-purple-800',
  [ClimbingStructureType.WALL]: 'bg-gray-100 text-gray-800',
}

export const ROUTE_TABLE_ID = {
  NAME: 'name',
  DESCRIPTION: 'description',
  CLIMBING_OBJECT: 'climbingObject',
  GRADE: 'grade',
  CLIMBING_STRUCTURE_TYPE: 'climbingStructureType',
  LONG_LAT: 'longLat',
  ACTIONS: 'actions',
}

export const ROUTE_TABLE_COLUMNS: ColumnDef<
  RouteSummary & { climbingObject?: { name: string } }
>[] = [
  { id: ROUTE_TABLE_ID.NAME, accessorKey: ROUTE_TABLE_ID.NAME, header: 'Name' },
  {
    id: ROUTE_TABLE_ID.DESCRIPTION,
    accessorKey: ROUTE_TABLE_ID.DESCRIPTION,
    header: 'Description',
  },
  {
    id: ROUTE_TABLE_ID.CLIMBING_OBJECT,
    header: 'Climbing Object',
    accessorFn: (row) => row.climbingObject?.name ?? 'Unknown Object',
  },
  {
    id: ROUTE_TABLE_ID.GRADE,
    accessorKey: ROUTE_TABLE_ID.GRADE,
    header: 'Grade',
    cell: ({ row }) => <GradeBadge grade={row.original.grade} />,
  },
  {
    id: ROUTE_TABLE_ID.CLIMBING_STRUCTURE_TYPE,
    accessorKey: ROUTE_TABLE_ID.CLIMBING_STRUCTURE_TYPE,
    header: 'Type',
    cell: ({ row }) => <RouteStructureTypeBadge type={row.original.climbingStructureType} />,
  },
  {
    id: ROUTE_TABLE_ID.LONG_LAT,
    header: 'Long/Lat',
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
  {
    id: ROUTE_TABLE_ID.ACTIONS,
    header: '',
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="text-lg">⋮</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem onClick={() => alert(`Edit route: ${row.original.name}`)}>
            Edit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => alert(`Delete route: ${row.original.name}`)}>
            Delete
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    meta: { className: 'w-12 text-right' },
  },
]
