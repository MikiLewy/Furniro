import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';

import { CategoryIcon } from '../api/types/category';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  image: text('image').notNull(),
  icon: text('icon').$type<CategoryIcon>().notNull(),
  createdBy: text('created_by'),
  ...timestamps,
});
