import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';

import { Category, CategoryType } from '../api/types/category';
import { categoriesTypes } from '../constants/categories-types';

export interface CategoriesActionSlotPayload {
  id: number;
  name: string;
  type: CategoryType;
  image: string;
  subtitle: string;
  description: string;
  mainImage: string;
}

export const getCategoriesTableColumns = (
  actionsSlot: (payload: CategoriesActionSlotPayload) => ReactNode,
) => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      meta: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Name" />;
      },
    },
    {
      accessorKey: 'image',
      meta: 'image',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Image" />;
      },
      cell: ({ getValue }) => {
        return (
          <Image
            src={getValue() as string}
            alt="category image"
            height={50}
            width={50}
            className="rounded-sm object-cover"
          />
        );
      },
    },
    {
      accessorKey: 'type',
      meta: 'icon',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Icon" />;
      },
      cell: ({ getValue }) => {
        const Icon = categoriesTypes[getValue() as CategoryType]?.icon;

        return <Icon />;
      },
    },
    {
      accessorKey: 'createdBy',
      meta: 'Created by',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Created by" />;
      },
    },
    {
      accessorKey: 'createdAt',
      meta: 'Created at',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Created at" />;
      },
      cell: ({ getValue }) => {
        return (
          <FormatDate
            date={new Date((getValue() as string) ?? new Date())}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

        return actionsSlot({
          id: category.id,
          name: category.name,
          type: category.type,
          image: category.image || '',
          subtitle: category.subtitle || '',
          description: category.description || '',
          mainImage: category.mainImage || '',
        });
      },
    },
  ];

  return columns;
};
