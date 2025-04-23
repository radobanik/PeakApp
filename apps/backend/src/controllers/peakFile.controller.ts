import { HTTP_STATUS } from './utils/httpStatusCodes'
import { PeakFileRepository } from '../repositories/index'
import { Request, Response } from 'express'
import { PeakFileCreate, toPeakFileDetail } from '../model/peakFile'
import { s3BucketService } from '../services'
import config from '../core/config'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'

const maxFileSize = parseInt(config.awsS3Bucket.maxFileSize as string)

const getById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const peakFile = await PeakFileRepository.getById(fileId)
  if (peakFile == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
  } else {
    const path = await s3BucketService.getSignedS3Url(peakFile.externalId)
    res.status(HTTP_STATUS.OK_200).json(toPeakFileDetail(peakFile, path))
  }
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
    externalId: externalId,
  }

  const peakFile = await PeakFileRepository.create(peakFileCreate, userRef)
  const path = await s3BucketService.getSignedS3Url(peakFile.externalId)

  res.status(HTTP_STATUS.CREATED_201).json(toPeakFileDetail(peakFile, path))
}

const deleteById = async (req: Request, res: Response) => {
  const fileId = req.params.id
  const peakFile = await PeakFileRepository.getById(fileId)
  if (!peakFile) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'File not found' })
    return
  }
  await s3BucketService.deleteFile(peakFile.externalId)
  await PeakFileRepository.deleteById(fileId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default { getById, create, deleteById }
