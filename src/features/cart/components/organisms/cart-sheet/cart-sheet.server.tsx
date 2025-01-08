import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

import Cart from '../../atoms/cart';
import CartSheetTitle from '../../atoms/cart-sheet-title';

import ClientCartSheet from './cart-sheet.client';

const ServerCartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Cart />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col sm:max-w-[500px] bg-[#f6f6f5]">
        <SheetHeader>
          <CartSheetTitle />
          <SheetDescription>Review your items before checkout</SheetDescription>
        </SheetHeader>
        <ClientCartSheet />
      </SheetContent>
    </Sheet>
  );
};

export default ServerCartSheet;
