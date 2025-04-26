export interface PaginatedResponse<T> {
  page: number
  pageSize: number
  total: number
  items: T[]
}
