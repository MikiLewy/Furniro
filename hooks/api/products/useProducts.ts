import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/actions/products';
import { productsKeys } from '@/api/query-keys/products';
import { Product } from '@/types/responses/Product';

export const useProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
