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
  PORT: envVars.PORT,
  ENVIRONMENT: envVars.ENVIRONMENT,
  API_PREFIX: envVars.API_PREFIX,
  DATABASE_URL: envVars.DB_URL,
  LIST_LIMIT: {
    DEFAULT: envVars.DEFAULT_LIST_LIMIT,
    USER: envVars.USER_LIST_LIMIT || envVars.DEFAULT_LIST_LIMIT,
    ROUTE: envVars.ROUTE_LIST_LIMIT || envVars.DEFAULT_LIST_LIMIT,
  },
  AWS_S3_BUCKET: {
    BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME as string,
    ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY as string,
    SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    REGION: process.env.AWS_S3_REGION as string,
    SIGNED_URL_EXPIRATION_SECONDS: parseInt(
      process.env.AWS_S3_SIGNED_URL_EXPIRATION_SECONDS as string
    ),
    MAX_FILE_SIZE: parseInt(process.env.AWS_S3_MAX_FILE_SIZE as string),
  },
}
