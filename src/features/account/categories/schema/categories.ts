import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  image: text('image'),
  icon: text('icon'),
  createdBy: text('created_by'),
  ...timestamps,
});
