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
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { GradeDetail } from '@/types/gradeTypes'
import { ClimbingStructureType } from '@/types/routeTypes'
import { Checkbox } from '../ui/checkbox'
import clsx from 'clsx'
import { useFeatureFlagsQuery } from '@/services/queryHooks'
import MultiSelectDropdown from './MultiSelectDropdown'
import { useGrades } from './filterHooks'
import { SingleSelectDropdown } from './SingleSelectDropdown'

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
  includeUnofficalClimbingObjects: false,
  includeUnofficialRoutes: false,
  excludeWithoutMatchingRoutes: false,
}

const coordinateFields = [
  { key: 'latitudeFrom', label: 'Latitude Start', placeholder: 'e.g. 50.0755' },
  { key: 'latitudeTo', label: 'Latitude End', placeholder: 'e.g. 50.0877' },
  { key: 'longitudeFrom', label: 'Longitude Start', placeholder: 'e.g. 14.4378' },
  { key: 'longitudeTo', label: 'Longitude End', placeholder: 'e.g. 14.4205' },
] as const

type CoordKey = (typeof coordinateFields)[number]['key']

export default function MapFilterDialog({
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
    includeUnofficalClimbingObjects: false,
    includeUnofficialRoutes: false,
    excludeWithoutMatchingRoutes: false,
  })

  const grades = useGrades()
  const featureFlagsQuery = useFeatureFlagsQuery()

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

  const handleRatingFrom = (grade?: GradeDetail) => {
    const from = grade?.rating
    const to = from && filters.ratingTo && filters.ratingTo < from ? null : filters.ratingTo
    updateFilter('ratingFrom', from ?? null)
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
            onSelect={(grade) => updateFilter('ratingTo', grade?.rating ?? null)}
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
          <div className="flex flex-col gap-2">
            <div
              className={clsx('flex items-center space-x-2', {
                hidden: featureFlagsQuery.data?.showApprovedOnly,
              })}
            >
              <Label htmlFor="include-unoff-co">Include unofficial climbing objects:</Label>
              <Checkbox
                id="include-unoff-co"
                checked={filters.includeUnofficalClimbingObjects}
                onCheckedChange={(ch) =>
                  updateFilter('includeUnofficalClimbingObjects', ch === true)
                }
              />
            </div>
            <div
              className={clsx('flex items-center space-x-2', {
                hidden: featureFlagsQuery.data?.showApprovedOnly,
              })}
            >
              <Label htmlFor="include-unoff-r">Include unofficial routes:</Label>
              <Checkbox
                id="include-unoff-r"
                checked={filters.includeUnofficialRoutes}
                onCheckedChange={(ch) => updateFilter('includeUnofficialRoutes', ch === true)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="exclude-empty-co">Exclude empty climbing objects:</Label>
              <Checkbox
                id="exclude-empty-co"
                checked={filters.excludeWithoutMatchingRoutes}
                onCheckedChange={(ch) => updateFilter('excludeWithoutMatchingRoutes', ch === true)}
              />
            </div>
          </div>
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
