type IncommingListParams = {
  sort: string | null,
  order: string | null, 
  page: number | null;
  pageSize: number | null;
}

type NonNullListParams = {
  sort: string[],
  order: string[], 
  page: number;
  pageSize: number;
}
const toNumber = (value: number | string | null, defaultVal: number) : number =>
  value != null ? Number(value) : defaultVal;

const toNotNullListParams = (params : IncommingListParams, listLimit : number) : NonNullListParams => {
  return {
    sort: parseArray(params.sort),
    order: parseArray(params.order),
    page: toNumber(params.page, 1),
    pageSize: Math.min(params.pageSize || listLimit, listLimit),
  };
}

const parseArray = (array: string | null) => {
  if (array == null) return [];
  return array.split(",").map(item => item.trim()).filter(item => item !== '');
}

const validateListParams = (params: NonNullListParams, validSortFields: string[]): void => {
  if (params.sort == null || params.order == null) {
    throw new Error("'sort' and 'orderBy' cannot be null.");
  }

  if (params.sort.length !== params.order.length) {
    throw new Error("'sort' and 'orderBy' must have the same length.");
  }

  const invalidOrderBy = params.order.filter(order => order !== 'asc' && order !== 'desc');
  if (invalidOrderBy.length > 0) {
    throw new Error(`'orderBy' must only contain 'asc' or 'desc', but got: ${invalidOrderBy.join(', ')}`);
  }

  const invalidSortFields = params.sort.filter(sortField => !validSortFields.includes(sortField));
  if (invalidSortFields.length > 0) {
    throw new Error(`'sort' contains invalid fields: ${invalidSortFields.join(', ')}`);
  }
};

const parseSortAndOrderBy = (sort: string[], order : string[]) => {
  if (sort == null || order == null) return [];
  return sort.map((field, index) => {
    return { [field]: order[index] };
  });
}

export type { IncommingListParams, NonNullListParams };
export { toNotNullListParams, validateListParams, parseSortAndOrderBy, parseArray, toNumber };
