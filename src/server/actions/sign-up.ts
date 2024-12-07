'use server';

import { createSafeActionClient } from 'next-safe-action';
import { signUpSchema } from '../types/sign-up-schema';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';
import bcrypt from 'bcrypt';
import { db } from '@/db';
import { users } from '@/db/schema';
import { sendVerificationEmail } from '../emails/email-verification';
import { generateVerificationEmailToken } from './tokens/generate-verification-email-token';

const actionClient = createSafeActionClient();

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, firstName, lastName, password } }) => {
    try {
      if (!email || !firstName || !lastName || !password) {
        return { error: 'Invalid credentials.' };
      }

      const user = await getUserFromDbByEmail(email);

      if (user) {
        return { error: 'User already exists.' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = await generateVerificationEmailToken(email);

      await sendVerificationEmail(email, verificationToken?.[0]?.token);

      await db.insert(users).values({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });

      return { success: 'Verification email send' };
    } catch (error) {
      return { error: 'Invalid credentials.' };
    }
  });
