'use client';

import { SheetTitle } from '@/components/ui/sheet';

import { useCartStore } from '../../store/cart-store';

const CartSheetTitle = () => {
  const totalItems = useCartStore(state => state.totalItems);

  return (
    <div className="flex items-center gap-4">
      <SheetTitle>Cart</SheetTitle>
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-secondary text-xs">
        {totalItems}
      </div>
    </div>
  );
};

export default CartSheetTitle;
