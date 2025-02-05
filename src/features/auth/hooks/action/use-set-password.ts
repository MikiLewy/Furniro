import { useAction } from 'next-safe-action/hooks';

import { setPasswordAction } from '../../server/actions/set-password';

export const useSetPassword = (
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
) => {
  return useAction(setPasswordAction, {
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
