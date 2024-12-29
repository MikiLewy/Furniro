'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { db } from '@/db';
import { productVariants } from '@/db/schema';

import algoliasearch from '../../api/clients/algoliasearch';

const action = createSafeActionClient();

export const removeProductVariant = action
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const currentVariant = await db.query.productVariants.findFirst({
        where: eq(productVariants.id, id),
      });

      if (!currentVariant) {
        return { error: 'Product variant not found' };
      }

      await db.delete(productVariants).where(eq(productVariants.id, id));

      await algoliasearch.deleteObject({
        indexName: 'products',
        objectID: id.toString(),
      });

      revalidatePath('/content/products');
      return { success: 'Successfully deleted product variant' };
    } catch (error) {
      console.error(error);
      return { error: 'Error when deleting product variant' };
    }
  });
