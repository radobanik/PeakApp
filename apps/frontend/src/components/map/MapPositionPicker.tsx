import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Button } from '../ui/button'
import { useState } from 'react'

interface MapPositionPickerProps {
  onPositionPicked: (lat: number, lng: number) => void
  onCancel: () => void
  initialPosition?: [number, number]
}

function MapEvents({ onPositionSet }: { onPositionSet: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onPositionSet(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function MapPositionPicker({
  onPositionPicked,
  onCancel,
  initialPosition,
}: MapPositionPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition && initialPosition[0] !== 0 ? initialPosition : null
  )

  const center: [number, number] =
    initialPosition && initialPosition[0] !== 0 ? initialPosition : [49.8175, 15.473]

  return (
    <div className="flex flex-col gap-4 h-[400px]">
      <MapContainer center={center} zoom={8} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents onPositionSet={(lat, lng) => setPosition([lat, lng])} />
        {position && <Marker position={position} />}
      </MapContainer>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Back
        </Button>
        <Button
          onClick={() => position && onPositionPicked(position[0], position[1])}
          disabled={!position}
        >
          Confirm Position
        </Button>
      </div>
    </div>
  )
}
