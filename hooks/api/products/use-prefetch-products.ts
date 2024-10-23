import { QueryClient } from '@tanstack/react-query';

import { productsKeys } from '@/api/query-keys/products';
import { fetchProducts } from '@/api/services/supabase/products';

export const usePrefetchProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
