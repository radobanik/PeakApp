import { Prisma, PrismaClient, ReportStatus } from '@prisma/client'
import { createListResponse } from '../model/common/listResponse'
import { ReportCreate, reportDetailSelector, reportListSelector } from '../model/report'
import { RefObject } from '../model/common/refObject'
import { toConnector, toConnectorNullable } from './utils/connector'

type ReportWhere = Prisma.ReportWhereInput
type ReportOrder = Prisma.ReportOrderByWithRelationInput

const reportClient = new PrismaClient().report

const getById = async (id: string) => {
  return await reportClient.findUnique({
    where: { id },
    select: reportDetailSelector,
  })
}

const list = async (
  where: ReportWhere,
  orderBy: ReportOrder[],
  pageNum: number,
  pageSize: number
) => {
  const reports = await reportClient.findMany({
    where,
    orderBy,
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: reportListSelector,
  })

  const totalRoutes = await reportClient.count({ where })
  return createListResponse(reports, totalRoutes, pageNum, pageSize)
}

const create = async (user: RefObject, data: ReportCreate) => {
  const report = await reportClient.create({
    data: {
      createdBy: toConnector(user),
      climbingObject: toConnectorNullable(data.climbingObject),
      route: toConnectorNullable(data.route),
      title: data.title,
      reason: data.reason,
    },
    select: reportDetailSelector,
  })
  return report
}

const resolve = async (id: string, resolution: string) => {
  const report = await reportClient.update({
    where: { id },
    data: {
      reportStatus: ReportStatus.RESOLVED,
      resolvedAt: new Date(),
      resolution,
    },
    select: reportDetailSelector,
  })
  return report
}

const getPendingFromUser = async (
  user: RefObject,
  climbingObject: RefObject | null,
  route: RefObject | null
) => {
  const report = await reportClient.findFirst({
    where: {
      createdBy: user,
      climbingObject: climbingObject,
      route: route,
      reportStatus: ReportStatus.PENDING,
    },
    select: reportListSelector,
  })

  return report
}

const exists = async (id: string) => {
  const report = await reportClient.count({
    where: { id },
  })

  return report > 0
}

export type { ReportOrder, ReportWhere }
export default { list, getById, create, resolve, getPendingFromUser, exists }
