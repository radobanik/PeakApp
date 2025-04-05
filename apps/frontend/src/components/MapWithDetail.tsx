import React, { useState } from 'react'
import clsx from 'clsx'
import { API } from '../constants/api'
import LMap from './LMap'

const fetchClimbingObjectDetail = async (pointId: number) => {
  try {
    const response = await fetch(`${API.CLIMBING_OBJECT}/${pointId}`)
    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      return null
    }

    return data
  } catch (error: unknown) {
    let message: string = 'Unknown error'
    if (error instanceof Error) {
      message = error.message || message
    }

    alert(message)
  }
}

const MapWithDetail: React.FC = () => {
  const [climbingObject, setClimbingObject] = useState(null)
  const [climbingObjectDetail, setClimbingObjectDetail] = useState(null)
  const [route, setRoute] = useState(null)

  return (
    <div
      className={clsx(
        'grid h-[90%] transition-all',
        climbingObject !== null ? 'md:grid-cols-2' : 'grid-rows-1'
      )}
    >
      <div className={clsx('transition-opacity', { 'hidden md:block': route !== null })}>
        <LMap></LMap>
      </div>
    </div>
  )
}

export default MapWithDetail
