'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createCategorySchema } from '@/features/account/categories/server/validation-schemas/create-category-schema';
import { UploadDropzone } from '@/utils/uploadthing';

import { categoryIcons } from '../../../constants/categories-icons';
import { createCategory } from '../../../server/actions/create-category';

type FormValues = z.infer<typeof createCategorySchema>;

const defaultValues: FormValues = {
  name: '',
  image: '',
  icon: '',
};

const CreateCategoryDialog = ({ open, onClose }: DialogActions) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(createCategorySchema),
  });

  const image = form.watch('image');

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
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }>
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoFocus={false} {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon for your category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(categoryIcons).map(
                    ({ icon: Icon, value, label }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2 ">
                          <Icon />
                          <p>{label}</p>
                        </div>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
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
              <div className="flex flex-col  gap-2">
                <UploadDropzone
                  className="ut-button:ring-primary cursor-pointer hover:ut-label:text-primary ut-button:bg-primary/85 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-button:text-sm "
                  endpoint="productCategory"
                  content={{
                    button({ ready, isUploading }) {
                      if (ready && !isUploading) return 'Upload image';
                      return 'Loading...';
                    },
                  }}
                  onClientUploadComplete={res => {
                    form.setValue('image', res[0].url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  onUploadError={(error: Error) => {
                    form.setError('image', {
                      type: 'validate',
                      message: error.message,
                    });
                  }}
                  config={{ mode: 'auto' }}
                />
              </div>
              {image ? (
                <Image
                  src={image ?? ''}
                  alt="Category image"
                  width={100}
                  height={80}
                />
              ) : null}
              <FormControl>
                <Input
                  placeholder="Category image"
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
