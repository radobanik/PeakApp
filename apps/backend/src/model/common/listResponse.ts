type ListResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const createListResponse = <T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): ListResponse<T> => {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export type { ListResponse }
export { createListResponse }
