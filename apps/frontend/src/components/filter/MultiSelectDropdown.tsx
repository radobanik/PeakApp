import { ClimbingStructureType } from '@/types/routeTypes'
import { useLayoutEffect, useRef, useState } from 'react'
import { useOnClickOutside } from './filterHooks'
import { Badge } from '../ui/badge'
import { CLIMBING_STRUCTURE_STYLES } from '@/constants/routeConstants'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'

type MultiSelectProps = {
  options: ClimbingStructureType[]
  selected: ClimbingStructureType[]
  onChange: (values: ClimbingStructureType[]) => void
}

export default function MultiSelectDropdown({ options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [popupWidth, setPopupWidth] = useState<number>(0)
  useOnClickOutside(containerRef, () => setOpen(false))

  useLayoutEffect(() => {
    if (open && containerRef.current) {
      setPopupWidth(containerRef.current.getBoundingClientRect().width)
    }
  }, [open])

  const toggle = (value: ClimbingStructureType) => {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }

  const display = selected.length
    ? selected.map((type) => (
        <Badge key={type} className={`px-2 py-1 ${CLIMBING_STRUCTURE_STYLES[type]}`}>
          {type}
        </Badge>
      ))
    : 'Select'

  return (
    <div className="flex flex-col gap-2 md:col-span-2" ref={containerRef}>
      <Label>Climbing Structure</Label>
      <Button
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-wrap justify-start items-center gap-2 h-11"
      >
        {display}
      </Button>
      {open && (
        <div
          className="absolute z-10 bg-secondary-background border rounded-md shadow-md mt-5.5 max-h-60 overflow-auto"
          style={{ width: popupWidth }}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option)
            return (
              <div
                key={option}
                className={`
                  flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100
                  ${isSelected ? 'bg-blue-50' : ''}
                `}
                onClick={() => toggle(option)}
              >
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                <Badge
                  className={`px-2 py-1 ${
                    isSelected ? CLIMBING_STRUCTURE_STYLES[option] : 'bg-gray-200'
                  }`}
                >
                  {option}
                </Badge>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
