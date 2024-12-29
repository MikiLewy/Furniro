'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { db } from '@/db';
import { products } from '@/db/schema';

import { updateProductSchema } from '../validation-schemas/update-product-schema';

const action = createSafeActionClient();

export const updateProduct = action
  .schema(updateProductSchema)
  .action(
    async ({ parsedInput: { id, categoryId, description, name, price } }) => {
      try {
        if (!id) {
          return { error: 'Product not found' };
        }
        const existingProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });

        if (!existingProduct) {
          return { error: 'Product not found' };
        }

        await db
          .update(products)
          .set({
            name,
            description,
            price,
            categoryId: Number(categoryId),
          })
          .where(eq(products.id, id));

        revalidatePath('/content/products');

        return {
          success: 'Successfully updated product',
        };
      } catch (error) {
        return { error: 'Failed to update product' };
      }
    },
  );
