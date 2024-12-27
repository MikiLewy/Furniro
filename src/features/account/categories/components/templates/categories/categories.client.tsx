'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import {
  Category,
  CategoryIcon,
} from '@/features/account/categories/types/category';
import {
  CategoriesActionSlotPayload,
  getCategoriesTableColumns,
} from '@/features/account/categories/utils/get-categories-table-columns';
import { useDialog } from '@/hooks/use-dialog';

import { CategoriesTable } from '../../organisms/categories-table';
import RemoveCategoryDialog from '../../organisms/dialogs/remove-category-dialog';
import UpdateCategoryDialog from '../../organisms/dialogs/update-category-dialog';

interface Props {
  data: Category[];
}

const ClientCategories = ({ data }: Props) => {
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
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedCategory(payload);
          handleOpenRemoveCategoryDialog();
        },
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
        selectedCategoryIcon={selectedCategory?.icon || CategoryIcon.SOFA}
        selectedCategoryImage={selectedCategory?.image || ''}
      />
    </>
  );
};

export default ClientCategories;
