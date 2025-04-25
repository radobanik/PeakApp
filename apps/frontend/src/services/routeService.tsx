import { API } from '@/constants/api'
import { api } from './index'
import { RouteDetailListResponse } from '@/types/routeTypes'

export async function getRoutes(page: number = 1, pageSize: number = 10): Promise<RouteDetailListResponse> {
    try {
      const response = await api.get(API.ROUTE.LIST, {
        params: {
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
