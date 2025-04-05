import { Router } from 'express'
import userRouter from './user.route'
import authRouter from './auth.route'
import peakFileRouter from './peakFile.route'
import gradeRouter from './grade.route'
import routeRouter from './route.route'
import climbingObjectRouter from './climbingObject.route'
import activityRouter from './activity.route'
import geoRouter from './geo.route'

const v1Router = Router()

const routes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/geo',
    route: geoRouter,
  },
  {
    path: '/file',
    route: peakFileRouter,
  },
  {
    path: '/grade',
    route: gradeRouter,
  },
  {
    path: '/route',
    route: routeRouter,
  },
  {
    path: '/climbing-object',
    route: climbingObjectRouter,
  },
  {
    path: '/activity',
    route: activityRouter,
  },
]

routes.forEach((route) => {
  v1Router.use(route.path, route.route)
})

export { v1Router }
