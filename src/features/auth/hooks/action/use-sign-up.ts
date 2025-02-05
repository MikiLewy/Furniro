import { useAction } from 'next-safe-action/hooks';

import { signUpAction } from '../../server/actions/sign-up';

export const useSignUp = (
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
) => {
  return useAction(signUpAction, {
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
