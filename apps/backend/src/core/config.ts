import dotenv from 'dotenv'
import Joi from 'joi'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(8080),
    ENVIRONMENT: Joi.string().valid('production', 'development').required(),
    API_PREFIX: Joi.string().default('api'),
    DB_URL: Joi.string().required().description('Database URL'),
    DEFAULT_LIST_LIMIT: Joi.number().required(),
    USER_LIST_LIMIT: Joi.number(),
    ROUTE_LIST_LIMIT: Joi.number(),
    AWS_S3_BUCKET_NAME: Joi.string().required(),
    AWS_S3_ACCESS_KEY: Joi.string().required(),
    AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_S3_REGION: Joi.string().required(),
    AWS_S3_SIGNED_URL_EXPIRATION_SECONDS: Joi.number().positive(),
    AWS_S3_MAX_FILE_SIZE: Joi.number().positive(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Error validating config: ${error.message}`)
}

export default {
  port: envVars.PORT,
  environment: envVars.ENVIRONMENT,
  apiPrefix: envVars.API_PREFIX,
  databaseUrl: envVars.DB_URL,
  listLimit: {
    default: envVars.DEFAULT_LIST_LIMIT,
    user: envVars.USER_LIST_LIMIT || envVars.DEFAULT_LIST_LIMIT,
    route: envVars.ROUTE_LIST_LIMIT || envVars.DEFAULT_LIST_LIMIT,
  },
  awsS3Bucket: {
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    accessKey: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    signedUrlExpirationSeconds: process.env.AWS_S3_SIGNED_URL_EXPIRATION_SECONDS,
    maxFileSize: process.env.AWS_S3_MAX_FILE_SIZE,
  },
}
