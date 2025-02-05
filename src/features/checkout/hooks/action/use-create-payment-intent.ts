import { useAction } from 'next-safe-action/hooks';

import { createPaymentIntent } from '../../server/actions/create-payment-intent';

export const useCreatePaymentIntent = (onSuccess?: () => void) => {
  return useAction(createPaymentIntent, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        onSuccess?.();
      }
    },
  });
};
