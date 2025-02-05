import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

import { SortOrder } from '@/types/enum/sort-order';

export interface ParsedProductsSearchParams {
  q: string;
  sortOrder: SortOrder;
  sortBy: string;
}

export const productsSearchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  sortOrder: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
    SortOrder.DESC,
  ),
  sortBy: parseAsString.withDefault(''),
});
