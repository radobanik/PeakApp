import app from './app'
import config from './core/config'

/**
 * Port config
 */
app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
