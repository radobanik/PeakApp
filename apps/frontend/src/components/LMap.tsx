import React, { useState, useRef, SetStateAction, memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { RouteSummary } from '@/types/routeTypes'
import { DEFAULT_CENTER, DEFAULT_ZOOM_LEVEL, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '@/constants/map'
import MapObjectsLayer from './MapObjectsLayer'
import MapControls from './MapControls'

const MAX_BOUNDS = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))

type LMapProps = {
  climbingObject: string | null
  setClimbingObject: React.Dispatch<SetStateAction<string | null>>
  setRoute: React.Dispatch<SetStateAction<string | null>>
  routes: RouteSummary[] | null
}

const LMap = (props: LMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)

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
          climbingObject={props.climbingObject}
          setClimbingObject={props.setClimbingObject}
          setRoute={props.setRoute}
          routes={props.routes}
        />
        <MapControls mapRef={mapRef} zoomLevel={zoomLevel} />
      </MapContainer>
    </div>
  )
}

export default memo(LMap)
