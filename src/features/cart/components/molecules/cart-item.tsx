import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import QuantityInput, {
  QuantityFormValues,
  quantityFormDefaultValues,
} from '@/components/atoms/quantity-input';
import { formatPrice } from '@/utils/format-price';

import { useCartStore } from '../../store/cart-store';
import RemoveCartItemButton from '../atoms/remove-cart-item-button';

interface Props {
  price: number;
  productName: string;
  productVariantName: string;
  thumbnail: string;
  variantId: number;
  quantity: number;
  productId: number;
}

const CartItem = ({
  price,
  productName,
  productVariantName,
  thumbnail,
  variantId,
  quantity,
  productId,
}: Props) => {
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const validationSchema = z.object({
    quantity: z.coerce
      .number({ invalid_type_error: 'Quantity must be a valid number' })
      .int()
      .min(0, 'Quantity must be a positive number'),
  });

  const form = useForm<QuantityFormValues>({
    defaultValues: quantityFormDefaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const productQuantity = form.watch('quantity');

  useEffect(() => {
    form.setValue('quantity', quantity);
  }, [quantity]);

  useEffect(() => {
    if (productQuantity == 0) {
      removeFromCart(variantId);
    }
  }, [productQuantity]);

  return (
    <div className="bg-white rounded-2xl p-2">
      <div className="flex gap-4">
        <div className="border rounded-xl p-1 sm:p-2 flex items-center justify-center">
          <Image src={thumbnail} alt={productName} width={80} height={50} />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-medium text-sm">{productName}</h3>
              <p className="text-xs text-secondary-darker">
                {productVariantName}
              </p>
            </div>
            <RemoveCartItemButton variantId={variantId} />
          </div>
          <div className="flex justify-between items-center">
            <FormProvider {...form}>
              <QuantityInput
                compact
                min={0}
                readOnly
                onMinusClick={() => {
                  removeFromCart(variantId, 1);
                }}
                onPlusClick={() => {
                  addToCart({
                    variantId,
                    productName,
                    productVariantName,
                    productId,
                    price,
                    thumbnail,
                    quantity: 1,
                  });
                }}
              />
            </FormProvider>
            <p className="text-sm">{formatPrice({ amount: price || 0 })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
