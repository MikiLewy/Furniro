'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { auth } from '@/auth';
import { db } from '@/db';
import { reviews } from '@/db/schema';

import { createReviewSchema } from '../validation-schemas/create-review-schema';

const action = createSafeActionClient();

export const createReview = action
  .schema(createReviewSchema)
  .action(
    async ({
      parsedInput: { productId, description, title, rating, category },
    }) => {
      try {
        const session = await auth();

        if (!session?.user) {
          return { error: 'Please sign in to add review' };
        }

        const existingReview = await db.query.reviews.findFirst({
          where: and(
            eq(reviews.productId, productId || 0),
            eq(reviews.userId, session?.user.id),
          ),
        });

        if (existingReview) {
          return { error: 'You have already reviewed this product' };
        }

        await db.insert(reviews).values({
          rating,
          title,
          description,
          userId: session?.user.id,
          productId,
        });

        revalidatePath(`/collections/${category}/products/${productId}`);

        return {
          success: 'Successfully added review',
        };
      } catch (error) {
        return { error: 'Failed to add review' };
      }
    },
  );
