import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

interface Climb {
  id: string
  climbType: string
  positionX: number
  positionY: number
  grade: number
  name: string
  inAt: string
  wall: {
    id: string
    nameLoc: string
  }
  climbSetters: {
    id: string
    gymAdmin: {
      id: string
      name: string
    }
  }[]
  climbTagClimbs: {
    climbTag: {
      type: string
      nameLoc: string
    }
  }[]
}

interface ClimbResponse {
  data: {
    climbs: {
      data: Climb[]
    }
  }
}

const client = new ApolloClient({
  uri: 'https://app.toplogger.nu/graphql',
  cache: new InMemoryCache(),
})

const query = gql`
  query climbs($gymId: ID!, $climbType: ClimbType!, $isReported: Boolean, $compRoundId: ID) {
    climbs(
      gymId: $gymId
      climbType: $climbType
      isReported: $isReported
      compRoundId: $compRoundId
    ) {
      data {
        ...climb
      }
    }
  }

  fragment climb on Climb {
    id
    climbType
    positionX
    positionY
    grade
    name
    inAt
    wall {
      id
      nameLoc
    }
    climbSetters {
      id
      gymAdmin {
        id
        name
      }
    }
    climbTagClimbs {
      climbTag {
        type
        nameLoc
      }
    }
  }
`

const getTopLoggerClimbs = async (gymId: string): Promise<ClimbResponse | undefined> => {
  const variables = {
    gymId,
    climbType: 'boulder' as const,
  }

  try {
    const climbResponse: ClimbResponse = await client.query({
      query: query,
      variables: variables,
    })
    return climbResponse
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export { getTopLoggerClimbs, ClimbResponse, Climb }
