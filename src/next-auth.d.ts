import { type DefaultSession } from 'next-auth';

import { UserRole } from './types/user-role';

export type ExtendUser = DefaultSession['user'] & {
  id: string;
  firstName: string;
  lastName: string;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
  role: UserRole;
  image: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}
