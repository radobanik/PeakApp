import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import config from '../core/config'
import { randomUUID } from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const bucketName = config.awsS3Bucket.bucketName as string
const region = config.awsS3Bucket.region as string
const accessKey = config.awsS3Bucket.accessKey as string
const secretAccessKey = config.awsS3Bucket.secretAccessKey as string
const signedUrlExpirationSeconds = parseInt(config.awsS3Bucket.signedUrlExpirationSeconds as string)

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
})

const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  const externalId = randomUUID()

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: externalId,
    ContentType: file.mimetype,
  }

  await s3Client.send(new PutObjectCommand(uploadParams))

  return externalId
}

const getSignedS3Url = async (uuid: string): Promise<string> => {
  return await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: bucketName, Key: uuid }), {
    expiresIn: signedUrlExpirationSeconds,
  })
}

const deleteFile = async (uuid: string): Promise<void> => {
  const deleteParams = {
    Bucket: bucketName,
    Key: uuid,
  }
  await s3Client.send(new DeleteObjectCommand(deleteParams))
}

export default { uploadFile, getSignedS3Url, deleteFile }
