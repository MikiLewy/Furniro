import { Metadata } from 'next';

import Orders from '@/features/orders/components/templates/orders';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'View your order history and manage your orders.',
};

const OrdersPage = () => {
  return <Orders />;
};

export default OrdersPage;
