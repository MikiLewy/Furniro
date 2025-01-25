'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetFooter } from '@/components/ui/sheet';
import { useCartStore } from '@/features/cart/store/cart-store';
import { formatPrice } from '@/utils/format-price';

import Cart from '../atoms/cart';
import CartSheetTitle from '../atoms/cart-sheet-title';
import CartItem from '../molecules/cart-item';

const CartSheet = () => {
  const router = useRouter();

  const isCartSheetOpen = useCartStore(state => state.isCartSheetOpen);
  const setIsCartSheetOpen = useCartStore(state => state.setIsCartSheetOpen);

  const cartProducts = useCartStore(state => state.products);

  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <Sheet open={isCartSheetOpen} onOpenChange={setIsCartSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Cart />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col px-3 sm:px-4 w-11/12 sm:max-w-[500px] bg-[#f6f6f5]">
        <SheetHeader>
          <CartSheetTitle />
          <SheetDescription className="text-left">
            Review your items before checkout
          </SheetDescription>
        </SheetHeader>
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
          <Button
            type="submit"
            disabled={cartProducts.length <= 0}
            onClick={() => {
              setIsCartSheetOpen(false);
              router.push('/checkout');
            }}>
            Checkout {totalPrice ? formatPrice({ amount: totalPrice }) : null}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
