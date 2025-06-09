import { ClimbingObjectList, FilterClimbingObjectListParams } from '@/types/climbingObjectTypes'
import { RouteSummary } from '@/types/routeTypes'
import { memo, SetStateAction, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useMap } from 'react-leaflet'
import * as L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { toast } from 'sonner'
import { ClusterIcon } from './ClusterIcon'
import { getFilteredClimbingObject } from '@/services/climbingObjectService'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'

const MAX_CLUSTER_ZOOM = 18
const CHUNK_SIZE = 1000 // Process 1000 points at a time
const MAX_CLUSTER_RADIUS = 80

export const BLUE_POI_ICON = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export const RED_POI_ICON = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

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

  setClimbingObjectId: React.Dispatch<SetStateAction<string | null>>

  routes: RouteSummary[] | null

  filters: FilterClimbingObjectListParams | null
}

const MapObjectLayer = ({
  mapRef,
  setZoomLevel,
  setClimbingObjectId,
  routes,
  filters,
}: MapObjectLayerProps) => {
  const map = useMap()

  const markersRef = useRef<Map<string, L.Marker>>(new Map()) // Store markers by idx
  const climbingObjectClusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const routesClusterRef = useRef<L.MarkerClusterGroup | null>(null)

  const pointQueue = useRef<ClimbingObjectList[]>([]) // Queue for async point additions
  const isProcessing = useRef(false)

  const navigate = useNavigate()

  const handleRouteClick = (routeId: string) => {
    navigate(`${ROUTE.ROUTE}/${routeId}`)
  }

  const renderClimbingObjects = async () => {
    if (
      !climbingObjectClusterRef.current ||
      isProcessing.current ||
      pointQueue.current.length === 0
    )
      return

    isProcessing.current = true
    const clusterGroup = climbingObjectClusterRef.current

    const processChunk = () => {
      const chunk: ClimbingObjectList[] = pointQueue.current.splice(0, CHUNK_SIZE)
      const newMarkers: L.Marker[] = []

      chunk.forEach((point) => {
        // For eaach point, check if it already exists in the map
        if (!markersRef.current.has(point.id)) {
          // If it doesn't exist, create a new marker on given coords with POI icon and route count
          const mapMarker = L.marker([point.latitude, point.longitude], {
            icon: BLUE_POI_ICON,
            routesCount: point.routeCount ?? 0,
          }).on(
            // When clicked on this exact POI, set it as selected climbing obj
            'click',
            (e) => {
              setClimbingObjectId(point.id)

              setTimeout(() => {
                map.setView([point.latitude, point.longitude], map.getZoom())
              }, 50)

              // Stop propagation to prevent the map click from immediately clearing the selection
              // (check useEffect below)
              L.DomEvent.stopPropagation(e)
            }
          )
          newMarkers.push(mapMarker)
          markersRef.current.set(point.id, mapMarker)
        }
      })

      if (newMarkers.length !== 0) {
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
    const clusterGroup = routesClusterRef.current
    if (!routes) return

    const processChunk = () => {
      const newMarkers: L.Marker[] = []

      routes.forEach((route) => {
        const mapMarker = L.marker([route.latitude, route.longitude], { icon: RED_POI_ICON }).on(
          'click',
          () => {
            handleRouteClick(route.id)
          }
        )

        newMarkers.push(mapMarker)
      })

      if (newMarkers.length !== 0) {
        clusterGroup?.addLayers(newMarkers) // Add multiple markers at once
      }
    }

    requestAnimationFrame(processChunk) // Start processing
  }

  const handleMapChange = async () => {
    setZoomLevel(map.getZoom())
    const bounds = map.getBounds()

    try {
      const response = await getFilteredClimbingObject({
        longitudeFrom: filters?.longitudeFrom ?? bounds.getWest(),
        longitudeTo: filters?.longitudeTo ?? bounds.getEast(),
        latitudeFrom: filters?.latitudeFrom ?? bounds.getSouth(),
        latitudeTo: filters?.latitudeTo ?? bounds.getNorth(),
        name: filters?.name ?? null,
        routeName: filters?.routeName ?? null,
        ratingFrom: filters?.ratingFrom ?? null,
        ratingTo: filters?.ratingTo ?? null,
        climbingStructureTypes: filters?.climbingStructureTypes ?? [],
        includeUnofficalClimbingObjects: filters?.includeUnofficalClimbingObjects ?? false,
        includeUnofficialRoutes: filters?.includeUnofficialRoutes ?? false,
        excludeWithoutMatchingRoutes: filters?.excludeWithoutMatchingRoutes ?? false,
      })

      const data = response?.items || []

      data?.forEach((p) => pointQueue.current.push(p))
      renderClimbingObjects()
    } catch {
      toast.error('Could not load the climbing objects', { id: 'load-cos-error' })
    }
  }

  useEffect(() => {
    markersRef.current.clear()
    routesClusterRef.current?.clearLayers()
    climbingObjectClusterRef.current?.clearLayers()
  }, [filters])

  useEffect(() => {
    map.zoomControl.remove()
    mapRef.current = map

    const onMoveEnd = () => {
      handleMapChange()
    }

    // When clicked directly on map, clear climbing object and route
    const onMapClick = () => {
      setClimbingObjectId(null)
    }

    map.on('moveend', onMoveEnd)
    map.on('click', onMapClick)
    handleMapChange()
    return () => {
      map.off('moveend', onMoveEnd)
      map.off('click', onMapClick)
    }
  }, [map, filters])

  // Rerender routes
  useEffect(() => {
    map.invalidateSize()
    routesClusterRef.current?.clearLayers()
    renderRoutes(routes)
  }, [routes])

  // Initial load of climbing objects
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
