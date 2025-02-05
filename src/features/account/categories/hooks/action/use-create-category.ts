import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { createCategory } from '../../server/actions/create-category';

export const useCreateCategory = (onSuccess?: () => void) => {
  return useAction(createCategory, {
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
