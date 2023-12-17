import { useQuery } from '@tanstack/react-query';

import { fetchRecommendedProducts } from '@/actions/products';
import { recommendedProductsKeys } from '@/api/query-keys/recommended-products';
import { Product } from '@/types/responses/Product';

export const useRecommendedProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: recommendedProductsKeys.list(),
    queryFn: fetchRecommendedProducts,
  });
};
