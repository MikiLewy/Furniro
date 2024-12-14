'use server';

import bcrypt from 'bcrypt';
import { createSafeActionClient } from 'next-safe-action';

import { signIn } from '@/auth';

import { getUserFromDbByEmail } from '../../../../server/actions/user/get-user-from-db-by-email';
import { sendVerificationEmail } from '../emails/email-verification';
import { signInSchema } from '../validation-schemas/sign-in-schema';

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
      redirect: true,
    });

    return { success: 'User logged in successfully' };
  });
