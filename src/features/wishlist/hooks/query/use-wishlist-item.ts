import { useQuery } from '@tanstack/react-query';

import { getWishlistItem } from '../../api/lib/wishlist';
import { wishlistKeys } from '../../api/query-keys/wishlist';

export const useWishlistItem = (
  productVariantId: number,
  userId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: wishlistKeys.detail(productVariantId, userId),
    queryFn: () => getWishlistItem(productVariantId, userId),
    enabled,
  });
};
