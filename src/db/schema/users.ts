import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../constants/timestamps';

export const userRole = pgEnum('user_role', ['guest', 'user', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRole('user_role'),
  addressStreet: text('address_street'),
  addressCity: text('address_city'),
  addressZipCode: text('address_zip_code'),
  addressCountry: text('address_country'),
  ...timestamps,
});
