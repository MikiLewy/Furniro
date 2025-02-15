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

import { useUpdateProduct } from '../../../hooks/action/use-update-product';
import { updateProductSchema } from '../../../server/validation-schemas/update-product-schema';

type FormValues = Omit<z.infer<typeof updateProductSchema>, 'id'>;

const defaultValues: FormValues = {
  name: '',
  price: 0,
  categoryId: '',
  description: '',
};

interface Props extends DialogActions {
  categories: Category[];
  selectedProductName: string;
  selectedProductPrice: number;
  selectedProductId: number;
  selectedProductCategoryId: string;
  selectedProductDescription: string;
}

const UpdateProductDialog = ({
  open,
  onClose,
  categories,
  selectedProductCategoryId,
  selectedProductDescription,
  selectedProductName,
  selectedProductPrice,
  selectedProductId,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(updateProductSchema),
  });

  const { execute, status } = useUpdateProduct(onClose);

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    } else {
      form.reset({
        name: selectedProductName,
        price: selectedProductPrice,
        categoryId: selectedProductCategoryId,
        description: selectedProductDescription,
      });
    }
  }, [
    open,
    selectedProductName,
    selectedProductPrice,
    selectedProductCategoryId,
    selectedProductDescription,
  ]);

  const onSubmit = (values: FormValues) => {
    execute({ ...values, id: selectedProductId });
  };

  return (
    <Dialog
      title="Update product"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitButtonLoading={status === 'executing'}
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }
      scrollable
      confirmButtonText="Update">
      <div className="flex flex-col gap-2">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
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
      </div>
    </Dialog>
  );
};

export default UpdateProductDialog;
