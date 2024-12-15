'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import {
  CategoriesActionSlotPayload,
  getCategoriesTableColumns,
} from '@/features/account/utils/get-categories-table-columns';

import { CategoriesTable } from '../../organisms/categories/categories-table';

const ClientCategories = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesActionSlotPayload | null>(null);

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
          // handleOpenDeleteMemberDialog();
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  };

  const columns = getCategoriesTableColumns(actionsSlot);

  return (
    <div>
      <CategoriesTable columns={columns} data={[]} />{' '}
    </div>
  );
};

export default ClientCategories;
