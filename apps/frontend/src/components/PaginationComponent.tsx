import { FC } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  page: number
  totalPages: number | null
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex">
      <div className="flex h-15 items-center text-lg font-bold text-stone-500">
        Page {page} of {totalPages ?? '...'}
      </div>
      <div className="flex flex-1 items-center justify-end space-x-2 pr-2">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          variant="outline"
          size="icon"
          disabled={page === 1}
          className={cn(page === 1 && 'opacity-70 cursor-not-allowed')}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => setPage((p) => p + 1)}
          variant="outline"
          size="icon"
          disabled={page === totalPages || totalPages === 0}
          className={cn(
            (page === totalPages || totalPages === 0) && 'opacity-70 cursor-not-allowed'
          )}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
