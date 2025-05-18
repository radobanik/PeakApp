import { API } from '@/constants/api'
import { api } from '.'
import { ReportDetail, ReportList } from 'backend/src/model/report'
import { ReportStatus } from '@prisma/client'
import { AxiosError } from 'axios'
import { PaginatedResponse } from '@/types'

export async function getReports(
  page: number,
  pageSize: number,
  reportStatuses: ReportStatus[]
): Promise<PaginatedResponse<ReportList>> {
  const response = await api.get(API.REPORT.LIST(), {
    params: {
      page,
      pageSize: pageSize,
      reportStatuses: reportStatuses.join(','),
    },
  })
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}

export async function getReportById(id: string): Promise<ReportDetail> {
  const response = await api.get(API.REPORT.BY_ID(id))
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
  return response.data
}

export async function createReport(
  climbingObjectId: string | undefined,
  routeId: string | undefined,
  title: string,
  reason: string
): Promise<void> {
  const response = await api.post(API.REPORT.CREATE(), {
    climbingObject: climbingObjectId ? { id: climbingObjectId } : null,
    route: routeId ? { id: routeId } : null,
    title,
    reason,
  })
  if (response.status != 201) {
    throw new Error(response.data.error || 'Error')
  }
}

export async function resolveReport(id: string, resolution: string): Promise<void> {
  const response = await api.patch(API.REPORT.RESOLVE(id), {
    resolution,
  })
  if (response.status != 200) {
    throw new Error(response.data.error || 'Error')
  }
}

export async function getUserPendingReport(
  climbingObjectId?: string,
  routeId?: string
): Promise<ReportList | null> {
  try {
    const response = await api.get(API.REPORT.USER_PENDING(), {
      params: {
        ...(climbingObjectId ? { climbingObjectId } : {}),
        ...(routeId ? { routeId } : {}),
      },
    })
    return response.data
  } catch (error: unknown) {
    console.log('Error fetching pending report')
    const axiosError = error as AxiosError<{ error: string }>
    if (axiosError.response?.status === 404) {
      return null
    }
    throw new Error(axiosError.response?.data?.error || 'Failed to fetch pending report')
  }
}
