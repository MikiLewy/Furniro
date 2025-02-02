import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { updateProduct } from '../../server/actions/update-product';

export const useUpdateProduct = (onSuccess?: () => void) => {
  return useAction(updateProduct, {
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
