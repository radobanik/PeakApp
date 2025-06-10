import { useRef, useState } from 'react'
import { useOnClickOutside } from './filterHooks'
import { Badge } from '../ui/badge'
import { getTextColorForBackground } from '@/lib/utils'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

type DropdownOption = { id: string; rating?: number; name: string; color?: string }
type DropdownProps<T> = {
  options: T[]
  selected?: T
  label: string
  onSelect: (value?: T) => void
}

export function SingleSelectDropdown<T extends DropdownOption>({
  options,
  selected,
  label,
  onSelect,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(containerRef, () => setOpen(false))

  const display = selected ? (
    <Badge
      style={{
        backgroundColor: selected.color,
        color: getTextColorForBackground(selected.color || '#fff'),
      }}
    >
      {selected.name}
    </Badge>
  ) : (
    'Select'
  )

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <Label>{label}</Label>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setOpen((o) => !o)}
          className="w-full justify-between group"
        >
          <span>{display}</span>
          {selected && (
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(undefined as unknown as T)
              }}
            >
              <X className="h-4 w-4 hover:text-destructive" />
            </div>
          )}
        </Button>
        {open && (
          <div className="absolute z-10 bg-white border rounded-md shadow-md mt-1 max-h-58 overflow-auto w-full">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onSelect(option)
                  setOpen(false)
                }}
              >
                <Badge
                  style={{
                    backgroundColor: option.color,
                    color: getTextColorForBackground(option.color || '#fff'),
                  }}
                >
                  {option.name}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
