'use client';

import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/features/cart/store/cart-store';
import { formatPrice } from '@/utils/format-price';

import CheckoutProduct from '../molecules/checkout-product';

const CheckoutProducts = () => {
  const cartProducts = useCartStore(state => state.products);

  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <div className="flex-1 bg-gray-100 py-4 lg:py-10 px-4 md:px-6 lg:px-8 flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col gap-4">
        {cartProducts.map(product => (
          <CheckoutProduct
            key={product.variantId}
            price={product.price}
            productName={product.productName}
            productVariantName={product.productVariantName}
            thumbnail={product.thumbnail}
            quantity={product.quantity}
          />
        ))}
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Total</p>
        <p className="text-lg ">{formatPrice({ amount: totalPrice })}</p>
      </div>
    </div>
  );
};

export default CheckoutProducts;
