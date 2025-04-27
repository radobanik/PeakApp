import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DATE_FORMAT, TIME_FORMAT } from '@/constants/formats'

const DATETIME_FORMAT = `${DATE_FORMAT}`

interface DateTimePicker24hProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function DateTimePicker24h({
  value,
  onChange,
  disabled,
  className,
  placeholder = DATE_FORMAT,
}: DateTimePicker24hProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value)

  React.useEffect(() => {
    setInternalDate(value)
  }, [value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (disabled) return

    if (selectedDate) {
      // Preserve the time if it exists
      const newDate = new Date(selectedDate)
      setInternalDate(newDate)
      onChange?.(newDate)
    }
  }

  console.log('internalDate', internalDate)
  return (
    <Popover open={isOpen && !disabled} onOpenChange={(open) => !disabled && setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !internalDate && 'text-muted-foreground',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {internalDate ? format(internalDate, DATE_FORMAT) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleDateSelect}
            initialFocus
            disabled={disabled}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
