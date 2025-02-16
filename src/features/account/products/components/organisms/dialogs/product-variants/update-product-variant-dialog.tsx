'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoadingButton } from '@/components/atoms/loading-button';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductVariantsWithImagesAndTags } from '@/features/account/products/api/types/product-variant';
import { useRemoveProductVariant } from '@/features/account/products/hooks/action/use-remove-product-variant';
import { useUpdateProductVariant } from '@/features/account/products/hooks/action/use-update-product-variant';
import { updateProductVariantSchema } from '@/features/account/products/server/validation-schemas/update-product-variant-schema';
import { Can } from '@/permissions/can';

import TagsInput from '../../../molecules/tags-input';
import VariantImages from '../../../molecules/variant-images';

interface Props extends DialogActions {
  productId: number;
  variant: ProductVariantsWithImagesAndTags | null;
}

type FormValues = Omit<z.infer<typeof updateProductVariantSchema>, 'id'>;

const defaultValues: FormValues = {
  tags: [],
  variantImages: [],
  name: '',
  color: '#000000',
};

const UpdateProductVariantDialog = ({
  productId,
  variant,
  open,
  onClose,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(updateProductVariantSchema),
    defaultValues,
  });

  const {
    execute: executeUpdateProductVariant,
    status: updateProductVariantStatus,
  } = useUpdateProductVariant(onClose);

  const {
    execute: executeRemoveProductVariant,
    status: removeProductVariantStatus,
  } = useRemoveProductVariant(onClose);

  const onSubmit = (values: FormValues) => {
    executeUpdateProductVariant({ ...values, productId, id: variant?.id });
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    } else {
      form.reset({
        tags: variant?.variantTags?.map(tag => tag.tag) || defaultValues.tags,
        variantImages: variant?.variantImages || defaultValues.variantImages,
        name: variant?.name,
        color: variant?.color,
      });
    }
  }, [open, variant]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Update product variant"
      scrollable
      isSubmitButtonLoading={updateProductVariantStatus === 'executing'}
      confirmButtonText="Update"
      actionsSlot={
        <div className="ml-auto">
          <Can I="deleteVariant" a="AccountProducts" passThrough>
            {allowed => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className="w-full">
                      <LoadingButton
                        loading={removeProductVariantStatus === 'executing'}
                        variant="destructive"
                        disabled={!variant?.id || !allowed}
                        onClick={() =>
                          executeRemoveProductVariant({ id: variant?.id || 0 })
                        }>
                        Remove
                      </LoadingButton>
                    </span>
                  </TooltipTrigger>
                  {!allowed ? (
                    <TooltipContent>
                      <p>Not sufficient permissions</p>
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </TooltipProvider>
            )}
          </Can>
        </div>
      }
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

export default UpdateProductVariantDialog;
