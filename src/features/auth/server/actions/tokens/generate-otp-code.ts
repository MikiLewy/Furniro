import crypto from 'crypto';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { twoFactorTokens } from '@/db/schema';

export const generateOTPCode = async (email: string) => {
  const otp = crypto.randomInt(100000, 999999);

  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

  const existingOTPCode = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  if (existingOTPCode) {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
  }

  return await db
    .insert(twoFactorTokens)
    .values({
      token: otp.toString(),
      email,
      expires: expiresAt,
    })
    .returning();
};
