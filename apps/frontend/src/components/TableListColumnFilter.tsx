import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Checkbox } from './ui/checkbox'
import { useState } from 'react'

export type TableListColumnFilterOption<T> = {
  label: string
  value: T
}
export type TableListColumnFilterProps<T> = {
  columnName: string
  options: TableListColumnFilterOption<T>[]
  setFilterValues: React.Dispatch<React.SetStateAction<T[]>>
  filterValues: T[]
}

const TableListColumnFilter = <T,>(props: TableListColumnFilterProps<T>): React.ReactElement => {
  const [newFilterValues, setNewFilterValues] = useState<T[]>(props.filterValues)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2">
          {props.columnName}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Search filter..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {props.options.map((option) => (
              <CommandItem key={option.label} onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  id={option.label}
                  checked={newFilterValues.includes(option.value)}
                  onClick={() =>
                    setNewFilterValues((prev) =>
                      prev.includes(option.value)
                        ? prev.filter((value) => value !== option.value)
                        : [...prev, option.value]
                    )
                  }
                />
                <label htmlFor={option.label} className="ml-2">
                  {option.label}
                </label>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <Button
          variant="ghost"
          className="w-full rounded-t-none"
          onClick={() => props.setFilterValues(() => newFilterValues)}
        >
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default TableListColumnFilter
