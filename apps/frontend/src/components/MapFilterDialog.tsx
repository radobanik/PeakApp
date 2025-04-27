import { useEffect, useState, useContext, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import * as gradeService from '@/services/gradeService'
import { GradeDetail } from '@/types/gradeTypes'
import { Badge } from '@/components/ui/badge'
import { getTextColorForBackground } from '../lib/utils'
import { ClimbingStructureType } from '@/types/routeTypes'

const climbingStructureStyles: Record<ClimbingStructureType, string> = {
  [ClimbingStructureType.TRAVERSE]: 'bg-green-100 text-green-800',
  [ClimbingStructureType.OVERHANG]: 'bg-blue-100 text-blue-800',
  [ClimbingStructureType.SLAB]: 'bg-purple-100 text-purple-800',
  [ClimbingStructureType.WALL]: 'bg-gray-100 text-gray-800',
}

export default function FilterDialog({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (filters: FilterClimbingObjectListParams) => void
}) {
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

  const [grades, setGrades] = useState<GradeDetail[]>([])
  const [dropdownOpenFrom, setDropdownOpenFrom] = useState(false)
  const [dropdownOpenTo, setDropdownOpenTo] = useState(false)
  const [dropdownOpenStructureTypes, setDropdownOpenStructureTypes] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchGrades = async () => {
      const result = await gradeService.getAllGrades()
      setGrades(result)
    }
    fetchGrades()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpenStructureTypes(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (key: keyof FilterClimbingObjectListParams, value: string) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [key]: value === '' ? null : isNaN(Number(value)) ? value : Number(value),
      }

      if (
        key === 'ratingFrom' &&
        updatedFilters.ratingTo !== null &&
        updatedFilters.ratingTo < Number(value)
      ) {
        updatedFilters.ratingTo = null
      }

      return updatedFilters
    })
  }

  const filteredGradesForRatingTo = grades.filter(
    (grade) => !filters.ratingFrom || grade.rating >= filters.ratingFrom
  )

  const handleMultiSelect = (key: keyof FilterClimbingObjectListParams, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key] as string[] | null
      const updatedValues = currentValues
        ? currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value]
        : [value]

      return {
        ...prev,
        [key]: updatedValues,
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[600px] sm:m-4 md:m-4 lg:m-0 p-4">
        <DialogHeader>
          <DialogTitle>Filter Climbing Objects</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 py-4">
          {/* Rating From */}
          <div className="flex flex-col gap-2">
            <Label>Rating From</Label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => {
                  setDropdownOpenFrom((prev) => !prev)
                  setDropdownOpenTo(false)
                }}
                className="w-full justify-between"
              >
                {filters.ratingFrom ? (
                  <Badge
                    style={{
                      backgroundColor: grades.find((g) => g.rating === filters.ratingFrom)?.color,
                      color: getTextColorForBackground(
                        grades.find((g) => g.rating === filters.ratingFrom)?.color || '#ffffff'
                      ),
                    }}
                  >
                    {grades.find((g) => g.rating === filters.ratingFrom)?.name}
                  </Badge>
                ) : (
                  'Select'
                )}
              </Button>
              {dropdownOpenFrom && (
                <div className="absolute z-10 bg-white border rounded-md shadow-md w-full mt-2 max-h-60 overflow-auto">
                  {grades.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleChange('ratingFrom', grade.rating.toString())
                        setDropdownOpenFrom(false)
                      }}
                    >
                      <Badge
                        style={{
                          backgroundColor: grade.color,
                          color: getTextColorForBackground(grade.color),
                        }}
                      >
                        {grade.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rating To */}
          <div className="flex flex-col gap-2">
            <Label>Rating To</Label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => {
                  setDropdownOpenTo((prev) => !prev)
                  setDropdownOpenFrom(false)
                }}
                className="w-full justify-between"
              >
                {filters.ratingTo ? (
                  <Badge
                    style={{
                      backgroundColor: grades.find((g) => g.rating === filters.ratingTo)?.color,
                      color: getTextColorForBackground(
                        grades.find((g) => g.rating === filters.ratingTo)?.color || '#ffffff'
                      ),
                    }}
                  >
                    {grades.find((g) => g.rating === filters.ratingTo)?.name}
                  </Badge>
                ) : (
                  'Select'
                )}
              </Button>
              {dropdownOpenTo && (
                <div className="absolute z-10 bg-white border rounded-md shadow-md w-full mt-2 max-h-60 overflow-auto">
                  {filteredGradesForRatingTo.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleChange('ratingTo', grade.rating.toString())
                        setDropdownOpenTo(false)
                      }}
                    >
                      <Badge
                        style={{
                          backgroundColor: grade.color,
                          color: getTextColorForBackground(grade.color),
                        }}
                      >
                        {grade.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Climbing Structure Types */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Climbing Structure Types</Label>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                onClick={() => setDropdownOpenStructureTypes((prev) => !prev)}
                className="w-full flex flex-wrap items-center justify-start gap-2 h-auto whitespace-normal"
              >
                {filters.climbingStructureTypes && filters.climbingStructureTypes.length > 0
                  ? filters.climbingStructureTypes.map((type) => (
                      <Badge
                        key={type}
                        className={`px-2 py-1 ${climbingStructureStyles[type]}`}
                      >
                        {type}
                      </Badge>
                    ))
                  : 'Select'}
              </Button>

              {dropdownOpenStructureTypes && (
                <div className="absolute z-10 bg-white border rounded-md shadow-md w-full mt-2 max-h-60 overflow-auto">
                  {Object.values(ClimbingStructureType).map((type) => {
                    const isSelected = filters.climbingStructureTypes?.includes(type)
                    return (
                      <div
                        key={type}
                        className={`
                flex items-center gap-2 p-2 cursor-pointer
                hover:bg-gray-100
                ${isSelected ? 'bg-blue-50' : ''}
              `}
                        onClick={() => handleMultiSelect('climbingStructureTypes', type)}
                      >
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                        <Badge
                          className={`px-2 py-1 ${
                            isSelected ? climbingStructureStyles[type] : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {type}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Latitude From */}
          <div className="flex flex-col gap-2">
            <Label>Latitude From</Label>
            <Input
              className="w-full"
              type="number"
              value={filters.latitudeFrom ?? ''}
              onChange={(e) => handleChange('latitudeFrom', e.target.value)}
              placeholder="Latitude From"
            />
          </div>

          {/* Latitude To */}
          <div className="flex flex-col gap-2">
            <Label>Latitude To</Label>
            <Input
              className="w-full"
              type="number"
              value={filters.latitudeTo ?? ''}
              onChange={(e) => handleChange('latitudeTo', e.target.value)}
              placeholder="Latitude To"
            />
          </div>

          {/* Longitude From */}
          <div className="flex flex-col gap-2">
            <Label>Longitude From</Label>
            <Input
              className="w-full"
              type="number"
              value={filters.longitudeFrom ?? ''}
              onChange={(e) => handleChange('longitudeFrom', e.target.value)}
              placeholder="Longitude From"
            />
          </div>

          {/* Longitude To */}
          <div className="flex flex-col gap-2">
            <Label>Longitude To</Label>
            <Input
              className="w-full"
              type="number"
              value={filters.longitudeTo ?? ''}
              onChange={(e) => handleChange('longitudeTo', e.target.value)}
              placeholder="Longitude To"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onApply(filters)}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
