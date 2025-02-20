'use client';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderProduct } from '@/features/orders/api/types/order';
import { formatPrice } from '@/utils/format-price';

import ViewOrderDetailsTableRow from '../../molecules/dialogs/view-order-details-table-row';

interface Props extends DialogActions {
  orderId: number;
  orderTotal: number;
  orderProducts: OrderProduct[];
}

const ViewOrderDetailsDialog = ({
  open,
  onClose,
  orderId,
  orderTotal,
  orderProducts,
}: Props) => {
  const columns = [
    {
      key: 'image',
      title: 'Image',
    },
    {
      key: 'product-name',
      title: 'Product',
    },
    {
      key: 'variant',
      title: 'Variant',
    },
    {
      key: 'quantity',
      title: 'Quantity',
    },
    {
      key: 'price',
      title: 'Price',
    },
    {
      key: 'total',
      title: 'Total',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Order #${orderId} details`}
      description="Here are the details of your order."
      cancelButtonText="Ok">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.key}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderProducts.map(product => (
              <ViewOrderDetailsTableRow
                key={`${product.id}-${product.productVariantID}`}
                imageUrl={
                  product.productVariants?.variantImages?.[0]?.url || ''
                }
                productName={product.product.name}
                productVariantName={product.productVariants.name}
                productVariantColor={product.productVariants.color}
                quantity={product.quantity}
                price={product.product.price}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="w-full text-right text-sm text-secondary-darker font-medium mt-2">
        <p>Total: {formatPrice({ amount: orderTotal })}</p>
      </div>
    </Dialog>
  );
};

export default ViewOrderDetailsDialog;
