'use client';

import Dialog, { DialogActions } from '@/components/organisms/dialog';

import { useRemoveCategory } from '../../../hooks/action/use-remove-category';

interface Props extends DialogActions {
  id: number;
  categoryName: string;
}

const RemoveCategoryDialog = ({ open, onClose, id, categoryName }: Props) => {
  const { execute, status } = useRemoveCategory(onClose);

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
