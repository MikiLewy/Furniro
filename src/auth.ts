import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import { encode, decode } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Stripe from 'stripe';
import { ZodError } from 'zod';

import { db } from '@/db';

import { accounts, users } from './db/schema';
import { getUserFromDbByEmail } from './features/auth/server/actions/user/get-user-from-db-by-email';
import { signInSchema } from './features/auth/server/validation-schemas/sign-in-schema';
import { UserRole } from './types/user-role';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

      const customer = await stripe.customers.create({
        email: user.email || '',
        name: user.name || '',
      });

      await db
        .update(users)
        .set({ customerId: customer.id })
        .where(eq(users.id, user.id || ''));
    },
  },
  jwt: { encode, decode },
  callbacks: {
    session: async ({ session, token }) => {
      if (session && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.image as string;
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.email = token.email as string;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!existingUser) return token;

      const existingAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      token.isOAuth = !!existingAccount && existingUser.name;
      token.name = existingUser.name;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.twoFactorEnabled;

      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          if (!email || !password) {
            return null;
          }

          // // logic to verify if the user exists
          const user = await getUserFromDbByEmail(email);

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password || '',
          );

          if (!isPasswordValid) {
            return null;
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
