import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { getUserFromDbByEmail } from './server/actions/user/get-user-from-db-by-email';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { signInSchema } from './server/types/sign-in-schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
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
            throw new Error('Invalid credentials.');
          }

          const hashedPassword = await bcrypt.hash(password || '', 10);

          // // logic to verify if the user exists
          const user = await getUserFromDbByEmail(email);

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = await bcrypt.compare(
            hashedPassword,
            user.password || '',
          );

          if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
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
