import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '@/constants/map'
import clsx from 'clsx'
import { memo } from 'react'
import ZoomInIcon from '@/assets/ZoomIn.svg'
import ZoomOutIcon from '@/assets/ZoomOut.svg'

type MapControlsProps = {
  mapRef: React.RefObject<L.Map | null>
  zoomLevel: number
}

const MapControls = ({ mapRef, zoomLevel }: MapControlsProps) => {
  return (
    <div className="absolute w-full h-full flex justify-end flex-col items-end space-y-5 pb-10 pr-2 bg-red">
      <button
        className={clsx('relative z-[1000] bg-gray-200 rounded-xl p-4 shadow-xl cursor-pointer', {
          'cursor-not-allowed opacity-50 pointer-events-none': zoomLevel === MAX_ZOOM_LEVEL, // Disabled button styles
        })}
        disabled={zoomLevel === MAX_ZOOM_LEVEL}
        onClick={() => {
          if (mapRef.current != null) {
            mapRef.current.zoomIn()
          }
        }}
      >
        <img src={ZoomInIcon} alt="Zoom In" className="w-6 h-6" />
      </button>
      <button
        className={clsx('relative z-[1000] bg-gray-200 rounded-xl p-4 shadow-xl cursor-pointer', {
          'cursor-not-allowed opacity-50 pointer-events-none': zoomLevel === MIN_ZOOM_LEVEL, // Disabled button styles
        })}
        disabled={zoomLevel === MIN_ZOOM_LEVEL}
        onClick={() => {
          if (mapRef.current != null) {
            mapRef.current.zoomOut()
          }
        }}
      >
        <img src={ZoomOutIcon} alt="Zoom In" className="w-6 h-6" />
      </button>
    </div>
  )
}

export default memo(MapControls)
