import { memo, useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useMap } from 'react-leaflet'
import ZoomInIcon from './svg/ZoomInIcon'
import ZoomOutIcon from './svg/ZoomOutIcon'
import AddPoiIcon from './svg/AddPoiIcon'
import FilterIcon from './svg/FilterIcon'
import { ViewportContext } from '@/App'
import { SearchBar } from './searchbar/SearchBar'
import { useSearchSuggestions } from './searchbar/useSearchSuggestions'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import FilterDialog from './MapFilterDialog'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'

type MapControlsProps = {
  zoomLevel: number
  filters: FilterClimbingObjectListParams | null
  onApplyFilters: (f: FilterClimbingObjectListParams) => void
  setIsPoiCreationOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MAX_ZOOM_LEVEL = 18
const MIN_ZOOM_LEVEL = 3

const MapControls = memo(function MapControls({
  zoomLevel,
  onApplyFilters,
  setIsPoiCreationOpen,
}: MapControlsProps) {
  const map = useMap()
  const { isMobile } = useContext(ViewportContext)

  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const navigate = useNavigate()

  const handleSearchRouteClick = (routeId: string) => {
    navigate(`${ROUTE.ROUTE}/${routeId}`)
  }

  const handleSearchClimbingObjectClick = (climbingObjectId: string) => {
    navigate(`${ROUTE.CLIMBING_OBJECT}/${climbingObjectId}`)
  }

  const isZoomInDisabled = zoomLevel >= MAX_ZOOM_LEVEL
  const isZoomOutDisabled = zoomLevel <= MIN_ZOOM_LEVEL

  const handleCreatePoiClick = () => setIsPoiCreationOpen(true)

  const getButtonClassName = (isDisabled: boolean = false) =>
    clsx('relative z-1000 bg-gray-200 rounded-xl p-3 shadow-xl', {
      'cursor-not-allowed opacity-50': isDisabled,
      'cursor-pointer': !isDisabled,
    })

  useEffect(() => {
    const input = document.querySelector('input[type="text"]')
    if (!input || !map) return

    const onFocus = () => map.scrollWheelZoom.disable()
    const onBlur = () => map.scrollWheelZoom.enable()

    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)

    return () => {
      input.removeEventListener('focus', onFocus)
      input.removeEventListener('blur', onBlur)
    }
  }, [map])

  const renderSearchBar = () => {
    const [query, setQuery] = useState('')
    const { data: suggestions } = useSearchSuggestions(query)

    return (
      <div className="relative z-[999] max-w-[30rem] px-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          suggestions={suggestions}
          onSelectClimbingObject={handleSearchClimbingObjectClick}
          onSelectRoute={handleSearchRouteClick}
        />
      </div>
    )
  }

  const renderUpperButtonColumn = () => (
    <div className="flex flex-col space-y-5">
      <button className={getButtonClassName()} onClick={() => setFilterDialogOpen(true)}>
        <FilterIcon />
      </button>
      <button className={getButtonClassName()} onClick={handleCreatePoiClick}>
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
