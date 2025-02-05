import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { removeCategory } from '../../server/actions/remove-category';

export const useRemoveCategory = (onSuccess?: () => void) => {
  return useAction(removeCategory, {
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
