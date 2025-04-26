import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import config from '../core/config'
import { randomUUID } from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const bucketName = config.AWS_S3_BUCKET.BUCKET_NAME

const s3Client = new S3Client({
  region: config.AWS_S3_BUCKET.REGION,
  credentials: {
    accessKeyId: config.AWS_S3_BUCKET.ACCESS_KEY,
    secretAccessKey: config.AWS_S3_BUCKET.SECRET_ACCESS_KEY,
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
    expiresIn: config.AWS_S3_BUCKET.SIGNED_URL_EXPIRATION_SECONDS,
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
