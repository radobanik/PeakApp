export interface Pagination {
  page: number
  pageSize: number
  total: number
}

export interface PaginatedResponse<T> {
  pagination: Pagination
  items: T[]
}
