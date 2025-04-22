import LMap from '@/components/LMap'
import { API } from '@/constants/api'
import { ClimbingObjectDetail } from '@/types/climbingObjectTypes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const fetchClimbingObjectDetail = async (pointId: string) => {
  try {
    const response = await fetch(`${API.CLIMBING_OBJECT}/${pointId}`)
    const data = await response.json()

    if (!response.ok) {
      return null
    }

    return data
  } catch (error: unknown) {
    let message: string = 'Could not load the climbing object'
    if (error instanceof Error) {
      message = error.message || message
    }

    toast.error(message, { id: `load-${pointId}-e` })
    return null
  }
}

export default function HomePage() {
  const [climbingObject, setClimbingObject] = useState<string | null>(null)
  const [climbingObjectDetail, setClimbingObjectDetail] = useState<ClimbingObjectDetail | null>(
    null
  )
  const [route, setRoute] = useState<string | null>(null)

  useEffect(() => {
    if (climbingObject === null) {
      setClimbingObjectDetail(null)
      return
    }

    fetchClimbingObjectDetail(climbingObject).then((d) => {
      if (d !== null) {
        setClimbingObjectDetail(d)
      }
    })
  }, [climbingObject])

  return (
    <div className="h-full w-full">
      <LMap
        climbingObject={climbingObject}
        setClimbingObject={setClimbingObject}
        setRoute={setRoute}
        routes={climbingObjectDetail?.routes ?? null}
      ></LMap>
    </div>
  )
}
