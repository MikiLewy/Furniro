'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import FavoritesButton from '../atoms/favorites-button';
import QuantityInput from '../atoms/quantity-input';

const defaultValues = {
  quantity: 1,
};

const validationSchema = z.object({
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity must be a valid number' })
    .int()
    .positive('Quantity must be a positive number'),
});

export type ProductActionsFormValues = z.infer<typeof validationSchema>;

const ProductActions = () => {
  const form = useForm<ProductActionsFormValues>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  return (
    <div>
      <FormProvider {...form}>
        <QuantityInput />
      </FormProvider>
      <div className="flex gap-2 my-4">
        <Button
          size="lg"
          disabled={!form.formState.isValid}
          className="w-full rounded-xl">
          Add to cart
        </Button>
        <FavoritesButton />
      </div>
    </div>
  );
};

export default ProductActions;
