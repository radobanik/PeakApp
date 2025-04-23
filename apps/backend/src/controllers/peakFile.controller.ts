import { HTTP_STATUS } from './utils/httpStatusCodes'
import { PeakFileRepository } from '../repositories/index'
import { Request, Response } from 'express'
import { PeakFileCreate, peakFileCreateValidate, toPeakFileDetail } from '../model/peakFile'
import { s3BucketService } from '../services'
import config from '../core/config'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'
import requestValidator from '../model/common/validator'

const maxFileSize = parseInt(config.awsS3Bucket.maxFileSize as string)

const getById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const peakFile = await PeakFileRepository.getById(fileId)
  if (peakFile == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
    return
  }

  let url: string
  switch (peakFile.source) {
    case 'S3_BUCKET':
      url = await s3BucketService.getSignedS3Url(peakFile.identifier)
      break
    case 'GENERIC_URL':
      url = peakFile.identifier
      break
    default:
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
        error: 'File source not supported',
      })
      return
  }
  res.status(HTTP_STATUS.OK_200).json(toPeakFileDetail(peakFile, url))
}

const create = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const file = req.file
  if (!file) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'File is required' })
    return
  }

  if (file.size > maxFileSize) {
    res
      .status(HTTP_STATUS.BAD_REQUEST_400)
      .json({ error: `File size exceeds the limit of ${maxFileSize} bytes` })
    return
  }

  const name = file.originalname
  const contentType = file.mimetype

  const externalId = await s3BucketService.uploadFile(file)

  const peakFileCreate: PeakFileCreate = {
    name,
    contentType,
    source: 'S3_BUCKET',
    identifier: externalId,
  }

  const peakFile = await PeakFileRepository.create(peakFileCreate, userRef)
  const path = await s3BucketService.getSignedS3Url(peakFile.identifier)

  res.status(HTTP_STATUS.CREATED_201).json(toPeakFileDetail(peakFile, path))
}

const createExisting = async (req: Request<PeakFileCreate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const peakFileCreate: PeakFileCreate = req.body
  const validatedData = requestValidator(() => peakFileCreateValidate(peakFileCreate), res)
  if (!validatedData) return

  const peakFile = await PeakFileRepository.create(peakFileCreate, userRef)
  res.status(HTTP_STATUS.CREATED_201).json(toPeakFileDetail(peakFile, peakFileCreate.identifier))
}

const deleteById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const peakFile = await PeakFileRepository.getById(fileId)
  if (!peakFile) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
    return
  }

  if (peakFile.source === 'S3_BUCKET') await s3BucketService.deleteFile(peakFile.identifier)

  await PeakFileRepository.deleteById(fileId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default { getById, create, deleteById, createExisting }
