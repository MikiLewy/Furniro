import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';

import { Product } from '../api/types/product';

export interface ProductsActionSlotPayload {
  id: number;
  name: string;
  price: string;
  description: string;
  categoryId: number;
}

export const getProductsTableColumns = (
  actionsSlot: (payload: ProductsActionSlotPayload) => ReactNode,
) => {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      meta: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Name" />;
      },
    },
    {
      accessorKey: 'price',
      meta: 'price',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Price" />;
      },
    },
    {
      accessorKey: 'category',
      meta: 'category',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Category" />;
      },
      cell: ({ getValue }) => {
        // const Icon = categoryIcons[getValue() as CategoryIcon].icon;

        // return <Icon />;
        <></>;
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
        const product = row.original;

        return actionsSlot({
          id: product.id,
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
          description: product.description,
        });
      },
    },
  ];

  return columns;
};
