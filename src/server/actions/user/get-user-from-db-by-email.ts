'use server';

import { db } from '@/db';
import { users } from '@/features/auth/schema/auth';
import { eq } from 'drizzle-orm';

export const getUserFromDbByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};
