import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../constants/timestamps';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  ...timestamps,
});
