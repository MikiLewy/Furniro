import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { removeProduct } from '../../server/actions/remove-product';

export const useRemoveProduct = (onSuccess?: () => void) => {
  return useAction(removeProduct, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        onSuccess?.();
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });
};
