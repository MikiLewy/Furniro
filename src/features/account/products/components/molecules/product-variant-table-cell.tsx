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
          <div key={index} className="">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <VariantCircle
                    onClick={() => {
                      setSelectedVariant(variant);
                      handleOpenUpdateProductVariantDialog();
                    }}
                    color={variant.color}
                    name={variant.name}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit variant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <PlusCircle
                  className="w-4 h-4 cursor-pointer"
                  onClick={handleOpenCreateProductVariantDialog}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new product variant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
