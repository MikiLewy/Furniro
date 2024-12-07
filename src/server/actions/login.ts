'use server';

import { createSafeActionClient } from 'next-safe-action';
import { signInSchema } from '../types/sign-in-schema';
import { signIn } from '@/auth';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../emails/email-verification';
import { generateVerificationEmailToken } from './tokens/generate-verification-email-token';

const actionClient = createSafeActionClient();

export const loginInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
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

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });

    return { success: 'User logged in successfully' };
  });
