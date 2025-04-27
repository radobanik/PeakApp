import { useEffect, useState } from 'react'
import { getRoutes } from '@/services/routeService'
import { RouteDetail } from '@/types/routeTypes'
import { ClimbingStructureType } from '@/types/routeTypes'
import { toast } from 'sonner'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // interface ColumnMeta<TData, TValue> {
  //   className?: string
  // }
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import chroma from 'chroma-js'
import { useContext } from 'react'
import { ViewportContext } from '@/App'

const climbingStructureStyles: Record<ClimbingStructureType, string> = {
  [ClimbingStructureType.TRAVERSE]: 'bg-green-100 text-green-800',
  [ClimbingStructureType.OVERHANG]: 'bg-blue-100 text-blue-800',
  [ClimbingStructureType.SLAB]: 'bg-purple-100 text-purple-800',
  [ClimbingStructureType.WALL]: 'bg-gray-100 text-gray-800',
}

function getTextColorForBackground(bgColor: string): string {
  const luminance = chroma(bgColor).luminance()
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

const columns: ColumnDef<RouteDetail>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'description', header: 'Description' },
  {
    accessorFn: (row) => row.climbingObject?.name ?? 'Unknown Object',
    id: 'climbingObject',
    header: 'Climbing Object',
  },
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
            climbingStructureStyles[structureType] ||
              climbingStructureStyles[ClimbingStructureType.WALL]
          )}
        >
          {structureType}
        </span>
      )
    },
  },
  {
    id: 'longLat',
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
    id: 'actions',
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

export default function RouteList() {
  const [data, setData] = useState<RouteDetail[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const { isMobile } = useContext(ViewportContext)

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnVisibility,
      pagination,
    },
    meta: {
      className: '',
    },
  })

  useEffect(() => {
    async function fetchRoutes() {
      setLoading(true)
      try {
        const response = await getRoutes(pagination.pageIndex + 1, pagination.pageSize)
        setData(response.items)
        setTotalPages(response.totalPages)
      } catch {
        toast.error('Failed to fetch routes.')
      } finally {
        setLoading(false)
      }
    }
    fetchRoutes()
  }, [pagination.pageIndex, pagination.pageSize])

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        name: true,
        grade: true,
        climbingStructureType: true,
        climbingObject: false,
        longLat: false,
        actions: true,
        description: false,
      })
    } else {
      setColumnVisibility({
        name: true,
        grade: true,
        climbingStructureType: true,
        climbingObject: true,
        longLat: true,
        actions: true,
        description: false,
      })
    }
  }, [isMobile])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="rounded-md border w-full mx-auto space-y-6 m-6 max-w-5xl p-4">
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ColumnsIcon className="h-4 w-4 mr-2" />
              Customize Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Rows</Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No routes found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
