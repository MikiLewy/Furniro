'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';

const ProductsPageHeaderActions = () => {
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
      {/* <CreateProductDialog
        open={isOpenCreateProductDialog}
        onClose={handleCloseCreateProductDialog}
      /> */}
    </>
  );
};

export default ProductsPageHeaderActions;
