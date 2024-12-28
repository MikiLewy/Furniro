'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { useDialog } from '@/hooks/use-dialog';

import { Product } from '../../../api/types/product';
import {
  getProductsTableColumns,
  ProductsActionSlotPayload,
} from '../../../utils/get-products-table-columns';
import { ProductsTable } from '../../organisms/products-table';

interface Props {
  data: Product[];
}

const ClientCategories = ({ data }: Props) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductsActionSlotPayload | null>(null);

  const [
    isOpenUpdateProductDialog,
    handleOpenUpdateProductDialog,
    handleCloseUpdateProductDialog,
  ] = useDialog();

  const [
    isOpenRemoveProductDialog,
    handleOpenRemoveProductDialog,
    handleCloseRemoveProductDialog,
  ] = useDialog();

  console.log({ data });

  const actionsSlot = (payload: ProductsActionSlotPayload) => {
    const actions = [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          setSelectedProduct(payload);
          handleOpenUpdateProductDialog();
        },
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedProduct(payload);
          handleOpenRemoveProductDialog();
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  };

  const columns = getProductsTableColumns(actionsSlot);

  return (
    <>
      <ProductsTable columns={columns} data={data || []} />
      {/* <RemoveProductDialog
        categoryName={selectedProduct?.name || ''}
        id={selectedProduct?.id || 0}
        open={isOpenRemoveProductDialog}
        onClose={handleCloseRemoveProductDialog}
      />
      <UpdateProductDialog
        selectedProductId={selectedProduct?.id || 0}
        selectedProductName={selectedProduct?.name || ''}
        open={isOpenUpdateProductDialog}
        onClose={handleCloseUpdateProductDialog}
        selectedProductIcon={selectedProduct?.icon || ProductIcon.SOFA}
        selectedProductImage={selectedProduct?.image || ''}
      /> */}
    </>
  );
};

export default ClientCategories;
