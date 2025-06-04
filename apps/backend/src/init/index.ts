import initGrades from './grade.init'
import initRoutes from './route.init'
import initUsers from './user.init'
import initClimbingObjects from './climbingObject.init'
import initGeoData from './geo.init'
import initActivities from './activity.init'
import initSessions from './session.init'
import initComments from './comment.init'
import initLikes from './like.init'
import initReviews from './review.init'
import initReports from './report.init'
import initFollows from './follows.init'
import initAchievements from './achievement.init'

/**
 * must be in the right order!
 */
const initFunctions = [
  initGeoData,
  initUsers,
  initGrades,
  initClimbingObjects,
  initRoutes,
  initActivities,
  initSessions,
  initComments,
  initLikes,
  initReviews,
  initReports,
  initFollows,
  initAchievements,
]

async function initAll() {
  console.log('Initializing all')
  for (const initFunction of initFunctions) {
    console.log(`Initializing ${initFunction.name}`)
    await initFunction()
  }
  console.log('All initialized')
}

initAll()

export default initAll
