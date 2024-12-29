'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { db } from '@/db';
import { products } from '@/db/schema';

const actionClient = createSafeActionClient();

export const removeProduct = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const product = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      revalidatePath('/content/products');

      return {
        success: `Successfully removed product ${product?.[0]?.name}`,
      };
    } catch (error) {
      return { error: 'Failed to remove product' };
    }
  });
