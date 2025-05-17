import { Router } from 'express'
import userRouter from './user.route'
import authRouter from './auth.route'
import peakFileRouter from './peakFile.route'
import gradeRouter from './grade.route'
import routeRouter from './route.route'
import climbingObjectRouter from './climbingObject.route'
import geoRouter from './geo.route'
import activityRouter from './activity.route'
import sessionRouter from './session.route'
import commentRouter from './comment.route'
import likeRouter from './like.route'
import reviewRouter from './review.route'
import reportRouter from './report.route'
import notificationRouter from './notification.route'

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
    path: '/peak-file',
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
  {
    path: '/session',
    route: sessionRouter,
  },
  {
    path: '/comment',
    route: commentRouter,
  },
  {
    path: '/like',
    route: likeRouter,
  },
  {
    path: '/review',
    route: reviewRouter,
  },
  {
    path: '/report',
    route: reportRouter,
  },
  {
    path: '/notification',
    route: notificationRouter,
  },
]

routes.forEach((route) => {
  v1Router.use(route.path, route.route)
})

export { v1Router }
