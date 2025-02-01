'use client';

import { useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { OrderWithProduct } from '@/features/orders/api/types/order';
import {
  getOrdersTableColumns,
  OrdersActionSlotPayload,
} from '@/features/orders/utils/get-orders-table-columns';
import { useDialog } from '@/hooks/use-dialog';

import ViewOrderDetailsDialog from '../../organisms/dialogs/view-order-details-dialog';
import { OrdersTable } from '../../organisms/orders-table';

interface Props {
  data: OrderWithProduct[];
}

const ClientOrders = ({ data }: Props) => {
  const [selectedOrder, setSelectedOrder] =
    useState<OrdersActionSlotPayload | null>(null);

  const [
    isOpenViewOrderDetailsDialog,
    handleOpenViewOrderDetailsDialog,
    handleCloseViewOrderDetailsDialog,
  ] = useDialog();

  const actionsSlot = (payload: OrdersActionSlotPayload) => {
    const actions = [
      {
        key: 'view-details',
        label: 'View details',
        onClick: () => {
          setSelectedOrder(payload);
          handleOpenViewOrderDetailsDialog();
        },
      },
      ...(payload.receiptURL
        ? [
            {
              key: 'view-receipt',
              label: 'View receipt',
              onClick: () => {
                window.open(payload.receiptURL || '', '_blank');
              },
            },
          ]
        : []),
    ];

    return <ActionsTableMenu actions={actions} />;
  };

  const columns = getOrdersTableColumns(actionsSlot);

  return (
    <>
      <OrdersTable columns={columns} data={data || []} />
      <ViewOrderDetailsDialog
        open={isOpenViewOrderDetailsDialog}
        onClose={handleCloseViewOrderDetailsDialog}
        orderId={selectedOrder?.id || 0}
        orderTotal={selectedOrder?.total || 0}
        orderProducts={selectedOrder?.orderProducts || []}
      />
    </>
  );
};

export default ClientOrders;
