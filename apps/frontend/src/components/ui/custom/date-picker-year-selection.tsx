import React, { useEffect } from 'react'
import { format, setYear } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type DatePickerYearSelectorProps = {
  selected?: Date
  onSelect: (date: Date | undefined) => void
  className?: string
}

export function DatePickerYearSelector({
  selected,
  onSelect,
  className,
}: DatePickerYearSelectorProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected || new Date())
  const [selectedYear, setSelectedYear] = React.useState<number>(
    selected ? selected.getFullYear() : new Date().getFullYear()
  )
  const [month, setMonth] = React.useState<Date>(selected || new Date())

  useEffect(() => {
    if (selected) {
      setDate(selected)
      setSelectedYear(selected.getFullYear())
      setMonth(selected)
    }
  }, [selected])

  const handleYearChange = (year: string) => {
    const numericYear = parseInt(year)
    setSelectedYear(numericYear)
    const updatedMonth = setYear(month, numericYear)
    setMonth(updatedMonth)
    if (date) {
      const updatedDate = setYear(date, numericYear)
      setDate(updatedDate)
      onSelect(updatedDate)
    } else {
      const updatedDate = setYear(new Date(), numericYear)
      setDate(updatedDate)
      onSelect(updatedDate)
    }
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onSelect(newDate)
  }

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i)
    }
    return years
  }

  return (
    <div className={cn('w-full', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
          <Select onValueChange={handleYearChange} value={selectedYear.toString()}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {generateYearOptions().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              month={month}
              onMonthChange={setMonth}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
