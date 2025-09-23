import { memo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { RouteSummary } from '@/types/routeTypes'
import { flexRender, getCoreRowModel } from '@tanstack/react-table'
import { ROUTE_TABLE_COLUMNS, ROUTE_TABLE_ID } from '@/constants/routeConstants'
import { useReactTable } from '@tanstack/react-table'

const columns = ROUTE_TABLE_COLUMNS.filter((column) =>
  [ROUTE_TABLE_ID.NAME, ROUTE_TABLE_ID.GRADE, ROUTE_TABLE_ID.CLIMBING_STRUCTURE_TYPE].includes(
    column.id || ''
  )
)

type RouteListTableProps = {
  data: RouteSummary[]
  isLoading: boolean
  onRowClick?: (route: RouteSummary) => void
}

const RouteListTable = ({ data, isLoading, onRowClick: handleRowClick }: RouteListTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const renderRows = () => {
    if (data.length === 0)
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center">
            No routes found.
          </TableCell>
        </TableRow>
      )

    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        onClick={() => handleRowClick?.(row.original)}
        className="cursor-pointer"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  }

  return (
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
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-10">
              Loading...
            </TableCell>
          </TableRow>
        ) : (
          renderRows()
        )}
      </TableBody>
    </Table>
  )
}

export default memo(RouteListTable)
