'use client';

import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import Dialog, { DialogActions } from '@/components/organisms/dialog';

import { removeProduct } from '../../../server/actions/remove-product';

interface Props extends DialogActions {
  id: number;
  productName: string;
}

const RemoveProductDialog = ({ open, onClose, id, productName }: Props) => {
  const { execute, status } = useAction(removeProduct, {
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
      title="Remove product"
      open={open}
      confirmButtonText="Yes, remove"
      onClose={onClose}
      onSubmit={() => execute({ id })}
      isSubmitButtonLoading={status === 'executing'}
      isSubmitButtonDisabled={!id}>
      <p className="text-sm">
        Are you sure you want to remove the product{' '}
        <strong>{productName}</strong>?
      </p>
    </Dialog>
  );
};

export default RemoveProductDialog;
