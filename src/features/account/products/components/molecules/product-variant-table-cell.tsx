'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import VariantCircle from '@/components/atoms/variant-circle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils';
import { Can } from '@/permissions/can';

import { ProductVariantsWithImagesAndTags } from '../../api/types/product-variant';
import CreateProductVariantDialog from '../organisms/dialogs/product-variants/create-product-variant-dialog';
import UpdateProductVariantDialog from '../organisms/dialogs/product-variants/update-product-variant-dialog';

interface Props {
  productId: number;
  variants: ProductVariantsWithImagesAndTags[];
}

const ProductVariantTableCell = ({ variants, productId }: Props) => {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantsWithImagesAndTags | null>(null);

  const [
    isOpenCreateProductVariantDialog,
    handleOpenCreateProductVariantDialog,
    handleCloseCreateProductVariantDialog,
  ] = useDialog();

  const [
    isOpenUpdateProductVariantDialog,
    handleOpenUpdateProductVariantDialog,
    handleCloseUpdateProductVariantDialog,
  ] = useDialog();

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {variants?.map((variant, index) => (
          <div key={index}>
            <Can I="createVariant" a="AccountProducts" passThrough>
              {allowed => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className={cn(
                          allowed
                            ? 'cursor-pointer pointer-events-auto'
                            : 'cursor-not-allowed',
                        )}>
                        <VariantCircle
                          onClick={
                            allowed
                              ? () => {
                                  setSelectedVariant(variant);
                                  handleOpenUpdateProductVariantDialog();
                                }
                              : undefined
                          }
                          color={variant.color}
                          name={variant.name}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {allowed
                          ? 'Edit variant'
                          : 'Not sufficient permissions'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Can>
          </div>
        ))}
        <Can I="createVariant" a="AccountProducts" passThrough>
          {allowed => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <PlusCircle
                      className={cn(
                        allowed
                          ? 'cursor-pointer pointer-events-auto text-primary'
                          : 'cursor-not-allowed pointer-events-none text-secondary-darker',
                        'w-4 h-4 cursor-pointer',
                      )}
                      onClick={handleOpenCreateProductVariantDialog}
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {allowed
                      ? 'Create a new product variant'
                      : 'Not sufficient permissions'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Can>
      </div>
      <CreateProductVariantDialog
        open={isOpenCreateProductVariantDialog}
        onClose={handleCloseCreateProductVariantDialog}
        productId={productId}
      />
      <UpdateProductVariantDialog
        open={isOpenUpdateProductVariantDialog}
        onClose={handleCloseUpdateProductVariantDialog}
        productId={productId}
        variant={selectedVariant || null}
      />
    </>
  );
};

export default ProductVariantTableCell;
