import React, { useState, useRef, SetStateAction, memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapObjectsLayer from './MapObjectsLayer'
import MapControls from './MapControls'
import { DEFAULT_CENTER, DEFAULT_ZOOM_LEVEL, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '@/constants/map'
import { FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { RouteSummary } from '@/types/routeTypes'

const MAX_BOUNDS = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))

type LMapProps = {
  climbingObject: string | null
  setClimbingObject: React.Dispatch<SetStateAction<string | null>>
  setRoute: React.Dispatch<SetStateAction<string | null>>
  routes: RouteSummary[] | null
}

export default memo(function LMap({
  climbingObject,
  setClimbingObject,
  setRoute,
  routes,
}: LMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)
  const [filters, setFilters] = useState<FilterClimbingObjectListParams | null>(null)

  const handleSetFilters = (newFilters: FilterClimbingObjectListParams) => {
    console.log('Filters updated in LMap:', newFilters)
    setFilters(newFilters)
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM_LEVEL}
        className="h-full w-full"
        maxBounds={MAX_BOUNDS}
        minZoom={MIN_ZOOM_LEVEL}
        maxZoom={MAX_ZOOM_LEVEL}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={MAX_ZOOM_LEVEL}
          className="z-0"
        />
        <MapObjectsLayer
          mapRef={mapRef}
          setZoomLevel={setZoomLevel}
          climbingObject={climbingObject}
          setClimbingObject={setClimbingObject}
          setRoute={setRoute}
          routes={routes}
          filters={filters}
        />
        <MapControls
          zoomLevel={zoomLevel}
          filters={filters}
          onApplyFilters={handleSetFilters}
        />
      </MapContainer>
    </div>
  )
})
