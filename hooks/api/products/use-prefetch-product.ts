import { QueryClient } from '@tanstack/react-query';

import { productsKeys } from '@/api/query-keys/products';
import { fetchProduct } from '@/api/services/supabase/products';

export const usePrefetchProduct = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => fetchProduct(id),
  });
};
