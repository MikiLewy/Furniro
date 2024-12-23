import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';

import { Category } from '../api/types/category';

export interface CategoriesActionSlotPayload {
  id: number;
  name: string;
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
            height={40}
            width={40}
            className="rounded-sm h-12 w-12 object-cover "
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
        return (
          <Image
            src={getValue() as string}
            alt="category icon"
            width={22}
            height={22}
          />
        );
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
        });
      },
    },
  ];

  return columns;
};
