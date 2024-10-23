import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@features/products/api/lib/products';
import { productsKeys } from '@features/products/api/query-keys/products';
import { Product } from '@features/products/api/types/product';

export const useProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
