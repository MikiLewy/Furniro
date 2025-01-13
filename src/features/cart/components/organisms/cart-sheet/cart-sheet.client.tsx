'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetFooter } from '@/components/ui/sheet';
import { useCartStore } from '@/features/cart/store/cart-store';
import { formatPrice } from '@/utils/format-price';

import CartItem from '../../molecules/cart-item';

const ClientCartSheet = () => {
  const cartProducts = useCartStore(state => state.products);

  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <>
      <ScrollArea>
        <div className="flex flex-col gap-4 py-4">
          {cartProducts.map(product => (
            <CartItem
              key={product.variantId}
              variantId={product.variantId}
              price={product.price}
              productId={product.productId}
              productName={product.productName}
              productVariantName={product.productVariantName}
              thumbnail={product.thumbnail}
              quantity={product.quantity}
            />
          ))}
        </div>
      </ScrollArea>
      <SheetFooter className="mt-auto  sm:flex-col">
        <Button type="submit" disabled={cartProducts.length <= 0}>
          Checkout {totalPrice ? formatPrice({ amount: totalPrice }) : null}
        </Button>
      </SheetFooter>
    </>
  );
};

export default ClientCartSheet;
