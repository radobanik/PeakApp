import { memo, useContext, useState } from 'react'
import clsx from 'clsx'
import { useMap } from 'react-leaflet'
import ZoomInIcon from './svg/ZoomInIcon'
import ZoomOutIcon from './svg/ZoomOutIcon'
import AddPoiIcon from './svg/AddPoiIcon'
import FilterIcon from './svg/FilterIcon'
import { ViewportContext } from '@/App'
import FilterDialog from './MapFilterDialog'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'

type MapControlsProps = {
  zoomLevel: number
  filters: FilterClimbingObjectListParams | null
  onApplyFilters: (f: FilterClimbingObjectListParams) => void
}

const MAX_ZOOM_LEVEL = 18
const MIN_ZOOM_LEVEL = 3

const MapControls = memo(function MapControls({
  zoomLevel,
  filters,
  onApplyFilters,
}: MapControlsProps) {
  const map = useMap()
  const { isMobile } = useContext(ViewportContext)

  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const isZoomInDisabled = zoomLevel >= MAX_ZOOM_LEVEL
  const isZoomOutDisabled = zoomLevel <= MIN_ZOOM_LEVEL

  const getButtonClassName = (isDisabled: boolean = false) =>
    clsx('relative z-1000 bg-gray-200 rounded-xl p-3 shadow-xl', {
      'cursor-not-allowed opacity-50': isDisabled,
      'cursor-pointer': !isDisabled,
    })

  const renderSearchBar = () => (
    <div className="relative z-1000 max-w-120 h-9 flex justify-center items-center pl-4 pr-4">
      <input
        type="text"
        placeholder="Search..."
        className="
    w-full h-full px-4 py-2 mt-3 font-bold 
    bg-gray-200 bg-opacity-5 backdrop-blur-sm
    placeholder-gray-800 text-gray-800
    border border-gray-200 border-opacity-50
    rounded-md shadow-md
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
  "
      />
    </div>
  )

  const renderUpperButtonColumn = () => (
    <div className="flex flex-col space-y-5">
      <button className={getButtonClassName()} onClick={() => setFilterDialogOpen(true)}>
        <FilterIcon />
      </button>
      <button className={getButtonClassName()}>
        <AddPoiIcon />
      </button>
    </div>
  )

  const renderLowerButtonColumn = () => (
    <div className="flex flex-col space-y-5">
      <button
        className={getButtonClassName(isZoomInDisabled)}
        disabled={isZoomInDisabled}
        onClick={() => map.zoomIn()}
      >
        <ZoomInIcon />
      </button>
      <button
        className={getButtonClassName(isZoomOutDisabled)}
        disabled={isZoomOutDisabled}
        onClick={() => map.zoomOut()}
      >
        <ZoomOutIcon />
      </button>
    </div>
  )

  return (
    <div className="absolute w-full h-full">
      <div className="absolute w-full top-1">{renderSearchBar()}</div>
      <div
        className={clsx(
          'absolute right-0 w-14 h-full flex justify-between flex-col pb-6',
          isMobile ? 'pt-15 mr-2' : 'pt-3 mr-4'
        )}
      >
        {renderUpperButtonColumn()}
        {renderLowerButtonColumn()}
      </div>

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApply={(f) => {
          onApplyFilters(f)
          setFilterDialogOpen(false)
        }}
      />
    </div>
  )
})

export default MapControls
