import { ReportStatus } from '@prisma/client'
import * as RouteInit from './route.init'
import * as ClimbingObjectInit from './climbingObject.init'
import * as UserInit from './user.init'
import prisma from '../core/prisma/client'

const reportClient = prisma.report

const reports = [
  {
    id: '9eab7d70-0d57-4ff9-a0a6-75c8c8a18a29',
    createdById: UserInit.USER_JOHN_DOE_ID,
    routeId: RouteInit.ROUTE_1_ID,
    climbingObjectId: null,
    title: 'Dangerous route',
    reason: 'The route is dangerous and needs to be fixed.',
  },
  {
    id: 'f3e86c5e-4b2a-4e3c-b774-92e439949a32',
    createdById: UserInit.USER_JANE_DOE_ID,
    routeId: null,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
    title: 'Object not found',
    reason: 'When I tried to find the object, it was not there.',
  },
  {
    id: '5be49b87-d570-4a13-b7c5-d95c12371f71',
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    routeId: RouteInit.ROUTE_2_ID,
    climbingObjectId: null,
    title: 'Offensive description',
    reason: 'The description of the route is offensive and needs to be changed.',
  },
  {
    id: '72e49b87-d570-2e8m-b7c5-d95c12371f97',
    createdById: UserInit.USER_EMILY_JOHNSON_ID,
    routeId: null,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
    title: 'Offensive description',
    reason: 'The description of the route is offensive and needs to be changed.',
  },
]

async function initReports() {
  await Promise.all(
    reports.map((report) =>
      reportClient.upsert({
        where: { id: report.id },
        update: { reportStatus: ReportStatus.PENDING, resolvedAt: null, resolution: null },
        create: report,
      })
    )
  )
}

export default initReports
