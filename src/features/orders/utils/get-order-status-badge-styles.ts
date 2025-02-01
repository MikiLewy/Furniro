import { OrderStatus } from '../api/types/order-status';

export const getOrderStatusBadgeStyles = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-orange-400 hover:bg-orange-400';
    case 'succeeded':
      return 'bg-green-500 hover:bg-green-500';
    default:
      return 'bg-primary hover:bg-primary';
  }
};
