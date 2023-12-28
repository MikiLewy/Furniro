import { QueryClient } from '@tanstack/react-query';

import { fetchProducts } from '@/actions/products';
import { productsKeys } from '@/api/query-keys/products';

export const usePrefetchProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
