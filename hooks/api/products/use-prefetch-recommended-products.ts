import { QueryClient } from '@tanstack/react-query';

import { fetchRecommendedProducts } from '@/api/services/supabase/products';
import { recommendedProductsKeys } from '@/api/query-keys/recommended-products';

export const usePrefetchRecommendedProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: recommendedProductsKeys.list(),
    queryFn: fetchRecommendedProducts,
  });
};
