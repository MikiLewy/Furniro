'use server';

import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { auth } from '@/auth';
import { db } from '@/db';
import { wishlist } from '@/db/schema';

import { getWishlistItem } from '../../api/lib/wishlist';

const action = createSafeActionClient();

export const addToWishlist = action
  .schema(
    z.object({
      productVariantId: z.number(),
    }),
  )
  .action(async ({ parsedInput: { productVariantId } }) => {
    try {
      const session = await auth();

      if (!session?.user) {
        return { error: 'Please sign in to add product to wishlist' };
      }

      const alreadyAddedToWishlist = await getWishlistItem(
        +productVariantId,
        session?.user.id,
      );

      if (alreadyAddedToWishlist) {
        return { error: 'You have already added this product to wishlist' };
      }

      const wishlistItem = await db
        .insert(wishlist)
        .values({
          userId: session?.user.id,
          productVariantId: productVariantId,
        })
        .returning();

      revalidatePath(`/wishlist`);

      return {
        success: 'Successfully added product to wishlist',
        wishlistItemId: wishlistItem?.[0]?.id,
      };
    } catch (error) {
      return { error: 'Failed to add product to wishlist' };
    }
  });
