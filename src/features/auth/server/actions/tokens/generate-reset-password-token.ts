'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { resetPasswordTokens } from '@/db/schema';

export const generateResetPasswordToken = async (email: string) => {
  const token = crypto.randomUUID();

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(resetPasswordTokens)
      .where(eq(resetPasswordTokens.email, email));
  }

  const resetPasswordToken = await db
    .insert(resetPasswordTokens)
    .values({
      token,
      email,
      expires: expiresAt,
    })
    .returning();

  return resetPasswordToken;
};
