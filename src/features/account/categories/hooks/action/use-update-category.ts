import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { updateCategory } from '../../server/actions/update-category';

export const useUpdateCategory = (onSuccess?: () => void) => {
  return useAction(updateCategory, {
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
