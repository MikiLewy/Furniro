import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Badge } from '@/components/ui/badge';
import { dateFormats } from '@/constants/date-formats';
import { cn } from '@/lib/utils';

import { OrderProduct, OrderWithProduct } from '../api/types/order';
import { OrderStatus } from '../api/types/order-status';

import { getOrderStatusBadgeStyles } from './get-order-status-badge-styles';

export interface OrdersActionSlotPayload {
  id: number;
  total: number;
  orderProducts: OrderProduct[];
  receiptURL: string | null;
}

export const getOrdersTableColumns = (
  actionsSlot: (payload: OrdersActionSlotPayload) => ReactNode,
) => {
  const columns: ColumnDef<OrderWithProduct>[] = [
    {
      accessorKey: 'id',
      meta: 'id',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Order number" />;
      },
      cell: ({ getValue }) => {
        return <p>#{getValue() as string}</p>;
      },
    },
    {
      accessorKey: 'status',
      meta: 'status',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Status" />;
      },
      cell: ({ getValue }) => {
        return (
          <Badge
            className={cn(
              getOrderStatusBadgeStyles(getValue() as OrderStatus),
              'capitalize',
            )}>
            {getValue() as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'total',
      meta: 'total',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Total" />;
      },
      cell: ({ getValue }) => {
        return <p>€{getValue() as string}</p>;
      },
    },
    {
      accessorKey: 'createdAt',
      meta: 'Created at',
      enableHiding: false,
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
        return actionsSlot({
          id: row.original.id,
          total: row.original.total,
          orderProducts: row.original.orderProduct,
          receiptURL: row.original.receiptURL,
        });
      },
    },
  ];

  return columns;
};
