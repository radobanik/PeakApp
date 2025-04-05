import React, { useState, useEffect, useRef, SetStateAction } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L, { map } from 'leaflet'
import clsx from 'clsx'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import { API } from '@/constants/api'
import { ClimbingObjectList } from '@/types/climbingObjectTypes'
import ZoomIn from '@/assets/ZoomIn.svg'
import ZoomOut from '@/assets/ZoomOut.svg'
import { RouteList } from '@/types/routeTypes'

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const fetchClimbingObjects = async (
  lonFrom: number,
  lonTo: number,
  latFrom: number,
  latTo: number
) => {
  try {
    const url = new URL(API.CLIMBING_OBJECT)
    const params = new URLSearchParams({
      longitudeFrom: lonFrom.toString(),
      longitudeTo: lonTo.toString(),
      latitudeFrom: latFrom.toString(),
      latitudeTo: latTo.toString(),
    })

    url.search = params.toString()
    console.log(url.toString())
    const response = await fetch(url.toString())
    const data = await response.json()
    return data
  } catch {
    return null
  }
}

const MAX_CLUSTER_ZOOM = 18

type MapOperationsProps = {
  mapRef: React.RefObject<L.Map | null>
  setZoomLevel: React.Dispatch<SetStateAction<number>>

  climbingObject: string | null
  setClimbingObject: React.Dispatch<SetStateAction<string | null>>

  setRoute: React.Dispatch<SetStateAction<string | null>>
  routes: RouteList[] | null
}

const MapOperations: React.FC<MapOperationsProps> = (probs) => {
  // const { points, setPoints } = probs
  const map = useMap()

  const markersRef = useRef<Map<string, L.Marker>>(new Map()) // Store markers by idx
  const climbingObjectClusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const routesClusterRef = useRef<L.MarkerClusterGroup | null>(null)

  const pointQueue = useRef<ClimbingObjectList[]>([]) // Queue for async point additions
  const isProcessing = useRef(false)

  const renderClimbingObjects = async () => {
    if (
      !climbingObjectClusterRef.current ||
      isProcessing.current ||
      pointQueue.current.length === 0
    )
      return

    isProcessing.current = true
    const chunkSize = 1000 // Process 1000 points at a time
    const clusterGroup: L.MarkerClusterGroup | null = climbingObjectClusterRef.current

    const processChunk = () => {
      const chunk: ClimbingObjectList[] = pointQueue.current.splice(0, chunkSize)
      const newMarkers: L.Marker[] = []

      chunk.forEach((point) => {
        if (markersRef.current.get(point.id) === undefined) {
          const marker = L.marker([point.latitude, point.longitude], { icon: blueIcon }).on(
            'click',
            () => {
              probs.setClimbingObject((co) => (point.id === co ? null : point.id))
              probs.setRoute(null)
            }
          )
          newMarkers.push(marker)
          markersRef.current.set(point.id, marker)
        }
      })

      if (newMarkers.length != 0) {
        clusterGroup?.addLayers(newMarkers) // Add multiple markers at once
      }

      if (pointQueue.current.length > 0) {
        requestAnimationFrame(processChunk) // Continue processing next chunk
      } else {
        isProcessing.current = false
      }
    }

    requestAnimationFrame(processChunk) // Start processing
  }

  const renderRoutes = async (routes: RouteList[] | null) => {
    if (!routesClusterRef.current) return

    const clusterGroup: L.MarkerClusterGroup | null = routesClusterRef.current
    if (routes === null) {
      return
    }

    const processChunk = () => {
      const newMarkers: L.Marker[] = []

      routes.forEach((route) => {
        const marker = L.marker([route.latitude, route.longitude], { icon: redIcon }).on(
          'click',
          () => {
            alert(route.name)
            probs.setRoute(route.id)
          }
        )

        newMarkers.push(marker)
      })

      if (newMarkers.length != 0) {
        clusterGroup?.addLayers(newMarkers) // Add multiple markers at once
      }
    }

    requestAnimationFrame(processChunk) // Start processing
  }

  const handleMapChange = async () => {
    probs.setZoomLevel(map.getZoom())
    const b = map.getBounds()

    // Fire on pan OR zoom out
    const data: ClimbingObjectList[] | null = await fetchClimbingObjects(
      b.getWest(),
      b.getEast(),
      b.getSouth(),
      b.getNorth()
    )
    console.log(data)
    data?.forEach((p) => pointQueue.current.push(p))
    renderClimbingObjects()
  }

  useEffect(() => {
    map.zoomControl.remove()
    probs.mapRef.current = map
    const onMoveEnd = () => {
      handleMapChange()
    }

    map.on('moveend', onMoveEnd)

    return () => {
      map.off('moveend', onMoveEnd)
    }
  }, [map])

  useEffect(() => {
    map.invalidateSize()
    routesClusterRef.current?.clearLayers()
    if (probs.climbingObject) {
      setTimeout(() => {
        map.setView(
          markersRef.current.get(probs.climbingObject || '')?.getLatLng() ?? map.getCenter(),
          map.getZoom()
        )
      }, 50)
    }
    renderRoutes(probs.routes)
  }, [probs.routes])

  useEffect(() => {
    handleMapChange()
  }, [])
  return (
    <>
      {/* Climbing objects */}
      <MarkerClusterGroup
        ref={climbingObjectClusterRef}
        chunkedLoading={true}
        maxClusterRadius={80}
        disableClusteringAtZoom={MAX_CLUSTER_ZOOM}
        // eslint-disable-next-line react/no-children-prop
        children={null}
      />
      {/* Routes */}
      <MarkerClusterGroup
        ref={routesClusterRef}
        chunkedLoading={true}
        maxClusterRadius={80}
        // eslint-disable-next-line react/no-children-prop
        children={null}
      />
    </>
  )
}

const MAX_BOUNDS = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))
const MIN_ZOOM_LEVEL = 2
const MAX_ZOOM_LEVEL = 20

type LMapProps = {
  climbingObject: string | null
  setClimbingObject: React.Dispatch<SetStateAction<string | null>>
  setRoute: React.Dispatch<SetStateAction<string | null>>
  routes: RouteList[] | null
}
const LMap: React.FC<LMapProps> = (probs) => {
  const mapRef = useRef<L.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState(10)
  console.log(zoomLevel)
  return (
    <MapContainer
      center={[49.2, 16.6]}
      zoom={10}
      className="h-full"
      maxBounds={MAX_BOUNDS}
      minZoom={MIN_ZOOM_LEVEL}
      maxZoom={MAX_ZOOM_LEVEL}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={MAX_ZOOM_LEVEL}
        className="z-0"
      />
      <MapOperations
        mapRef={mapRef}
        setZoomLevel={setZoomLevel}
        climbingObject={probs.climbingObject}
        setClimbingObject={probs.setClimbingObject}
        setRoute={probs.setRoute}
        routes={probs.routes}
      />

      <div className="absolute w-full h-full flex justify-end flex-col items-end space-y-5 pb-10 pr-2">
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
