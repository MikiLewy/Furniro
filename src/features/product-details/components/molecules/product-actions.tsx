'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/features/cart/store/cart-store';
import QuantityInput, {
  quantityFormDefaultValues,
  QuantityFormValues,
} from '@components/atoms/quantity-input';

import FavoritesButton from '../atoms/favorites-button';

interface Props {
  price: number;
  productName: string;
  thumbnail: string;
  productVariantName: string;
}

const ProductActions = ({
  price,
  productName,
  productVariantName,
  thumbnail,
}: Props) => {
  const { productId } = useParams<{
    productId: string;
  }>();

  const [variantId] = useQueryState('variantId');

  const addToCart = useCartStore(state => state.addToCart);

  const validationSchema = z.object({
    quantity: z.coerce
      .number({ invalid_type_error: 'Quantity must be a valid number' })
      .int()
      .positive('Quantity must be a positive number'),
  });

  const form = useForm<QuantityFormValues>({
    defaultValues: quantityFormDefaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const onAddToCartClick = () => {
    addToCart({
      price,
      quantity: form.getValues('quantity'),
      variantId: +(variantId || 0),
      productId: +(productId || 0),
      productName,
      productVariantName,
      thumbnail,
    });
    toast.success('Product added to cart');
  };

  return (
    <div>
      <FormProvider {...form}>
        <QuantityInput />
      </FormProvider>
      <div className="flex gap-2 my-4">
        <Button
          size="lg"
          disabled={!form.formState.isValid}
          className="w-full rounded-xl"
          onClick={onAddToCartClick}>
          Add to cart
        </Button>
        <FavoritesButton />
      </div>
    </div>
  );
};

export default ProductActions;
