import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './ui/DataTablePagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setter: any
  pageCount: number
  pagination: {
    pageIndex: number
    pageSize: number
    setPageIndex: (updater: number) => void
    setPageSize: (updater: number) => void
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setter,
  pageCount,
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount, // from props
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize })
          : updater
      pagination.setPageIndex(newState.pageIndex)
      pagination.setPageSize(newState.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border text-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setter(row.original)
                }}
                className="even:bg-stone-600 odd:bg-stone-500 "
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="text-black">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
