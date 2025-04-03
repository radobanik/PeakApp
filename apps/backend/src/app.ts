import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import { mainRouter } from './routes'
import globalControllerErrorHandler from './controllers/utils/globalControllerErrorHandler'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import config from './core/config'
import configureJwtStrategy from './auth/jwtStrategy'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173', // allow Vite dev server
    credentials: true, // auth headers
  })
)
app.use(helmet())

app.use(passport.initialize())
configureJwtStrategy(passport)

// swagger
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'API', version: '1.0.0' },
  },
  apis: [path.resolve(__dirname, 'routes/v1/*.ts')],
  servers: [
    {
      url: `${config.apiPrefix}/v1`,
    },
  ],
})
app.use(`${config.apiPrefix}/v1/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// TODO app.use() for configs
app.use(mainRouter)

/**
 * default error handler, should be places the last
 */
app.use(globalControllerErrorHandler)

export default app
