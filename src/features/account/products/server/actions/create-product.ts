'use server';

import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { db } from '@/db';
import { products } from '@/db/schema';

import { createProductSchema } from '../validation-schemas/create-product-schema';

const action = createSafeActionClient();

export const createProduct = action
  .schema(createProductSchema)
  .action(async ({ parsedInput: { categoryId, description, name, price } }) => {
    try {
      await db.insert(products).values({
        name,
        description,
        price,
        categoryId: Number(categoryId),
      });

      revalidatePath('/content/products');

      return {
        success: 'Successfully created product',
      };
    } catch (error) {
      return { error: 'Failed to create product' };
    }
  });
