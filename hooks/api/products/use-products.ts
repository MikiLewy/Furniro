import { useQuery } from '@tanstack/react-query';

import { productsKeys } from '@/api/query-keys/products';
import { fetchProducts } from '@/api/services/supabase/products';
import { Product } from '@/types/responses/Product';

export const useProducts = () => {
  return useQuery<Product[] | null>({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
