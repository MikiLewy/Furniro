'use client';

import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const quantityFormDefaultValues = {
  quantity: 1,
};

export interface QuantityFormValues {
  quantity: number;
}

interface Props {
  compact?: boolean;
  min?: number;
  readOnly?: boolean;
  onPlusClick?: () => void;
  onMinusClick?: () => void;
}

const QuantityInput = ({
  compact,
  min = 1,
  readOnly,
  onMinusClick,
  onPlusClick,
}: Props) => {
  const { control } = useFormContext<QuantityFormValues>();

  return (
    <div className="flex flex-col gap-1">
      {!compact ? <h3 className="text-sm">Quantity</h3> : null}
      <FormField
        name="quantity"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <div
              className={cn(
                compact ? 'max-w-24 sm:max-w-28' : 'max-w-36',
                'flex cursor-pointer focus-within:ring-2 focus-within:ring-primary rounded-lg',
              )}>
              <div
                onClick={() => {
                  onMinusClick?.();
                  if (field.value <= min) return;
                  field.onChange(field.value - 1);
                  field.onBlur();
                }}
                className="flex items-center justify-center border border-r-0 rounded-lg rounded-r-none p-2 ring-inset">
                <Minus
                  className={cn(compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4')}
                />
              </div>
              <Input
                {...field}
                min={1}
                max={99}
                readOnly={readOnly}
                type="number"
                className="text-xs rounded-none border-x-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div
                onClick={() => {
                  onPlusClick?.();
                  field.onChange(field.value + 1);
                  field.onBlur();
                }}
                className="flex cursor-pointer items-center justify-center border border-l-0 rounded-lg rounded-l-none p-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                <Plus
                  className={cn(compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4')}
                />
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
