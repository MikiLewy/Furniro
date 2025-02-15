import { useAction } from 'next-safe-action/hooks';

import { loginInAction } from '../../server/actions/login';

export const useLogin = (
  onSuccess?: () => void,
  onSuccessOtp?: () => void,
  onError?: (message: string) => void,
) => {
  return useAction(loginInAction, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        onError?.(data.error);
      }
      if (data?.otp) {
        onSuccessOtp?.();
      }
      if (data?.success) {
        onSuccess?.();
      }
    },
  });
};
