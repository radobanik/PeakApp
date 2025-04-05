import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

interface Pagination {
  total: number
  page: number
  perPage: number
  orderBy: {
    key: string
    order: string
  }[]
}

interface Wall {
  id: string
  nameLoc: string
  idOnFloorplan: string
  climbTypeDefault: string
  labelX: number
  labelY: number
}

interface Gym {
  id: string
  name: string
  nameSlug: string
  climbTypeDefault: string
  gradingSystemRoutes: string
  gradingSystemRoutesCustom: string | null
  visible: boolean
  visibleSoon: boolean
  latitude: number
  longitude: number
  bouldersEnabled: boolean
  routesEnabled: boolean
  walls: Wall[]
}

interface GymListResponse {
  data: {
    gymsPaginated: {
      pagination: Pagination
      data: Gym[]
    }
  }
}

const client = new ApolloClient({
  uri: 'https://app.toplogger.nu/graphql',
  cache: new InMemoryCache(),
})

const query = gql`
  query gymsForList($pagination: PaginationInputGyms, $search: String) {
    gymsPaginated(pagination: $pagination, search: $search) {
      pagination {
        ...pagination
      }
      data {
        id
        name
        ...gymForGymsGym
      }
    }
  }

  fragment gymForUseGyms on Gym {
    id
    nameSlug
    climbTypeDefault
  }

  fragment pagination on Pagination {
    total
    page
    perPage
    orderBy {
      key
      order
    }
  }

  fragment gymForGymsGym on Gym {
    id
    name

    gradingSystemRoutes
    gradingSystemRoutesCustom
    visible
    visibleSoon
    latitude
    longitude
    bouldersEnabled
    routesEnabled
    ...gymForUseGyms
    walls {
      ...wall
    }
  }

  fragment wall on Wall {
    id
    nameLoc
    idOnFloorplan
    climbTypeDefault
    labelX
    labelY
  }
`

const getTopLoggerGyms = async (
  limit: number = 200,
  page: number = 1
): Promise<GymListResponse | undefined> => {
  const variables = {
    pagination: {
      page: page,
      perPage: limit,
      orderBy: [{ key: 'name', order: 'asc' }],
    },
  }

  try {
    const gymListResponse = (await client.query({
      query,
      variables,
    })) as unknown as GymListResponse

    return gymListResponse
  } catch (error) {
    console.error('Error fetching gym data:', error)
    return undefined
  }
}

export { getTopLoggerGyms, GymListResponse, Gym }
