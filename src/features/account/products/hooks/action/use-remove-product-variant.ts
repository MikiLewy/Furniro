import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { removeProductVariant } from '../../server/actions/remove-product-variant';

export const useRemoveProductVariant = (onSuccess?: () => void) => {
  return useAction(removeProductVariant, {
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
