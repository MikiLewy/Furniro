'use client';

import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ProductActionsFormValues } from '../molecules/product-actions';

const QuantityInput = () => {
  const { control } = useFormContext<ProductActionsFormValues>();

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm">Quantity</h3>
      <FormField
        name="quantity"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <div className="flex max-w-40 cursor-pointer focus-within:ring-2 focus-within:ring-primary rounded-lg">
              <div
                onClick={() => {
                  if (field.value <= 1) return;
                  field.onChange(field.value - 1);
                  field.onBlur();
                }}
                className="flex items-center justify-center border border-r-0 rounded-lg rounded-r-none p-2 ring-inset">
                <Minus className="w-4 h-4" />
              </div>
              <Input
                {...field}
                min={1}
                type="number"
                className="rounded-none text-center focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div
                onClick={() => {
                  field.onChange(+field.value + 1);
                  field.onBlur();
                }}
                className="flex cursor-pointer items-center justify-center border border-l-0 rounded-lg rounded-l-none p-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            <FormMessage />
          </div>
        )}
      />
    </div>
  );
};

export default QuantityInput;
