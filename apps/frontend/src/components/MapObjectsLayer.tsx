import { API } from '@/constants/api'
import { ClimbingObjectList } from '@/types/climbingObjectTypes'
import { RouteSummary } from '@/types/routeTypes'
import { memo, SetStateAction, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useMap } from 'react-leaflet'
import * as L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { toast } from 'sonner'
import { ClusterIcon } from './ClusterIcon'
import { PaginatedResponse } from '@/types'

const MAX_CLUSTER_ZOOM = 18
const CHUNK_SIZE = 1000 // Process 1000 points at a time
const MAX_CLUSTER_RADIUS = 80

const BLUE_POI_ICON = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const RED_POI_ICON = new L.Icon({
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
    const url = new URL(API.CLIMBING_OBJECT.LIST)
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
    toast.error('Could not load the climbing objects', { id: 'load-cos-error' })
    return null
  }
}

declare module 'leaflet' {
  interface MarkerOptions {
    routesCount?: number
  }

  interface MarkerClusterOptions {
    routesCount?: number
  }
}

const customClusterIcon = (cluster: L.MarkerCluster): L.DivIcon => {
  const markers = cluster.getAllChildMarkers()

  const totalRoutes = markers.reduce((sum, m) => sum + (m.options.routesCount || 0), 0)
  const count = markers.length

  return L.divIcon({
    html: ReactDOMServer.renderToString(<ClusterIcon count={count} totalRoutes={totalRoutes} />),
    className: '',
    iconSize: L.point(50, 50, true),
  })
}

type MapObjectLayerProps = {
  mapRef: React.RefObject<L.Map | null>
  setZoomLevel: React.Dispatch<SetStateAction<number>>

  climbingObject: string | null
  setClimbingObject: React.Dispatch<SetStateAction<string | null>>

  setRoute: React.Dispatch<SetStateAction<string | null>>
  routes: RouteSummary[] | null
}

const MapObjectLayer = (props: MapObjectLayerProps) => {
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
    const clusterGroup: L.MarkerClusterGroup | null = climbingObjectClusterRef.current

    const processChunk = () => {
      const chunk: ClimbingObjectList[] = pointQueue.current.splice(0, CHUNK_SIZE)
      const newMarkers: L.Marker[] = []

      chunk.forEach((point) => {
        if (markersRef.current.get(point.id) === undefined) {
          const mapMarker = L.marker([point.latitude, point.longitude], {
            icon: BLUE_POI_ICON,
            routesCount: point.routeCount ?? 0,
          }).on('click', () => {
            props.setClimbingObject((co) => (point.id === co ? null : point.id))
            props.setRoute(null)
          })
          newMarkers.push(mapMarker)
          markersRef.current.set(point.id, mapMarker)
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

  const renderRoutes = async (routes: RouteSummary[] | null) => {
    if (!routesClusterRef.current) return

    const clusterGroup: L.MarkerClusterGroup | null = routesClusterRef.current
    if (routes === null) {
      return
    }

    const processChunk = () => {
      const newMarkers: L.Marker[] = []

      routes.forEach((route) => {
        const mapMarker = L.marker([route.latitude, route.longitude], { icon: RED_POI_ICON }).on(
          'click',
          () => {
            props.setRoute(route.id)
          }
        )

        newMarkers.push(mapMarker)
      })

      if (newMarkers.length != 0) {
        clusterGroup?.addLayers(newMarkers) // Add multiple markers at once
      }
    }

    requestAnimationFrame(processChunk) // Start processing
  }

  const handleMapChange = async () => {
    props.setZoomLevel(map.getZoom())
    const b = map.getBounds()

    const data: PaginatedResponse<ClimbingObjectList> | null = await fetchClimbingObjects(
      b.getWest(),
      b.getEast(),
      b.getSouth(),
      b.getNorth()
    )
    console.log(data)
    data?.items?.forEach((p) => pointQueue.current.push(p))
    renderClimbingObjects()
  }

  useEffect(() => {
    map.zoomControl.remove()
    props.mapRef.current = map
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
    if (props.climbingObject !== null) {
      setTimeout(() => {
        map.setView(
          markersRef.current.get(props.climbingObject || '')?.getLatLng() ?? map.getCenter(),
          map.getZoom()
        )
      }, 50)
    }
    renderRoutes(props.routes)
  }, [props.routes])

  useEffect(() => {
    handleMapChange()
  }, [])
  return (
    <>
      {/* Climbing objects */}
      <MarkerClusterGroup
        ref={climbingObjectClusterRef}
        chunkedLoading={true}
        maxClusterRadius={MAX_CLUSTER_RADIUS}
        disableClusteringAtZoom={MAX_CLUSTER_ZOOM}
        iconCreateFunction={customClusterIcon}
        // eslint-disable-next-line react/no-children-prop
        children={null}
      />
      {/* Routes */}
      <MarkerClusterGroup
        ref={routesClusterRef}
        chunkedLoading={true}
        maxClusterRadius={MAX_CLUSTER_RADIUS}
        // eslint-disable-next-line react/no-children-prop
        children={null}
      />
    </>
  )
}

export default memo(MapObjectLayer)
