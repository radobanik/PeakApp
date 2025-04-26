import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '@/constants/map'
import clsx from 'clsx'
import { memo, useContext } from 'react'
import { useMap } from 'react-leaflet'
import ZoomInIcon from './svg/ZoomInIcon'
import ZoomOutIcon from './svg/ZoomOutIcon'
import AddPoiIcon from './svg/AddPoiIcon'
import FilterIcon from './svg/FilterIcon'
import { ViewportContext } from '@/App'

type MapControlsProps = {
  zoomLevel: number
}

const MapControls = ({ zoomLevel }: MapControlsProps) => {
  const map = useMap()
  const { isMobile } = useContext(ViewportContext)

  const isZoomInDisabled = zoomLevel >= MAX_ZOOM_LEVEL
  const isZoomOutDisabled = zoomLevel <= MIN_ZOOM_LEVEL

  const getButtonClassName = (isDisabled: boolean = false) =>
    clsx('relative z-[1000] bg-gray-200 rounded-xl p-3 shadow-xl', {
      'cursor-not-allowed opacity-50': isDisabled,
      'cursor-pointer': !isDisabled,
    })

  const renderSearchBar = () => (
    <div className="relative z-[1000] max-w-120 h-8 flex justify-center items-center pl-4 pr-4">
      <div className="bg-red-400 w-full h-full text-xl"> TUTO DADE DAJ SEARCH RADO</div>
      {/* TODO: PA-63 Just replace the red box above with the Searchbar component
       and use w-full h-full inside that component */}
    </div>
  )

  const renderUpperButtonColumn = () => (
    <div className="flex  flex-col space-y-5">
      <button className={getButtonClassName()}>
        <FilterIcon />
      </button>
      <button className={getButtonClassName()}>
        <AddPoiIcon />
      </button>
    </div>
  )

  const renderLowerButtonColumn = () => (
    <div className="flex  flex-col space-y-5">
      <button
        className={getButtonClassName(isZoomInDisabled)}
        disabled={isZoomInDisabled}
        onClick={() => {
          map.zoomIn()
        }}
      >
        <ZoomInIcon />
      </button>
      <button
        className={getButtonClassName(isZoomOutDisabled)}
        disabled={isZoomOutDisabled}
        onClick={() => {
          map.zoomOut()
        }}
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
          'absolute right-0 w-14 h-full flex justify-between space-y-5 flex-col pb-6',
          isMobile ? 'pt-15 mr-2' : 'pt-3 mr-4'
        )}
      >
        {renderUpperButtonColumn()}
        {renderLowerButtonColumn()}
      </div>
    </div>
  )
}

export default memo(MapControls)
