import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';
import { Category, CategoryIcon } from '../categories/types/category';
import { categoryIcons } from '../categories/constants/categories-icons';

export interface CategoriesActionSlotPayload {
  id: number;
  name: string;
  icon: CategoryIcon;
  image: string;
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
      accessorKey: 'icon',
      meta: 'icon',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Icon" />;
      },
      cell: ({ getValue }) => {
        const Icon = categoryIcons[getValue() as CategoryIcon].icon;

        return <Icon />;
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
          icon: category.icon as CategoryIcon.SOFA,
          image: category.image || '',
        });
      },
    },
  ];

  return columns;
};
