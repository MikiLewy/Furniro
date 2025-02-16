'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Category } from '@/features/account/categories/api/types/category';
import { useDialog } from '@/hooks/use-dialog';
import { Can } from '@/permissions/can';

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
      <div className="ml-auto">
        <Can I="create" a="AccountProducts" passThrough>
          {allowed => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="w-full">
                    <Button
                      disabled={!allowed}
                      onClick={handleOpenCreateProductDialog}>
                      <Plus className="mr h-4 w-4" />
                      Create product
                    </Button>
                  </span>
                </TooltipTrigger>
                {!allowed ? (
                  <TooltipContent>
                    <p>Not sufficient permissions</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
          )}
        </Can>
      </div>

      <CreateProductDialog
        open={isOpenCreateProductDialog}
        onClose={handleCloseCreateProductDialog}
        categories={categories}
      />
    </>
  );
};

export default ProductsPageHeaderActions;
