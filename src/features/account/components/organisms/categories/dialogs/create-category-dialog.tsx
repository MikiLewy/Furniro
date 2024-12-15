'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
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
import { createCategory } from '@/features/account/server/actions/create-category';
import { createCategorySchema } from '@/features/account/server/validation-schemas/create-category-schema';
import { UploadButton } from '@/utils/uploadthing';

type FormValues = z.infer<typeof createCategorySchema>;

const defaultValues: FormValues = {
  name: '',
  image: '',
  icon: '',
};

const CreateCategoryDialog = ({ open, onClose }: DialogActions) => {
  const [categoryUploading, setCategoryUploading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(createCategorySchema),
  });

  const image = form.watch('image');

  const icon = form.watch('icon');

  const { execute, status } = useAction(createCategory, {
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
      title="Create category"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitButtonLoading={status === 'executing'}
      // isSubmitButtonDisabled={!form.formState.isValid}
    >
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category image</FormLabel>
              <div className="flex items-center gap-2">
                {image ? (
                  <Image
                    src={image ?? ''}
                    alt="Category image"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No image added
                  </p>
                )}
                <UploadButton
                  className="scale-75 ut-button:ring-primary ut-button:bg-primary/75 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                  endpoint="categoryImageUploader"
                  content={{
                    button({ ready }) {
                      if (ready) {
                        return <div className="">Upload</div>;
                      }
                      return <div>Uploading...</div>;
                    },
                  }}
                  onUploadBegin={() => {
                    setCategoryUploading(true);
                  }}
                  onClientUploadComplete={res => {
                    form.setValue('image', res[0].url);
                    setCategoryUploading(false);
                    return;
                  }}
                  onUploadError={(error: Error) => {
                    form.setError('image', {
                      type: 'validate',
                      message: error.message,
                    });
                    setCategoryUploading(false);
                    return;
                  }}
                />
              </div>
              <FormControl>
                <Input
                  placeholder="User image"
                  type="hidden"
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
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <div className="flex items-center gap-2">
                {icon ? (
                  <Image
                    src={icon ?? ''}
                    alt="Category icon"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">No icon added</p>
                )}
                <UploadButton
                  className="scale-75 ut-button:ring-primary ut-button:bg-primary/75 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                  endpoint="categoryIconUploader"
                  content={{
                    button({ ready }) {
                      if (ready) {
                        return <div className="">Upload</div>;
                      }
                      return <div>Uploading...</div>;
                    },
                  }}
                  onUploadBegin={() => {
                    setCategoryUploading(true);
                  }}
                  onClientUploadComplete={res => {
                    form.setValue('icon', res[0].url);
                    setCategoryUploading(false);
                    return;
                  }}
                  onUploadError={(error: Error) => {
                    form.setError('icon', {
                      type: 'validate',
                      message: error.message,
                    });
                    setCategoryUploading(false);
                    return;
                  }}
                />
              </div>
              <FormControl>
                <Input
                  placeholder="User image"
                  type="hidden"
                  disabled={status === 'executing'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormProvider>
    </Dialog>
  );
};

export default CreateCategoryDialog;
