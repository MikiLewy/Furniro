'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import {
  Category,
  CategoryType,
} from '@/features/account/categories/api/types/category';
import {
  CategoriesActionSlotPayload,
  getCategoriesTableColumns,
} from '@/features/account/categories/utils/get-categories-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { usePermissions } from '@/permissions/can';

import { CategoriesTable } from '../../organisms/categories-table';
import RemoveCategoryDialog from '../../organisms/dialogs/remove-category-dialog';
import UpdateCategoryDialog from '../../organisms/dialogs/update-category-dialog';

interface Props {
  data: Category[];
}

const ClientCategories = ({ data }: Props) => {
  const permissions = usePermissions();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesActionSlotPayload | null>(null);

  const [
    isOpenUpdateCategoryDialog,
    handleOpenUpdateCategoryDialog,
    handleCloseUpdateCategoryDialog,
  ] = useDialog();

  const [
    isOpenRemoveCategoryDialog,
    handleOpenRemoveCategoryDialog,
    handleCloseRemoveCategoryDialog,
  ] = useDialog();

  const actionsSlot = (payload: CategoriesActionSlotPayload) => {
    const actions = [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          setSelectedCategory(payload);
          handleOpenUpdateCategoryDialog();
        },
        disabled: permissions.cannot('update', 'AccountCategories'),
        tooltipTitle: 'Not sufficient permissions',
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedCategory(payload);
          handleOpenRemoveCategoryDialog();
        },
        disabled: permissions.cannot('delete', 'AccountCategories'),
        tooltipTitle: 'Not sufficient permissions',
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  };

  const columns = getCategoriesTableColumns(actionsSlot);

  return (
    <>
      <CategoriesTable columns={columns} data={data || []} />
      <RemoveCategoryDialog
        categoryName={selectedCategory?.name || ''}
        id={selectedCategory?.id || 0}
        open={isOpenRemoveCategoryDialog}
        onClose={handleCloseRemoveCategoryDialog}
      />
      <UpdateCategoryDialog
        selectedCategoryId={selectedCategory?.id || 0}
        selectedCategoryName={selectedCategory?.name || ''}
        open={isOpenUpdateCategoryDialog}
        onClose={handleCloseUpdateCategoryDialog}
        selectedCategoryIcon={selectedCategory?.type || CategoryType.SOFA}
        selectedCategoryImage={selectedCategory?.image || ''}
        selectedCategorySubtitle={selectedCategory?.subtitle || ''}
        selectedCategoryDescription={selectedCategory?.description || ''}
        selectedCategoryMainImage={selectedCategory?.mainImage || ''}
      />
    </>
  );
};

export default ClientCategories;
