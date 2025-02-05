import { useAction } from 'next-safe-action/hooks';

import { resetPasswordAction } from '../../server/actions/reset-password';

export const useResetPassword = (
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
) => {
  return useAction(resetPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        onSuccess?.(data.success);
      }

      if (data?.error) {
        onError?.(data.error);
      }
    },
  });
};
