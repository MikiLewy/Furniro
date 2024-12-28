'use client';

import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import Dialog, { DialogActions } from '@/components/organisms/dialog';

import { removeCategory } from '../../../server/actions/remove-category';

interface Props extends DialogActions {
  id: number;
  categoryName: string;
}

const RemoveCategoryDialog = ({ open, onClose, id, categoryName }: Props) => {
  const { execute, status } = useAction(removeCategory, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        onClose();
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  return (
    <Dialog
      title="Remove category"
      open={open}
      confirmButtonText="Yes, remove"
      onClose={onClose}
      onSubmit={() => execute({ id })}
      isSubmitButtonLoading={status === 'executing'}
      isSubmitButtonDisabled={!id}>
      <p className="text-sm">
        Are you sure you want to remove the category{' '}
        <strong>{categoryName}</strong>?
      </p>
    </Dialog>
  );
};

export default RemoveCategoryDialog;
