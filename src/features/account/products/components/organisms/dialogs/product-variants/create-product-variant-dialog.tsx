'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProductVariant } from '@/features/account/products/server/actions/create-product-variant';
import { createProductVariantSchema } from '@/features/account/products/server/validation-schemas/create-product-variant-schema';

import TagsInput from '../../../molecules/tags-input';
import VariantImages from '../../../molecules/variant-images';

interface Props extends DialogActions {
  productId: number;
}

type FormValues = z.infer<typeof createProductVariantSchema>;

const defaultValues: FormValues = {
  tags: [],
  variantImages: [],
  name: '',
  color: '#000000',
};

const CreateProductVariantDialog = ({ productId, open, onClose }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(createProductVariantSchema),
    defaultValues,
  });

  const { execute, status } = useAction(createProductVariant, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        onClose();
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = (values: FormValues) => {
    execute({ ...values, productId });
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create product variant"
      scrollable
      isSubmitButtonLoading={status === 'executing'}
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }
      onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pick a title for your variant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInput {...field} onChange={e => field.onChange(e)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <VariantImages />
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default CreateProductVariantDialog;
