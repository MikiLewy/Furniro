'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Textarea } from '@/components/atoms/textarea';
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
import { RATING_SCALE } from '@/features/product-details/constants/rating-scale';
import { useCreateReview } from '@/features/product-details/hooks/action/use-create-review';
import { createReviewSchema } from '@/features/product-details/server/validation-schemas/create-review-schema';

import Ratings from '../../atoms/ratings';

type FormValues = z.infer<typeof createReviewSchema>;

const defaultValues: FormValues = {
  rating: 0,
  title: '',
  description: '',
};

const CreateReviewDialog = ({ open, onClose }: DialogActions) => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(createReviewSchema),
    defaultValues,
  });

  const { execute, status } = useCreateReview(onClose);

  const onSubmit = (values: FormValues) => {
    execute({ ...values, productId: +productId, category });
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
      title="Add review"
      description="Share your opinion about this product"
      confirmButtonText="Add"
      isSubmitButtonDisabled={
        !form.formState.isDirty || !form.formState.isValid
      }
      isSubmitButtonLoading={status === 'executing'}
      onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <FormProvider {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Great product"
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
                  <Textarea
                    placeholder="I love this product"
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormDescription>How do you rate this product?</FormDescription>
                <FormControl>
                  <Input type="hidden" placeholder="Star Rating" {...field} />
                </FormControl>
                <Ratings
                  rating={field.value}
                  ratingScale={RATING_SCALE}
                  onClick={value => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default CreateReviewDialog;
