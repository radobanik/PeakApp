import { HTTP_STATUS } from './utils/httpStatusCodes'
import { PeakFileRepository } from '../repositories/index'
import { Request, Response } from 'express'
import { PeakFileCreate, peakCreateValidate } from '../model/peakFile'
import requestValidator from '../model/common/validator'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'

const getById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const file = await PeakFileRepository.getById(fileId)
  if (file == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(file)
  }
}

/**
 * TODO creating actual resource is not implemented yet
 */
const create = async (req: Request<PeakFileCreate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const fileData: PeakFileCreate = req.body

  const validatedData = requestValidator(() => peakCreateValidate(fileData), res)
  if (!validatedData) return

  const file = await PeakFileRepository.create(validatedData, userRef)
  res.status(HTTP_STATUS.CREATED_201).json(file)
}

/**
 * TODO deleting actual resource is not implemented yet
 */
const deleteById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const exists = await PeakFileRepository.exists(fileId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
    return
  }
  await PeakFileRepository.deleteById(fileId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default { getById, create, deleteById }
