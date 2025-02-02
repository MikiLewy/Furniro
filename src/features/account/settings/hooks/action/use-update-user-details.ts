import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { updateUserDetails } from '../../components/server/actions/update-user-details';

export const useUpdateUserDetails = (onSuccess?: () => void) => {
  return useAction(updateUserDetails, {
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
