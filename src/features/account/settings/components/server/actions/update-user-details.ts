'use server';

import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { auth } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { getUserFromDbByEmail } from '@/server/actions/user/get-user-from-db-by-email';

import { updateUserDetailsSchema } from '../validation-schemas/update-user-details-schema';

const actionClient = createSafeActionClient();

export const updateUserDetails = actionClient
  .schema(updateUserDetailsSchema)
  .action(
    async ({
      parsedInput: {
        email,
        firstName,
        lastName,
        password,
        isTwoFactorEnabled,
        name,
        image,
      },
    }) => {
      const session = await auth();

      const user = session?.user;

      if (!user) {
        return { error: 'User not found' };
      }

      const dbUser = await getUserFromDbByEmail(email || '');

      if (!dbUser) {
        return { error: 'User not found' };
      }

      if (user.isOAuth && user.name) {
        email = undefined;
        password = undefined;
        isTwoFactorEnabled = undefined;
        firstName = undefined;
        lastName = undefined;
      }

      const hashedPassword = await bcrypt.hash(password || '', 10);

      await db
        .update(users)
        .set({
          email,
          firstName,
          image,
          lastName,
          name,
          password: hashedPassword || undefined,
          twoFactorEnabled: isTwoFactorEnabled,
        })
        .where(eq(users.id, user.id));

      revalidatePath('/settings');

      return { success: 'Successfully updated settings' };
    },
  );
