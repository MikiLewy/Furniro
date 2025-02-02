'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import TipTap from '@/components/molecules/tip-tap';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/features/account/categories/api/types/category';
import { categoriesTypes } from '@/features/account/categories/constants/categories-types';

import { useCreateProduct } from '../../../hooks/action/use-create-product';
import { createProductSchema } from '../../../server/validation-schemas/create-product-schema';

type FormValues = z.infer<typeof createProductSchema>;

const defaultValues: FormValues = {
  name: '',
  price: 0,
  categoryId: '',
  description: '',
};

interface Props extends DialogActions {
  categories: Category[];
}

const CreateProductDialog = ({ open, onClose, categories }: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(createProductSchema),
  });

  const { execute, status } = useCreateProduct(onClose);

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open]);

  const onSubmit = (values: FormValues) => {
    execute(values);
  };

  return (
    <Dialog
      title="Create product"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitButtonLoading={status === 'executing'}
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }
      scrollable>
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Flom sofa"
                  disabled={status === 'executing'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TipTap
                  val={field.value}
                  onChange={value =>
                    form.setValue('description', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <DollarSign size={36} className="p-2 bg-muted rounded-md" />
                  <Input
                    type="number"
                    placeholder="Your price in EUR"
                    step="0.1"
                    min={0}
                    disabled={status === 'executing'}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon for your category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories ? (
                    Object.values(categories).map(({ id, name, type }) => {
                      const Icon = categoriesTypes[type].icon;

                      return (
                        <SelectItem key={id} value={id.toString()}>
                          <div className="flex items-center gap-2 ">
                            <Icon />
                            <p>{name}</p>
                          </div>
                        </SelectItem>
                      );
                    })
                  ) : (
                    <p className="text-sm px-2">
                      There are no categories available
                    </p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormProvider>
    </Dialog>
  );
};

export default CreateProductDialog;
