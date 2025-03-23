import dotenv from 'dotenv';
import e from 'express';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(8080),
    ENVIRONMENT: Joi.string()
      .valid('production', 'development')
      .required(),
    API_PREFIX: Joi.string().default('api'),
    DB_URL: Joi.string().required().description('Database URL'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
    throw new Error(`Error validating config: ${error.message}`);
}
  
export default {
    port: envVars.PORT,
    environment: envVars.ENVIRONMENT,
    apiPrefix: envVars.API_PREFIX,
    databaseUrl: envVars.DB_URL,
};
