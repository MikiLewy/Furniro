import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/src/actions/products';
import { productsKeys } from '@/api/query-keys/products';
import { Product } from '@/src/types/responses/Product';

export const useProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
