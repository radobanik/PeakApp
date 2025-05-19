import { useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { GradeDetail } from '@/types/gradeTypes'
import { ClimbingStructureType } from '@/types/routeTypes'
import * as gradeService from '@/services/gradeService'
import { getTextColorForBackground } from '../lib/utils'

const INITIAL_FILTERS: FilterClimbingObjectListParams = {
  name: null,
  routeName: null,
  ratingFrom: null,
  ratingTo: null,
  latitudeFrom: null,
  latitudeTo: null,
  longitudeFrom: null,
  longitudeTo: null,
  climbingStructureTypes: [],
}

const climbingStructureStyles: Record<ClimbingStructureType, string> = {
  [ClimbingStructureType.TRAVERSE]: 'bg-green-100 text-green-800',
  [ClimbingStructureType.OVERHANG]: 'bg-blue-100 text-blue-800',
  [ClimbingStructureType.SLAB]: 'bg-purple-100 text-purple-800',
  [ClimbingStructureType.WALL]: 'bg-gray-100 text-gray-800',
}

function useGrades(): GradeDetail[] {
  const [grades, setGrades] = useState<GradeDetail[]>([])
  useEffect(() => {
    gradeService.getAllGrades().then(setGrades)
  }, [])
  return grades
}

type AnyHTMLElement = HTMLElement | SVGElement
function useOnClickOutside(ref: React.RefObject<AnyHTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

type DropdownOption = { id: string; rating?: number; name: string; color?: string }
type DropdownProps<T> = {
  options: T[]
  selected?: T
  label: string
  onSelect: (value: T) => void
}

export function SingleSelectDropdown<T extends DropdownOption>({
  options,
  selected,
  label,
  onSelect,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [popupWidth, setPopupWidth] = useState<number>(0)

  useOnClickOutside(containerRef, () => setOpen(false))

  useLayoutEffect(() => {
    if (open && containerRef.current) {
      setPopupWidth(containerRef.current.getBoundingClientRect().width)
    }
  }, [open])

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
      <Button
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        className="w-full justify-between"
      >
        {display}
      </Button>
      {open && (
        <div
          className="absolute z-10 bg-white border rounded-md shadow-md mt-5.5 max-h-58 overflow-auto"
          style={{ width: popupWidth }}
        >
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
  )
}

type MultiSelectProps = {
  options: ClimbingStructureType[]
  selected: ClimbingStructureType[]
  onChange: (values: ClimbingStructureType[]) => void
}

export function MultiSelectDropdown({ options, selected, onChange }: MultiSelectProps) {
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
        <Badge key={type} className={`px-2 py-1 ${climbingStructureStyles[type]}`}>
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
          className="absolute z-10 bg-white border rounded-md shadow-md mt-5.5 max-h-60 overflow-auto"
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
                    isSelected ? climbingStructureStyles[option] : 'bg-gray-200 text-gray-800'
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

const coordinateFields = [
  { key: 'latitudeFrom', label: 'Latitude Start', placeholder: 'e.g. 50.0755' },
  { key: 'latitudeTo', label: 'Latitude End', placeholder: 'e.g. 50.0877' },
  { key: 'longitudeFrom', label: 'Longitude Start', placeholder: 'e.g. 14.4378' },
  { key: 'longitudeTo', label: 'Longitude End', placeholder: 'e.g. 14.4205' },
] as const

type CoordKey = (typeof coordinateFields)[number]['key']

export default function FilterDialog({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (filters: FilterClimbingObjectListParams) => void
}) {
  const grades = useGrades()
  const [filters, setFilters] = useState<FilterClimbingObjectListParams>({
    name: null,
    routeName: null,
    ratingFrom: null,
    ratingTo: null,
    latitudeFrom: null,
    latitudeTo: null,
    longitudeFrom: null,
    longitudeTo: null,
    climbingStructureTypes: [],
  })
  const eligibleGrades = useMemo(
    () => grades.filter((g) => !filters.ratingFrom || g.rating >= filters.ratingFrom),
    [grades, filters.ratingFrom]
  )
  const updateFilter = <K extends keyof FilterClimbingObjectListParams>(
    key: K,
    value: FilterClimbingObjectListParams[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }
  const handleRatingFrom = (grade: GradeDetail) => {
    const from = grade.rating
    const to = filters.ratingTo && filters.ratingTo < from ? null : filters.ratingTo
    updateFilter('ratingFrom', from)
    updateFilter('ratingTo', to)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[600px] sm:m-4 md:m-4 lg:m-0 p-4">
        <DialogHeader>
          <DialogTitle>Filter Climbing Objects</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 py-4">
          <SingleSelectDropdown
            options={grades}
            selected={grades.find((g) => g.rating === filters.ratingFrom)}
            label="Rating From"
            onSelect={handleRatingFrom}
          />
          <SingleSelectDropdown
            options={eligibleGrades}
            selected={grades.find((g) => g.rating === filters.ratingTo)}
            label="Rating To"
            onSelect={(grade) => updateFilter('ratingTo', grade.rating)}
          />
          <MultiSelectDropdown
            options={Object.values(ClimbingStructureType)}
            selected={filters.climbingStructureTypes || []}
            onChange={(vals) => updateFilter('climbingStructureTypes', vals)}
          />
          {coordinateFields.map((field) => (
            <div className="flex flex-col gap-2" key={field.key}>
              <Label>{field.label}</Label>
              <Input
                type="number"
                value={(filters[field.key as CoordKey] as number) ?? ''}
                onChange={(e) =>
                  updateFilter(
                    field.key as CoordKey,
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
                placeholder={field.placeholder}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              onClick={() => {
                setFilters(INITIAL_FILTERS)
                onApply(INITIAL_FILTERS)
                onOpenChange(false)
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                onApply(filters)
                onOpenChange(false)
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
