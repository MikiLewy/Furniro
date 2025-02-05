import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductsWithVariantsAndCategory } from '@/features/account/products/api/lib/products';
import { productsKeys } from '@/features/account/products/api/query-keys/products';

import { ProductsPayload } from '../types/products-payload';

export const useProducts = (payload: ProductsPayload) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: productsKeys.list(payload),
    queryFn: ({ pageParam = 1 }) =>
      getProductsWithVariantsAndCategory({ ...payload, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};
