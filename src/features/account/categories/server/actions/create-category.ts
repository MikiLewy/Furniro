'use server';

import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { auth } from '@/auth';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { getUserFromDbByEmail } from '@/server/actions/user/get-user-from-db-by-email';

import { createCategorySchema } from '../validation-schemas/create-category-schema';

const actionClient = createSafeActionClient();

export const createCategory = actionClient
  .schema(createCategorySchema)
  .action(async ({ parsedInput: { name, icon, image } }) => {
    try {
      const session = await auth();

      const user = session?.user;

      if (!user) {
        return { error: 'User not found' };
      }

      const dbUser = await getUserFromDbByEmail(user?.email || '');

      if (!dbUser) {
        return { error: 'User not found' };
      }

      await db.insert(categories).values({
        name,
        icon,
        image,
        createdBy: user.email,
      });

      revalidatePath('/content/categories');

      return { success: 'Successfully created category' };
    } catch (error) {
      return { error: 'Failed to create category' };
    }
  });
