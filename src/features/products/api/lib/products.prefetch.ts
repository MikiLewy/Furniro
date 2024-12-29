import { QueryClient } from '@tanstack/react-query';

import { productsKeys } from '../query-keys/products';

import { fetchProducts } from './products';

export const prefetchProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: productsKeys.list(),
    queryFn: fetchProducts,
  });
};
