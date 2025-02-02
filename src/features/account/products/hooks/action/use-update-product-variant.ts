import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { updateProductVariant } from '../../server/actions/update-product-variant';

export const useUpdateProductVariant = (onSuccess?: () => void) => {
  return useAction(updateProductVariant, {
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
