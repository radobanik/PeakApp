import React, { useState, useEffect, useRef, SetStateAction } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L, { map } from 'leaflet'
import clsx from 'clsx'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import { API } from '@/constants/api'
import { ClimbingObjectList } from '@/types/mapTypes'
import ZoomIn from '@/assets/ZoomIn.svg'
import ZoomOut from '@/assets/ZoomOut.svg'

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const fetchPoints = async (lonFrom: number, lonTo: number, latFrom: number, latTo: number) => {
  try {
    const url = new URL(API.CLIMBING_OBJECT)
    const params = new URLSearchParams({
      longitudeFrom: lonFrom.toString(),
      longitudeTo: lonTo.toString(),
      latitudeFrom: latFrom.toString(),
      latitudeTo: latTo.toString(),
    })

    url.search = params.toString()

    const response = await fetch(API.CLIMBING_OBJECT)
    const data = await response.json()
    return data
  } catch {
    return null
  }
}

type MapOperationsProps = {
  points: ClimbingObjectList[]
  setPoints: React.Dispatch<SetStateAction<ClimbingObjectList[]>>
  mapRef: React.RefObject<L.Map | null>
  zoomLevel: number
  setZoomLevel: React.Dispatch<SetStateAction<number>>
}

const MapOperations: React.FC<MapOperationsProps> = (probs) => {
  // const { points, setPoints } = probs
  const map = useMap()

  useEffect(() => {
    map.zoomControl.remove()
    probs.mapRef.current = map
  }, [map])

  const markersRef = useRef(new Map()) // Store markers by idx
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const pointQueue = useRef<ClimbingObjectList[]>([]) // Queue for async point additions
  const isProcessing = useRef(false)

  // Async function to process the point queue
  const renderClimbingObjects = async () => {
    if (!clusterRef.current || isProcessing.current || pointQueue.current.length === 0) return

    isProcessing.current = true
    const chunkSize = 1000 // Process 1000 points at a time
    const clusterGroup: L.MarkerClusterGroup | null = clusterRef.current

    const processChunk = () => {
      const chunk: ClimbingObjectList[] = pointQueue.current.splice(0, chunkSize)
      const newMarkers: L.Marker[] = []

      chunk.forEach((point) => {
        const marker = L.marker([point.latitude, point.longitude], { icon: blueIcon }).on(
          'click',
          () => alert()
        )
        newMarkers.push(marker)
        markersRef.current.set(point.id, marker)
      })

      clusterGroup?.addLayers(newMarkers) // Add multiple markers at once

      if (pointQueue.current.length > 0) {
        requestAnimationFrame(processChunk) // Continue processing next chunk
      } else {
        isProcessing.current = false
      }
    }

    requestAnimationFrame(processChunk) // Start processing
  }

  map.on('moveend', () => {
    const bounds = map.getBounds()
    console.log(`Bound: ${bounds.getWest()}, ${bounds.getEast()}`)
  })

  map.on('zoomend', () => {
    console.log('Zoom level changed:', map.getZoom())
    probs.setZoomLevel(map.getZoom())
  })

  return (
    <MarkerClusterGroup
      ref={clusterRef}
      chunkedLoading={true}
      maxClusterRadius={80}
      // eslint-disable-next-line react/no-children-prop
      children={null}
    />
  )
}

const MAX_BOUNDS = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))
const MIN_ZOOM_LEVEL = 2
const MAX_ZOOM_LEVEL = 18

const LMap = () => {
  const [points, setPoints] = useState<ClimbingObjectList[]>([])
  const mapRef = useRef<L.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState(10)
  console.log(zoomLevel)
  return (
    <MapContainer
      center={[51.505, 20]}
      zoom={10}
      className="h-full"
      maxBounds={MAX_BOUNDS}
      minZoom={MIN_ZOOM_LEVEL}
      maxZoom={MAX_ZOOM_LEVEL}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="z-0" />
      <MapOperations
        points={points}
        setPoints={setPoints}
        mapRef={mapRef}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />

      <div className="absolute w-full h-full flex justify-end flex-col items-end space-y-5 pb-10 pr-2">
        <button
          className={clsx('relative z-[1000] bg-gray-200 rounded-xl p-4 shadow-xl cursor-pointer', {
            'cursor-not-allowed opacity-50 pointer-events-none': zoomLevel === MAX_ZOOM_LEVEL, // Disabled button styles
          })}
          disabled={zoomLevel === MIN_ZOOM_LEVEL}
          onClick={() => {
            if (mapRef.current != null) {
              mapRef.current.zoomIn()
            }
          }}
        >
          <img src={ZoomIn} alt="Zoom In" className="w-6 h-6" />
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
          <img src={ZoomOut} alt="Zoom In" className="w-6 h-6" />
        </button>
      </div>
    </MapContainer>
  )
}

export default LMap
