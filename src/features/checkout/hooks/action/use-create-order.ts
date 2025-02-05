import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { createOrder } from '@/features/orders/server/actions/create-order';

export const useCreateOrder = (onSuccess?: () => void) => {
  return useAction(createOrder, {
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
