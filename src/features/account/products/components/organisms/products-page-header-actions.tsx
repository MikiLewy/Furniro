'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Category } from '@/features/account/categories/api/types/category';
import { useDialog } from '@/hooks/use-dialog';

import CreateProductDialog from './dialogs/create-product-dialog';

interface Props {
  categories: Category[];
}

const ProductsPageHeaderActions = ({ categories }: Props) => {
  const [
    isOpenCreateProductDialog,
    handleOpenCreateProductDialog,
    handleCloseCreateProductDialog,
  ] = useDialog();

  return (
    <>
      <Button onClick={handleOpenCreateProductDialog}>
        <Plus className="mr h-4 w-4" />
        Create product
      </Button>
      <CreateProductDialog
        open={isOpenCreateProductDialog}
        onClose={handleCloseCreateProductDialog}
        categories={categories}
      />
    </>
  );
};

export default ProductsPageHeaderActions;
