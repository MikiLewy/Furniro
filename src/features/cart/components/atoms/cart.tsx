'use client';

import { ShoppingCart } from 'lucide-react';

import { useCartStore } from '../../store/cart-store';

const Cart = () => {
  const totalItems = useCartStore(state => state.totalItems);

  return (
    <div className="relative">
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 ? (
        <div className="absolute -top-2 -right-2.5 flex items-center justify-center p-1 w-4 h-4 rounded-full bg-primary text-secondary text-xs">
          {totalItems}
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
