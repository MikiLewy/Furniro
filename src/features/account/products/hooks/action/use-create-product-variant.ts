import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { createProductVariant } from '../../server/actions/create-product-variant';

export const useCreateProductVariant = (onSuccess?: () => void) => {
  return useAction(createProductVariant, {
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
