'use server';

import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { createSafeActionClient } from 'next-safe-action';

import { db } from '@/db';
import { resetPasswordTokens, users } from '@/db/schema';

import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';
import { setPasswordSchema } from '../validation-schemas/set-password-schema';

const actionClient = createSafeActionClient();

export const setPasswordAction = actionClient
  .schema(setPasswordSchema)
  .action(async ({ parsedInput: { password, confirmPassword, token } }) => {
    const pool = new Pool({
      connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    });

    const dbPool = drizzle(pool);

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    if (!token) {
      return { error: 'Invalid password reset token' };
    }

    const existingToken = await db.query.resetPasswordTokens.findFirst({
      where: eq(resetPasswordTokens.token, token || ''),
    });

    if (!existingToken) {
      return { error: 'Invalid token' };
    }

    const hasExpired = existingToken.expires < new Date();

    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    const user = await getUserFromDbByEmail(existingToken.email);

    if (!user) {
      return { error: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    dbPool.transaction(async tx => {
      await tx
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, user.id));
      await tx
        .delete(resetPasswordTokens)
        .where(eq(resetPasswordTokens.id, existingToken.id));
    });

    return { success: 'Successfully changed password' };
  });
