'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
import { CategoryType } from '@/features/account/categories/api/types/category';
import { updateCategorySchema } from '@/features/account/categories/server/validation-schemas/update-category-schema';
import { UploadDropzone } from '@/utils/uploadthing';

import { categoriesTypes } from '../../../constants/categories-types';
import { updateCategory } from '../../../server/actions/update-category';

type FormValues = z.infer<typeof updateCategorySchema>;

const defaultValues: Omit<FormValues, 'id'> = {
  name: '',
  categoryImage: '',
  type: CategoryType.ACCESSORIES,
  description: '',
  mainImage: '',
  subtitle: '',
};

interface Props extends DialogActions {
  selectedCategoryId: number;
  selectedCategoryName: string;
  selectedCategoryImage: string;
  selectedCategoryIcon: CategoryType;
  selectedCategorySubtitle: string;
  selectedCategoryDescription: string;
  selectedCategoryMainImage: string;
}

const UpdateCategoryDialog = ({
  open,
  onClose,
  selectedCategoryIcon,
  selectedCategoryId,
  selectedCategoryImage,
  selectedCategoryName,
  selectedCategoryDescription,
  selectedCategoryMainImage,
  selectedCategorySubtitle,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(updateCategorySchema),
  });

  const categoryImage = form.watch('categoryImage');

  const categoryPageMainImage = form.watch('mainImage');

  const { execute, status } = useAction(updateCategory, {
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
    } else {
      form.reset({
        name: selectedCategoryName,
        categoryImage: selectedCategoryImage,
        type: selectedCategoryIcon,
        id: selectedCategoryId,
        description: selectedCategoryDescription,
        mainImage: selectedCategoryMainImage,
        subtitle: selectedCategorySubtitle,
      });
    }
  }, [
    open,
    selectedCategoryId,
    selectedCategoryIcon,
    selectedCategoryImage,
    selectedCategoryName,
    selectedCategoryDescription,
    selectedCategoryMainImage,
    selectedCategorySubtitle,
  ]);

  const onSubmit = (values: FormValues) => {
    execute({ ...values, id: selectedCategoryId });
  };

  return (
    <Dialog
      title="Update category"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitButtonLoading={status === 'executing'}
      scrollable
      isSubmitButtonDisabled={
        !form.formState.isValid || !form.formState.isDirty
      }
      confirmButtonText="Update">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  className="ut-button:ring-primary cursor-pointer hover:ut-label:text-primary ut-button:bg-primary/85 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-button:text-sm "
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
                  alt="Category page image"
                  width={100}
                  height={80}
                />
              ) : null}
              <FormControl>
                <Input
                  placeholder="Category page image"
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

export default UpdateCategoryDialog;
