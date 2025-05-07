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
    pageSize: toNumber(params.cursorId ?? null, 20),
  }
}

type ListCursorResponse<T> = {
  items: T[]
  cursorId: string | null
  hasNextPage: boolean
}

export type { IncommingListCursorParams, NonNullListCursorParams, ListCursorResponse }
export { defaultListCursorParams }
