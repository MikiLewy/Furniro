import { useQuery } from '@tanstack/react-query';

import { productsKeys } from '@/api/query-keys/products';
import { fetchProduct } from '@/api/services/supabase/products';
import { Product } from '@/types/responses/Product';

export const useProduct = (id: number) => {
  return useQuery<Product[] | null>({
    queryKey: productsKeys.detail(id),
    queryFn: () => fetchProduct(id),
  });
};
