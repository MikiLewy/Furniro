'use client';

import Dialog, { DialogActions } from '@/components/organisms/dialog';

import { useRemoveProduct } from '../../../hooks/action/use-remove-product';

interface Props extends DialogActions {
  id: number;
  productName: string;
}

const RemoveProductDialog = ({ open, onClose, id, productName }: Props) => {
  const { execute, status } = useRemoveProduct(onClose);

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
