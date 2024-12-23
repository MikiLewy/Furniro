'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';

import CreateCategoryDialog from './dialogs/create-category-dialog';

const CategoriesPageHeaderActions = () => {
  const [
    isOpenCreateCategoryDialog,
    handleOpenCreateCategoryDialog,
    handleCloseCreateCategoryDialog,
  ] = useDialog();

  return (
    <>
      <Button onClick={handleOpenCreateCategoryDialog}>
        <Plus className="mr h-4 w-4" />
        Create category
      </Button>
      <CreateCategoryDialog
        open={isOpenCreateCategoryDialog}
        onClose={handleCloseCreateCategoryDialog}
      />
    </>
  );
};

export default CategoriesPageHeaderActions;
