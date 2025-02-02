import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { createReview } from '../../server/actions/create-review';

export const useCreateReview = (onSuccess?: () => void) => {
  return useAction(createReview, {
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
