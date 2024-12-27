'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { db } from '@/db';
import { categories } from '@/db/schema';

import { updateCategorySchema } from '../validation-schemas/update-category-schema';

const actionClient = createSafeActionClient();

export const updateCategory = actionClient
  .schema(updateCategorySchema)
  .action(async ({ parsedInput: { id, name, icon, image } }) => {
    try {
      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.id, id),
      });

      if (!existingCategory) {
        return { error: 'Category not found' };
      }

      await db
        .update(categories)
        .set({
          name,
          icon,
          image,
          updated_at: new Date(),
        })
        .where(eq(categories.id, id));

      revalidatePath('/content/categories');

      return { success: 'Successfully updated category' };
    } catch (error) {
      return { error: 'Failed to update category' };
    }
  });
