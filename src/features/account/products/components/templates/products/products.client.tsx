'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { Category } from '@/features/account/categories/api/types/category';
import { useDialog } from '@/hooks/use-dialog';
import { usePermissions } from '@/permissions/can';

import { Product } from '../../../api/types/product';
import {
  getProductsTableColumns,
  ProductsActionSlotPayload,
} from '../../../utils/get-products-table-columns';
import RemoveProductDialog from '../../organisms/dialogs/remove-product-dialog';
import UpdateProductDialog from '../../organisms/dialogs/update-product-dialog';
import { ProductsTable } from '../../organisms/products-table';

interface Props {
  data: Product[];
  categories: Category[];
}

const ClientCategories = ({ data, categories }: Props) => {
  const permissions = usePermissions();

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

  const actionsSlot = (payload: ProductsActionSlotPayload) => {
    const actions = [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          setSelectedProduct(payload);
          handleOpenUpdateProductDialog();
        },
        disabled: permissions.cannot('update', 'AccountProducts'),
        tooltipTitle: 'Not sufficient permissions',
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedProduct(payload);
          handleOpenRemoveProductDialog();
        },
        disabled: permissions.cannot('delete', 'AccountProducts'),
        tooltipTitle: 'Not sufficient permissions',
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  };

  const columns = getProductsTableColumns(actionsSlot);

  const categoriesFilters =
    categories?.map(category => ({
      label: category.name,
      value: category.id.toString(),
    })) || [];

  return (
    <>
      <ProductsTable
        columns={columns}
        categoriesFilters={categoriesFilters}
        data={data || []}
      />
      <RemoveProductDialog
        productName={selectedProduct?.name || ''}
        id={selectedProduct?.id || 0}
        open={isOpenRemoveProductDialog}
        onClose={handleCloseRemoveProductDialog}
      />
      <UpdateProductDialog
        selectedProductId={selectedProduct?.id || 0}
        selectedProductCategoryId={selectedProduct?.categoryId.toString() || ''}
        selectedProductDescription={selectedProduct?.description || ''}
        selectedProductPrice={selectedProduct?.price || 0}
        selectedProductName={selectedProduct?.name || ''}
        open={isOpenUpdateProductDialog}
        onClose={handleCloseUpdateProductDialog}
        categories={categories}
      />
    </>
  );
};

export default ClientCategories;
