'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { verificationTokens } from '@/db/schema';

export const generateVerificationEmailToken = async (email: string) => {
  const token = crypto.randomUUID();

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.email, email));
  }

  const verificationToken = await db
    .insert(verificationTokens)
    .values({
      token,
      email,
      expires: expiresAt,
    })
    .returning();

  return verificationToken;
};
