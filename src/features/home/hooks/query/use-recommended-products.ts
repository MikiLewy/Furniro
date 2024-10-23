import { recommendedProductsKeys } from '@features/home/api/query-keys/recommended-products';
import { fetchRecommendedProducts } from '@features/products/api/lib/products';
import { Product } from '@features/products/api/types/product';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: recommendedProductsKeys.list(),
    queryFn: fetchRecommendedProducts,
  });
};
