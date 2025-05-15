import { toNumber } from './listParams'

type IncommingListCursorParams = {
  cursorId?: string | null
  pageSize: number
}

type NonNullListCursorParams = {
  cursorId: string | null
  pageSize: number
}

const defaultListCursorParams = (params: IncommingListCursorParams): NonNullListCursorParams => {
  return {
    cursorId: params.cursorId ?? null,
    pageSize: toNumber(params.pageSize ?? null, 20),
  }
}

type ListCursorResponse<T> = {
  items: T[]
  cursorId: string | null
  hasNextPage: boolean
}

const createListCursorResponse = <T extends { id: string }>(
  items: T[],
  oldCursorId: string | null,
  pageSize: number
): ListCursorResponse<T> => {
  return {
    items,
    cursorId: items.length > 0 ? items[items.length - 1].id : oldCursorId,
    hasNextPage: items.length === pageSize,
  }
}
export type { IncommingListCursorParams, NonNullListCursorParams, ListCursorResponse }
export { defaultListCursorParams, createListCursorResponse }
