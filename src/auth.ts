import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { getUserFromDbByEmail } from './server/actions/user/get-user-from-db-by-email';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { signInSchema } from './server/types/sign-in-schema';
import { accounts, users } from './db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
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

      token.isOAuth = !!existingAccount;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.image = existingUser.image;

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
