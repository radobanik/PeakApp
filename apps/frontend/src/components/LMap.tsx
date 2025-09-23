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
  setClimbingObjectId: React.Dispatch<SetStateAction<string | null>>
  routes: RouteSummary[] | null
  setIsPoiCreationOpen: React.Dispatch<SetStateAction<boolean>>
  filters: FilterClimbingObjectListParams | null
  setFilters: React.Dispatch<SetStateAction<FilterClimbingObjectListParams | null>>
}

export default memo(function LMap({
  setClimbingObjectId,
  filters,
  setFilters,
  routes,
  setIsPoiCreationOpen,
}: LMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)

  const handleSetFilters = (newFilters: FilterClimbingObjectListParams) => {
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
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=0SPoIk47tmSwZiQId6ol"
          maxZoom={MAX_ZOOM_LEVEL}
          className="z-0"
        />
        <MapObjectsLayer
          mapRef={mapRef}
          setZoomLevel={setZoomLevel}
          setClimbingObjectId={setClimbingObjectId}
          routes={routes}
          filters={filters}
        />
        <MapControls
          zoomLevel={zoomLevel}
          filters={filters}
          onApplyFilters={handleSetFilters}
          setIsPoiCreationOpen={setIsPoiCreationOpen}
        />
      </MapContainer>
    </div>
  )
})
