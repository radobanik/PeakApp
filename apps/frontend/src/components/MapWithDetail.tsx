import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { API } from '../constants/api'
import LMap from './LMap'
import { ClimbingObjectDetail } from '@/types/climbingObjectTypes'

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

const MapWithDetail: React.FC = () => {
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
    <div
      className={clsx(
        'grid h-[90%] transition-all',
        climbingObjectDetail !== null
          ? 'grid-rows-2 md:grid-cols-[clamp(0px,50%,400px)_1fr] md:grid-rows-1'
          : 'grid-rows-1 grid-cols-1'
      )}
    >
      <div className={clsx('transition-opacity', { 'hidden md:block': false })}>
        <LMap
          climbingObject={climbingObject}
          setClimbingObject={setClimbingObject}
          setRoute={setRoute}
          routes={climbingObjectDetail?.routes ?? null}
        ></LMap>
      </div>
      {/* Here goes detail. Pseudo layout for smartphone and desktop is now set */}
      <div className={clsx(climbingObjectDetail !== null ? 'row-2 md:col-1 md:row-1' : 'hidden')}>
        {route !== null && <p>Big Booty latina route was set</p>}
      </div>
    </div>
  )
}

export default MapWithDetail
