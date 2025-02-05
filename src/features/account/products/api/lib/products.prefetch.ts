import { QueryClient } from '@tanstack/react-query';

import { ParsedProductsSearchParams } from '../../lib/search-params-cache';
import { productsKeys } from '../query-keys/products';

import { getProductsWithVariantsAndCategory } from './products';

export const prefetchProducts = (
  queryClient: QueryClient,
  categoryId: number | undefined,
  parsedSearchParams: ParsedProductsSearchParams,
) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.list({
      categoryId,
      search: parsedSearchParams.q,
      ...parsedSearchParams,
    }),
    queryFn: () =>
      getProductsWithVariantsAndCategory({
        categoryId,
        ...parsedSearchParams,
        search: parsedSearchParams.q,
      }),
  });
};
