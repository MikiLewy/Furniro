import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';

export interface CategoriesActionSlotPayload {
  id: string;
  name: string;
}

export const getCategoriesTableColumns = (
  actionsSlot: (payload: CategoriesActionSlotPayload) => ReactNode,
) => {
  const columns: ColumnDef<{ id: string; name: string }>[] = [
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
    },
    {
      accessorKey: 'icon',
      meta: 'icon',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Icon" />;
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
