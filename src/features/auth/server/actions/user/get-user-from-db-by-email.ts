'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/features/auth/schema/auth';

export const getUserFromDbByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};
