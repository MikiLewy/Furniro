'use server';

import { createSafeActionClient } from 'next-safe-action';
import { signInSchema } from '../types/sign-in-schema';
import { signIn } from '@/auth';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../emails/email-verification';

export const actionClient = createSafeActionClient();

export const loginInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      if (!email || !password) {
        throw new Error('Invalid credentials.');
      }

      const user = await getUserFromDbByEmail(email);

      if (!user) {
        throw new Error('Invalid credentials.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const isPasswordValid = await bcrypt.compare(
        hashedPassword,
        user.password || '',
      );

      if (!isPasswordValid) {
        throw new Error('Invalid credentials.');
      }

      if (!user.emailVerified) {
        sendVerificationEmail(user.email || '');
      }

      await signIn('credentials', {
        email,
        password,
      });
    } catch (error) {
      throw new Error('Invalid credentials.');
    }
  });
