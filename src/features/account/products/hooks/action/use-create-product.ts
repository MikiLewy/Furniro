import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { createProduct } from '../../server/actions/create-product';

export const useCreateProduct = (onSuccess?: () => void) => {
  return useAction(createProduct, {
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
