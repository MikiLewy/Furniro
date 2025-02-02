'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import TipTap from '@/components/molecules/tip-tap';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import {
  FormControl,
  FormDescription,
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

import { CategoryType } from '../../../api/types/category';
import { categoriesTypes } from '../../../constants/categories-types';
import { useCreateCategory } from '../../../hooks/action/use-create-category';

type FormValues = z.infer<typeof createCategorySchema>;

const defaultValues: FormValues = {
  name: '',
  categoryImage: '',
  type: CategoryType.ARMCHAIR,
  description: '',
  mainImage: '',
  subtitle: '',
};

const CreateCategoryDialog = ({ open, onClose }: DialogActions) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(createCategorySchema),
  });

  const categoryImage = form.watch('categoryImage');

  const categoryPageMainImage = form.watch('mainImage');

  const { execute, status } = useCreateCategory(onClose);

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
      scrollable
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }>
      <div className="flex flex-col gap-2">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon for your category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(categoriesTypes).map(
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
            name="categoryImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category image</FormLabel>
                <div className="flex flex-col gap-2">
                  <UploadDropzone
                    className="ut-button:ring-primary cursor-pointer hover:ut-label:text-primary ut-button:bg-primary/85 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-button:text-sm max-w-[280px] sm:max-w-full "
                    endpoint="productCategory"
                    content={{
                      button({ ready, isUploading }) {
                        if (ready && !isUploading) return 'Upload image';
                        return 'Loading...';
                      },
                    }}
                    onClientUploadComplete={res => {
                      form.setValue('categoryImage', res[0].url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    onUploadError={(error: Error) => {
                      form.setError('categoryImage', {
                        type: 'validate',
                        message: error.message,
                      });
                    }}
                    config={{ mode: 'auto' }}
                  />
                </div>
                <FormDescription>
                  This image will be used as the category image
                </FormDescription>
                {categoryImage ? (
                  <Image
                    src={categoryImage ?? ''}
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
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input autoFocus={false} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This will be used as subtitle in the category page
                </FormDescription>
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
                <FormDescription>
                  This will be used as description in the category page
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category page image</FormLabel>
                <div className="flex flex-col  gap-2">
                  <UploadDropzone
                    className="ut-button:ring-primary cursor-pointer hover:ut-label:text-primary ut-button:bg-primary/85 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-button:text-sm max-w-[280px] sm:max-w-full"
                    endpoint="productCategoryMainImage"
                    content={{
                      button({ ready, isUploading }) {
                        if (ready && !isUploading) return 'Upload image';
                        return 'Loading...';
                      },
                    }}
                    onClientUploadComplete={res => {
                      form.setValue('mainImage', res[0].url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    onUploadError={(error: Error) => {
                      form.setError('mainImage', {
                        type: 'validate',
                        message: error.message,
                      });
                    }}
                    config={{ mode: 'auto' }}
                  />
                </div>
                <FormDescription>
                  This image will be used as the main image in the category page
                </FormDescription>
                {categoryPageMainImage ? (
                  <Image
                    src={categoryPageMainImage ?? ''}
                    alt="Category page main image"
                    width={100}
                    height={80}
                  />
                ) : null}
                <FormControl>
                  <Input
                    placeholder="Category page main image"
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
      </div>
    </Dialog>
  );
};

export default CreateCategoryDialog;
