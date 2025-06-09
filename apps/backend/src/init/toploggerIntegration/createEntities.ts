import prisma from '../../core/prisma/client'
import { getTopLoggerGyms, GymListResponse, Gym } from './gyms'
import { Climb, getTopLoggerClimbs } from './climbs'
import { ApprovalState, ClimbingStructureType, Prisma } from '@prisma/client'
import { frenchGrades } from '../grade.init'
import { TOP_LOGGER_USER_ID } from '../user.init'
import { assert } from 'console'
import { toConnectorId } from '../../repositories/utils/connector'

type LongitudeLatitude = {
  longitude: number
  latitude: number
}

const offset = 50 // meters

const offsetCoordinates = (
  lat: number,
  lon: number,
  dxEast: number,
  dyNorth: number
): LongitudeLatitude => {
  const R = 6371000
  const toRadians = (deg: number) => (deg * Math.PI) / 180
  const toDegrees = (rad: number) => (rad * 180) / Math.PI

  dxEast *= offset
  dyNorth *= offset

  const latOffset = (dyNorth / R) * toDegrees(1)
  const lonOffset = (dxEast / (R * Math.cos(toRadians(lat)))) * toDegrees(1)

  const newLat = lat + latOffset
  const newLon = lon + lonOffset

  return {
    latitude: newLat,
    longitude: newLon,
  }
}

const getClosestGradeIdByRating = (rating: number): string => {
  let closest = frenchGrades[0]

  for (const grade of frenchGrades) {
    if (Math.abs(grade.rating - rating) < Math.abs(closest.rating - rating)) {
      closest = grade
    }
  }

  return closest.id
}

const getClimbingObjectIdByExternalId = (
  entities: Prisma.ClimbingObjectCreateInput[],
  id: string | null
): string | null => {
  if (id === null) return null
  const entity = entities.find((entity) => entity.id === id)
  return entity?.id ?? null
}

const filterGyms = (gyms: Gym[]) => {
  return gyms.filter(
    (gym) => gym.visible && !gym.visibleSoon && gym.gradingSystemRoutes === 'FRENCH'
  )
}

const filterClimbs = (climbs: Climb[]) => climbs.filter((climb) => climb.wall?.id !== null)

const getRandomClimbingStructureType = (): ClimbingStructureType => {
  const values = Object.values(ClimbingStructureType)
  return values[Math.floor(Math.random() * values.length)]
}

const createAllClimbingEntities = async () => {
  console.log(`Fetching gyms...`)
  const gymResponse: GymListResponse | undefined = await getTopLoggerGyms(200)
  if (!gymResponse) {
    console.error('No gyms found')
    return
  }
  const gyms: Gym[] = filterGyms(gymResponse.data.gymsPaginated.data)

  console.log(`Found ${gyms.length} valid gyms`)

  for (let i = 0; i < gyms.length; i++) {
    const gym = gyms[i]
    console.log(`Processing gym ${i + 1}/${gyms.length}: ${gym.id} (${gym.name})`)

    const climbingObjects: Prisma.ClimbingObjectCreateInput[] = []
    const routes: Prisma.RouteCreateInput[] = []

    // create climbing objects for each wall (for one gym)
    for (const wall of gym.walls) {
      const coCoordinates = offsetCoordinates(gym.latitude, gym.longitude, wall.labelX, wall.labelY)
      if (wall.id == null || wall.id === undefined) continue

      const climbingObject = {
        id: wall.id,
        deleted: false,
        createdAt: new Date(),
        createdBy: toConnectorId(TOP_LOGGER_USER_ID),
        name: `${gym.name} ${wall.nameLoc}`,
        approvalState: ApprovalState.APPROVED,
        ...coCoordinates,
      }
      climbingObjects.push(climbingObject)
    }
    console.log(`Found ${climbingObjects.length} valid climbing objects`)

    // crreate map of unassigned routes names for climbing objects
    const coUnassignedMap = new Map<string, number>()
    climbingObjects.forEach((co) => {
      coUnassignedMap.set(co.id ?? '', 1)
    })

    // get all climbs corresponding to the walls
    const climbsResponse = await getTopLoggerClimbs(gym.id)
    if (!climbsResponse) {
      console.error(`No routes found for ${gym.id}`)
      return
    }
    const climbs = filterClimbs(climbsResponse.data.climbs.data)

    for (const climb of climbs) {
      if (climb.id === null || climb.id === undefined) continue

      const coordinates = offsetCoordinates(
        gym.latitude,
        gym.longitude,
        climb.positionX,
        climb.positionY
      )

      const coId = getClimbingObjectIdByExternalId(climbingObjects, climb.wall?.id)
      if (coId === null) continue

      let name = climb.name
      if (name === null || name === undefined || name === '') {
        const coUnassignedCount = coUnassignedMap.get(climb.wall.id) ?? 1
        assert(coUnassignedCount !== undefined)
        coUnassignedMap.set(climb.wall.id, coUnassignedCount + 1)
        name = `${climb.wall.nameLoc} (${coUnassignedCount})`
      }

      if (climb.grade === null) continue

      const route = {
        id: climb.id,
        createdAt: new Date(climb.inAt),
        createdBy: toConnectorId(TOP_LOGGER_USER_ID),
        deleted: false,
        name: name,
        ...coordinates,
        grade: toConnectorId(getClosestGradeIdByRating(climb.grade)),
        userGradeRating: toConnectorId(getClosestGradeIdByRating(climb.grade)),
        climbingStructureType: getRandomClimbingStructureType(),
        climbingObject: toConnectorId(coId),
        overlay: [],
        description: '',
        image: undefined,
        approvalState: ApprovalState.APPROVED,
      }
      routes.push(route)
    }
    console.log(`Found ${routes.length} valid routes`)

    await Promise.all(
      climbingObjects.map((co) =>
        prisma.climbingObject.upsert({
          create: co,
          update: co,
          where: { id: co.id },
        })
      )
    )

    await Promise.all(
      routes.map((route) =>
        prisma.route.upsert({
          create: route,
          update: route,
          where: { id: route.id },
        })
      )
    )
  }
  console.log(`Done`)
}

;(async () => await createAllClimbingEntities())()
