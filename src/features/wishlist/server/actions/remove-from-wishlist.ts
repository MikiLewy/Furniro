'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { auth } from '@/auth';
import { db } from '@/db';
import { wishlist } from '@/db/schema';

const action = createSafeActionClient();

export const removeFromWishlist = action
  .schema(
    z.object({
      wishlistItemId: z.number(),
    }),
  )
  .action(async ({ parsedInput: { wishlistItemId } }) => {
    try {
      const session = await auth();

      if (!session?.user) {
        return { error: 'Please sign in to remove product from wishlist' };
      }

      await db.delete(wishlist).where(eq(wishlist.id, wishlistItemId));

      revalidatePath(`/wishlist`);

      return {
        success: 'Successfully removed product from wishlist',
      };
    } catch (error) {
      return { error: 'Failed to remove product from wishlist' };
    }
  });
