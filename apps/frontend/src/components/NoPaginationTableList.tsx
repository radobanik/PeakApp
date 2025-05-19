import { JSX, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
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
import { ColumnsIcon } from 'lucide-react'
import PlusIcon from './svg/PlusIcon'

// Extend the ColumnMeta interface to include className
// ESLint exceptionn is needed as TS is shit
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string
  }
}

type NoPaginationTableListProps<T> = {
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  columnDefiniton: ColumnDef<T>[]
  noResult: JSX.Element
  onCreateClick: () => void
}

export const NoPaginationTableList = <T extends { id: string }>(
  props: NoPaginationTableListProps<T>
): JSX.Element => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data: props.data ?? [],
    columns: props.columnDefiniton,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    meta: {
      className: '',
    },
  })
  return (
    <div className="flex flex-col w-full pt-4 h-full min-h-[300px]">
      <div className="rounded-md border flex flex-col w-full mx-auto space-y-6 p-4 h-full min-h-[300px]">
        <div className="flex items-center">
          <DropdownMenu>
            <div className="flex items-center space-x-2">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ColumnsIcon className="h-4 w-4 mr-2" />
                  Customize Columns
                </Button>
              </DropdownMenuTrigger>
              <Button variant="outline" size="sm" onClick={() => props.onCreateClick()}>
                <PlusIcon />
                Add achievement
              </Button>
            </div>

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
        </div>

        <div className="flex-1 overflow-auto">
          <Table className="relative">
            <TableHeader className="sticky top-0 bg-background z-10">
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
              {props.isLoading && (
                <TableRow>
                  <TableCell colSpan={props.columnDefiniton.length} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {props.isError && (
                <TableRow>
                  <TableCell colSpan={props.columnDefiniton.length} className="text-center py-10">
                    <div className="text-center">{props.error!.message}</div>
                  </TableCell>
                </TableRow>
              )}
              {props.isSuccess && (
                <>
                  {props.data!.length > 0 &&
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cell.column.columnDef.meta?.className}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  {props.data!.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={props.columnDefiniton.length}
                        className="text-center py-10"
                      >
                        {props.noResult}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
