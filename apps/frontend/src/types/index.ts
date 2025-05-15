export interface PaginatedResponse<T> {
  page: number
  pageSize: number
  total: number
  items: T[]
}

export interface ListCursorResponse<T> {
  items: T[]
  cursorId: string | null
  hasNextPage: boolean
}
