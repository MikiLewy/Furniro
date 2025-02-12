'use server';

import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { createSafeActionClient } from 'next-safe-action';

import { signIn } from '@/auth';
import { db } from '@/db';
import { twoFactorTokens } from '@/db/schema';

import { sendVerificationEmail } from '../emails/email-verification';
import { sendOTPCodeEmail } from '../emails/otp-code';
import { signInSchema } from '../validation-schemas/sign-in-schema';

import { generateOTPCode } from './tokens/generate-otp-code';
import { generateVerificationEmailToken } from './tokens/generate-verification-email-token';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';

const actionClient = createSafeActionClient();

export const loginInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    if (!email || !password) {
      return { error: 'Invalid credentials.' };
    }

    const user = await getUserFromDbByEmail(email);

    if (!user) {
      return { error: 'User not found.' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');

    if (!isPasswordValid) {
      return { error: 'Invalid password' };
    }

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationEmailToken(
        user.email || '',
      );

      sendVerificationEmail(user.email || '', verificationToken?.[0]?.token);

      return { error: 'Email not verified. Verification email sent.' };
    }

    if (code) {
      const otpCode = await db.query.twoFactorTokens.findFirst({
        where: eq(twoFactorTokens.email, email),
      });

      if (!otpCode) {
        return { error: 'Invalid OTP code' };
      }

      const isTheCodeValid = otpCode.token === code;

      if (!isTheCodeValid) {
        return { error: 'Invalid OTP code' };
      }

      if (otpCode.expires < new Date()) {
        return { error: 'OTP code expired' };
      }

      await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
    } else {
      if (user.twoFactorEnabled) {
        const otpCode = await generateOTPCode(email);

        await sendOTPCodeEmail(email, otpCode?.[0]?.token);

        return { otp: 'OTP code sent to your email.' };
      }
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: 'User logged in successfully' };
  });
