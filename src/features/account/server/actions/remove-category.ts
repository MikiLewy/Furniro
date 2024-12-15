'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { db } from '@/db';
import { categories } from '@/db/schema';

const actionClient = createSafeActionClient();

export const removeCategory = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const category = await db
        .delete(categories)
        .where(eq(categories.id, id))
        .returning();

      revalidatePath('/content/categories');

      return {
        success: `Successfully removed category ${category?.[0]?.name}`,
      };
    } catch (error) {
      return { error: 'Failed to remove category' };
    }
  });
