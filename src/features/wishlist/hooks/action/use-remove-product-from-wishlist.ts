import { useQueryClient } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { wishlistKeys } from '../../api/query-keys/wishlist';
import { removeFromWishlist } from '../../server/actions/remove-from-wishlist';

export const useRemoveProductFromWishlist = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useAction(removeFromWishlist, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: wishlistKeys.details() });
        onSuccess?.();
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });
};
