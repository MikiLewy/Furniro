'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema';
import { getUserFromDbByEmail } from '@/features/auth/server/actions/user/get-user-from-db-by-email';

export const verifyEmailToken = async (token: string) => {
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!existingToken) {
    return { error: 'Invalid token.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired.' };
  }

  const user = await getUserFromDbByEmail(existingToken.email);

  if (!user) {
    return { error: 'User not found.' };
  }

  await db
    .update(users)
    .set({
      email: existingToken.email,
      emailVerified: new Date(),
    })
    .where(eq(users.id, user.id));

  db.delete(verificationTokens).where(
    eq(verificationTokens.id, existingToken.id),
  );

  return { success: 'Token is valid.' };
};
