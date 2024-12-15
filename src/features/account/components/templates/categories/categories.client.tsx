'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { Category } from '@/features/account/api/types/category';
import {
  CategoriesActionSlotPayload,
  getCategoriesTableColumns,
} from '@/features/account/utils/get-categories-table-columns';
import { useDialog } from '@/hooks/use-dialog';

import { CategoriesTable } from '../../organisms/categories/categories-table';
import RemoveCategoryDialog from '../../organisms/categories/dialogs/remove-category-dialog';

interface Props {
  data: Category[];
}

const ClientCategories = ({ data }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesActionSlotPayload | null>(null);

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
          // handleOpenManageMemberBanStatusDialog();
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
    <div>
      <CategoriesTable columns={columns} data={data || []} />
      <RemoveCategoryDialog
        categoryName={selectedCategory?.name || ''}
        id={selectedCategory?.id || 0}
        open={isOpenRemoveCategoryDialog}
        onClose={handleCloseRemoveCategoryDialog}
      />
    </div>
  );
};

export default ClientCategories;
