import { QueryClient } from '@tanstack/react-query';

import { fetchRecommendedProducts } from '../../../products/api/lib/products';
import { recommendedProductsKeys } from '../query-keys/recommended-products';

export const prefetchRecommendedProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: recommendedProductsKeys.list(),
    queryFn: fetchRecommendedProducts,
  });
};
