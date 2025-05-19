import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { RouteRepository } from '../repositories'
import { ClimbingObjectRepository } from '../repositories'
import { Search } from '../model/search/search'

const getSearches = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Missing or invalid search token.' })
    return
  }

  const trimmedToken = token.trim()
  try {
    const routes = await RouteRepository.listAllContainsTokenInName(trimmedToken)
    const climbingObjects = await ClimbingObjectRepository.listAllContainsTokenInName(trimmedToken)

    const result: Search = {
      routes,
      climbingObjects,
    }

    res.status(HTTP_STATUS.OK_200).json(result)
  } catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({ error: 'Search failed.' })
  }
}

export default {
  getSearches,
}
