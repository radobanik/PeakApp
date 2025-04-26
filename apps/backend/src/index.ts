import app from './app'
import config from './core/config'

/**
 * Port config
 */
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`)
})
