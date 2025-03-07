import { relations } from 'drizzle-orm';
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

import { orders, reviews, wishlist } from '@/db/schema';
import { UserRole } from '@/types/user-role';

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: text('role').$type<UserRole>().default('customer'),
  image: text('image'),
  password: text('password'),
  customerId: text('customerId'),
});

export const userRelations = relations(users, ({ many }) => ({
  reviews: many(reviews, { relationName: 'user_reviews' }),
  orders: many(orders, { relationName: 'user_orders' }),
  wishlist: many(wishlist, { relationName: 'user_wishlist' }),
}));

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationTokens',
  {
    id: text('identifier')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    token: text('token').notNull(),
    email: text('email').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  verificationToken => ({
    compositePk: primaryKey({
      columns: [verificationToken.id, verificationToken.token],
    }),
  }),
);

export const resetPasswordTokens = pgTable(
  'resetPasswordTokens',
  {
    id: text('identifier')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    token: text('token').notNull(),
    email: text('email').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  resetPasswordToken => ({
    compositePk: primaryKey({
      columns: [resetPasswordToken.id, resetPasswordToken.token],
    }),
  }),
);

export const twoFactorTokens = pgTable(
  'twoFactorTokens',
  {
    id: text('identifier')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    token: text('token').notNull(),
    email: text('email').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  twoFactorTokens => ({
    compositePk: primaryKey({
      columns: [twoFactorTokens.id, twoFactorTokens.token],
    }),
  }),
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  authenticator => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);
