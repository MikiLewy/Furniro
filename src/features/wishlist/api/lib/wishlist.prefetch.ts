import { QueryClient } from '@tanstack/react-query';

import { wishlistKeys } from '../query-keys/wishlist';

import { getWishlistItem } from './wishlist';

export const prefetchWishlistItem = (
  queryClient: QueryClient,
  productVariantId: number,
  userId: string,
) => {
  return queryClient.prefetchQuery({
    queryKey: wishlistKeys.detail(productVariantId, userId),
    queryFn: () => getWishlistItem(productVariantId, userId),
  });
};
